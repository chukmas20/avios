import React from 'react';
import {Card} from "react-bootstrap"
import { Link } from 'react-router-dom';

const Product = ({product}) => {
  return (
      <>
        <Card className="my-3 py-3 rounded">
            <Link to ={`/product/${product._id}`}>
              <Card.Img  src={product?.images[0]?.url} alt={product.name}style={{textDecoration:"none"}}/>
            </Link>
            <Card.Body>
            <Link to={`/product/${product._id}`}>
               <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
            </Link>
            </Card.Body>
            <Card.Text as="h3">
             ₦{product.price}
            </Card.Text>
        </Card>
      </>
  );
};

export default Product;
