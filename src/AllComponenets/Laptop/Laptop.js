
import React, { useContext, useEffect, useState } from 'react';
import { getLaptopData } from '../../other/commone';
import axios from 'axios';
import { Appcontext } from '../../App';
import HOC from '../../other/HOC';
import '../Mobile/Mobail.css'
const Laptop = () => {
    const cartNumb = useContext(Appcontext)
    console.log(cartNumb);
    const useInfo = localStorage.getItem("userInfo");
    console.log(useInfo);
    const [laptopdata, setLaptopData] = useState([]);
    const [qty, setQty] = useState(0);
    useEffect(() => {
        cartNumb.setActiveTb('Laptop')
        if(cartNumb.globalObj.laptopData.length===0){
            getLaptopData().then((data) => {
            cartNumb.setGlobalData("laptopData",data)
               // setLaptopData(data);
            });
        }
       
    }, [])
    const increMent = (index) => {
        // setQty(qty+1);
        console.log(index, laptopdata[index]);
        setLaptopData(prevState => {
            let updateLaptopData = prevState.map((item, ind) => {
                if (ind === index) {
                    let quantity = item.quantity ? item.quantity + 1 : 1;
                    return { ...item, quantity: quantity }
                } else {
                    return { ...item };
                }
            })
            return updateLaptopData
        })
    }
    const addToCart = async (item) => {
        console.log(item, new Date());
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
    return (
        <div className='container'>
            <div className='row'>
                {cartNumb.globalObj.laptopData.length> 0 && cartNumb.globalObj.laptopData.map((item,index)=>{
                {/* {laptopdata.length > 0 && laptopdata.map((item, index) => { */}
                      return (
                        
                        <div className="card col-4 mx-2 mt-4" style={{ width: "18rem" }}>
                        <button className='' style={{ width: "4rem" }}> <span className="badge bg-secondary">Delete</span> </button>
                        <img className="card-img-top" src={item.productImageUrl} alt="Card  cap" />
                        <div className="card-body">
                            <h5 className="card-title">{item.productName}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        
                    
                      <div className="btn-group"style={{width:"10rem",height:"2rem"}} role="group" aria-label="Basic example">
                            <button type="button" onClick={() => increMent(index)} class="btn btn-secondary">+</button>
                            <button type="button" className="btn btn-secondary">{item.quantity ? item.quantity : 0}</button>
                            <button type="button" className="btn btn-secondary">-</button>
                            <button className="btn btn-primary"style={{width:"15rem",height:"2rem"}} onClick={() => addToCart(item)}>Addtocart</button>
                        </div>
                       

                         
            

                    


                    </div>
                                            
                )

                })}
            </div>
        </div>
    );
};

export default HOC(Laptop);
