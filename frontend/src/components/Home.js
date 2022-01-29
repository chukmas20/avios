import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useAlert } from "react-alert";
import {Col, Row,} from "react-bootstrap";
import Product from './Product';
import { clearErrors, getProducts } from '../actions/productActions';
import Loader from './Loader/Loader';



const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const {error, loading, products} = useSelector (state => state.products)

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
         }
         dispatch(getProducts())
     }, [dispatch, error, alert])
  return (
      <>  
            {loading ? <Loader /> :(
                <Row>
                {products.map((product)=>(
                    <Col lg={4} sm={12}>
                      <Product product={product} key={product._id} />
                    </Col>
                ))}
            </Row>
            )}   
      </>
  );
};

export default Home;
