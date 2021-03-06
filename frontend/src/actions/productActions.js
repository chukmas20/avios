import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
import axios from "axios";


// get all products
export const getProducts =() => async (dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCTS_REQUEST})
          const { data } = await axios.get("/api/v2/products");
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
           })

    } catch (error) {
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}

// get single product
export const getProductDetails =(id)=> async (dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v2/product/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
           })

    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

// clearing errors
export const clearErrors =()=> async (dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}
