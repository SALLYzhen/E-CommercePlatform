import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './conponents/Header'
import Footer from './conponents/Footer'

const App = () => {
  return (
    <>
    <Header />
    <main>
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
    </>
  )
}

export default App