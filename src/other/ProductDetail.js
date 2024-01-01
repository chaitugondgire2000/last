import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
    const detail=useLocation();
    const [prodictDetail,setProductDetail]=useState({});
    console.log(detail)
    useEffect(()=>{
        if(detail.state!==null){
            setProductDetail(detail.state)
        }else{
            console.log(detail.search)
            const res=axios.get("https://onlinetestapi.gerasim.in/api/Ecomm/GetProductById ")
            setProductDetail(res)
        }
    },[])
    return (
        <div>
           <p>helo this is product detail</p> 
        </div>
    );
};

export default ProductDetail;