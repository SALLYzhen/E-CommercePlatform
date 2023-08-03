import { Row, Col} from 'react-bootstrap'
import Product from '../conponents/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {    

// useGetProductsQuery() 是由之前创建的 productsApiSlice 自动生成的 hook，
// 用于发起 getProducts 请求并获取产品数据。
const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      { isLoading ? ( <h2>Loading...</h2> ) : 
          error ? ( <div>{ error?.data?.message || error.error}</div> ) : 
            (<>
              <h1> Latest Products</h1>
              <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                    </Col>
                ))}
              </Row>
            </>)}
    </>
  );
}

export default HomeScreen;