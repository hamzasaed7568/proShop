import React, { useEffect } from 'react'
import Product from '../components/Product'
import {Link} from 'react-router-dom'
// import { Helmet } from 'react-helmet'
import { listProducts } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  // const [products , setProducts] = useState([]);
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, loading, error, pages, page } = productList

  useEffect(() => {
    // const fetchProducts = async () =>{
    // const { data } = await axios.get("/api/products")
    // setProducts(data)
    // }
    // fetchProducts();
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  return (
    <>
      {!keyword ? <ProductCarousel />:<Link to='/' className='btn btn-light'>Go Back</Link> }
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
