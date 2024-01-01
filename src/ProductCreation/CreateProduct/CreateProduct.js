import React,{useEffect, useState} from 'react';
import { getData } from '../../other/commone';

import axios from 'axios';

const CreateProduct = () => {
  const [navData, setNavData] = useState([]);
  const [creatProduct,setCreateProduct] = useState({
      ProductSku:"",
      ProductName:"",
      ProductPrice:"",
      ProductShortName:"",
      ProductDescription:"",
      CreatedDate:"",
      DeliveryTimeSpan:"",  // drop
      CategoryId:"",    //drop
      ProductImageUrl:""
  })

  const onChangeHandler=(fieldname,value)=>{
      setCreateProduct(prevState=>({
          ...prevState,[fieldname]:value
      }))
  }

  useEffect(()=>{
    getData().then((data)=>{
      setNavData(data);
    })
      
  },[])

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(creatProduct);
    //api logic

    let reqBoy = creatProduct;
    reqBoy.CreatedDate= new Date();

   const res =  axios.post ("https://onlinetestapi.gerasim.in/api/Ecomm/CreateProduct",reqBoy);
  }

    return (

      <div className='container'>
        <div className='row col-6 offset-3'>
          <form onSubmit={(e) => submitHandler(e)}>
            <div class="form-group">
              <label for="exampleInputEmail1">ProductSku</label>
              <input type="text" value={creatProduct.ProductSku} onChange={(e) => onChangeHandler("ProductSku", e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">ProductName</label>
              <input type="text" value={creatProduct.ProductName} onChange={(e) => onChangeHandler("ProductName", e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">ProductPrice</label>
              <input type="text" value={creatProduct.ProductPrice} onChange={(e) => onChangeHandler("ProductPrice", e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">ProductShortName</label>
              <input type="text" value={creatProduct.ProductShortName} onChange={(e) => onChangeHandler("ProductShortName", e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">ProductDescription</label>
              <input type="text" value={creatProduct.ProductDescription} onChange={(e) => onChangeHandler("ProductDescription", e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Delivery Time Span</label>
              <select class="form-select" onChange={(e) => onChangeHandler("DeliveryTimeSpan", e.target.value)} aria-label="Default select example">
                <option selected>Select time span</option>
                <option value="one week">one week</option>
                <option value="15 days">15 days</option>
                <option value="12 days">12 days</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Select Product </label>
              <select class="form-select" onChange={(e) => onChangeHandler("CategoryId", e.target.value)} aria-label="Default select example">
                <option selected>Open this select category</option>
                {navData.slice(0, 5).map((item, index) => {
                  return (
                    <option value={item.categoryId}>{item.categoryName}</option>
                  )

                })}
              </select>

            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">ProductImageUrl</label>
              <input type="text" value={creatProduct.ProductImageUrl} onChange={(e) => onChangeHandler("ProductImageUrl", e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>



            <button type="submit" class="btn btn-primary">Submit</button>
          </form>

        </div>

      </div>

    );
  };

  export default CreateProduct;