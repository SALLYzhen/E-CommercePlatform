import { Row, Col} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Product from '../conponents/Product'
import Loader from '../conponents/Loader'
import Message from '../conponents/Message'
import Paginate from '../conponents/Paginate'
import ProductCarousel from '../conponents/ProductCarousel'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();

  // useGetProductsQuery() 是由之前创建的 productsApiSlice 自动生成的 hook，
  // 用于发起 getProducts 请求并获取产品数据。
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
      { !keyword ? <ProductCarousel /> : (
        <Link to='/' className='btn btn-light mb-4' style={{ marginTop: '20px' }}>
          Go Back
        </Link>
      )}
      { isLoading ? ( <Loader /> ) : 
          error ? ( <Message variant='danger'>{ error?.data?.message || error.error}</Message> ) : 
            (<>
              <h1 style={{ marginTop: '20px' }}> Latest Products</h1>
              <Row>
                {data.products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                    </Col>
                ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </>)}
    </>
  );
}

export default HomeScreen;