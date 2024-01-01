

import React, { useContext, useEffect, useState } from 'react';

import { getMobileData } from '../../other/commone';
import axios from 'axios';
import { Appcontext } from '../../App';
import HOC from '../../other/HOC';
import './Mobail.css';
import { useNavigate } from 'react-router-dom';



const Mobail = () => {
    const cartNumb = useContext(Appcontext)
    console.log(cartNumb);
    const navigate = useNavigate();
    const useInfo = localStorage.getItem("userInfo");
    console.log(useInfo);
    const [mobileData, setMobileData] = useState([]);
    const [qty, setQty] = useState(0);

    useEffect(() => {
        cartNumb.setActiveTb('Mobile')
        //    Info
        if (cartNumb.globalObj.mobileData.length === 0) {
            getMobileData().then((data) => {
               // setMobileData(data);
                 cartNumb.setGlobalData("mobileData",data)
            });
        }
    }, [])
    // useEffect(() => {
    //     cartNumb.setActiveTb('Mobile')
    //     getMobileData().then((data) => {
    //         setMobileData(data);
    //     });
    // }, [])


    const increMent = (index) => {
        // setQty(qty+1);
        // console.log(index, mobileData[index]);

        setMobileData(prevState => {
            let updateMobileData = prevState.map((item, ind) => {
                if (ind === index) {
                    let quantity = item.quantity ? item.quantity + 1 : 1;
                    return { ...item, quantity: quantity }
                } else {
                    return { ...item };
                }

            })
            return updateMobileData
        })

    }
    const addToCart = async (item) => {
        console.log(item, new Date());

        //  https://onlinetestapi.gerasim.in/api/Ecomm/AddToCart'  type: post

        // {
        //     "CartId": 0,  not mandtory
        //     "CustId": 0,    ls
        //     "ProductId": 0, product itm
        //     "Quantity": 0, product itm 
        //     "AddedDate": "2023-11-20T15:02:00.603Z"
        //   }

        try {
            const useinfo_ls = localStorage.getItem("userInfo");
            const getCustId = JSON.parse(useinfo_ls);
            let obj = {
                "CustId": item.custId,
                "ProductId": item.productId,
                "Quantity": item.quantity,
                "AddedDate": new Date()
            }
            const response = await axios.post("https://onlinetestapi.gerasim.in/api/Ecomm/AddToCart", obj);
            console.log(">>>add to cart", response);
            cartNumb.getCartNum();
        } catch (error) {
            console.log(error)
        }
    }
    const openProduct = (product) => {
        navigate(`/ProductDetail?id=${product.productId}`, { state: product });
    }
    return (
        <div className='container'>
            <div className='row'>
            {cartNumb.globalObj.mobileData.length > 0 && cartNumb.globalObj.mobileData.map((item,index)=>{
               
                    return (

                        <div className="card col-4 mx-2 mt-4" style={{ width: "18rem" }}>
                            <button className='' style={{ width: "4rem" }}> <span className="badge bg-secondary">Delete</span> </button>
                            <img className="card-img-top" src={item.productImageUrl} alt="Card  cap" onClick={() => openProduct(item)} />
                            <div className="card-body">
                                <h5 className="card-title">{item.productName}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                            <div className="btn-group" style={{ width: "10rem", height: "2rem" }} role="group" aria-label="Basic example">
                                <button type="button" onClick={() => increMent(index)} class="btn btn-secondary">+</button>
                                <button type="button" className="btn btn-secondary">{item.quantity ? item.quantity : 0}</button>
                                <button type="button" className="btn btn-secondary">-</button>
                                <button className="btn btn-primary" style={{ width: "15rem", height: "2rem" }} onClick={() => addToCart(item)}>Addtocart</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default HOC(Mobail);