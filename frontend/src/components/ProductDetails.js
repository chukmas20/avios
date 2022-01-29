import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {  useParams } from "react-router-dom";
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import Loader from './Loader/Loader';
import { useAlert } from "react-alert";
import { clearErrors, getProductDetails } from '../actions/productActions';
import { addItemsToCart } from '../actions/cartActions';
import styled from "styled-components";


const FilterContainer = styled.div`
   display: flex;
   width: 50%;
   margin: 30px 0px;
   justify-content: space-between;

`;
const Filter = styled.div`
   display: flex;
   align-items: center;
`;
const FilterColor = styled.div`
   width: 20px;
   height: 20px;
   border-radius: 50%;
   border: 2px black solid;
   background-color: ${props => props.color};
   margin: 0px 5px;
   cursor: pointer;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterSize = styled.select`
   margin-left: 10px;
   padding: 5px;
`;
const FilterSizeOption = styled.option`
`;



const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    const {product, loading, error} = useSelector (state => state.productDetails)
    const alert = useAlert()
    const {id} = useParams()
     
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    const increaseQuantity=()=>{
        if(product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const  decreaseQuantity=()=>{
        if(1  >= quantity ) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addTocartHandler =()=>{
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item added to cart");
    }

    useEffect(()=>{
        if(error){
           alert.error(error)
           dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch,id,error,alert])

    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        size: window.innerWidth < 600 ? 20 : 20,
        // activeColor:"tomato",
        value: product.ratings,
        isHalf : true,
    }
    return (
        <>
        {loading ? (<Loader />):(
              <>
              {/* <MetaData  title={product.name}     /> */}
              <div className='ProductDetails' >
                 <div>
                {/* <Carousel> */}
                        {product.images &&
                         product.images.map((item, i) => (
                            <img
                            className="CarouselImage"
                            key={i}
                            src={item.url}
                            alt={`${i} Slide`}
                            />
                        ))}
                   {/* </Carousel> */}
                     </div>
                  <div>
                       <div className='detailsBlock-1'>
                           <h2> {product.name}</h2>
                           <p> Product # {product._id} </p>
                       </div>
                       <div className='detailsBlock-3'>
                            <h1> ₦ {product.price} </h1>
                                <div className='detailsBlock-3-1'>
                                <div className='detailsBlock-3-1-1'>
                                    <button onClick = {decreaseQuantity}> - </button>
                                     <div className='valbox'>
                                      <input readOnly  type="number" value={quantity} />
                                      </div>
                                    <button onClick={increaseQuantity}> + </button>
                                </div>{" "}
                                <button onClick={addTocartHandler}> Add to cart </button>
                            </div>
                            <FilterContainer>
                         <Filter>
                             <FilterTitle> Color </FilterTitle>
                             {product.color?.map(c=>(
                                <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                             ))}                             
                         </Filter>
                         <Filter>
                              <FilterTitle> Size </FilterTitle>
                              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                                  {product.size?.map(s=>(
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                  ))}                
                              </FilterSize>
                         </Filter>
                    </FilterContainer>
                            <p>
                                Status:{" "}
                                <b className={product.Stock < 1 ? "redColor" :"greenColor"}>
                                    {product.Stock < 1 ? "Out of Stock" : "Instock"}
                                </b>
                            </p>
                       </div> 
                  </div>
              </div>     
            </>
        )}
      </>
        
    )
}

export default ProductDetails
