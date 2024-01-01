import axios from'axios';
import React, { useState } from 'react';
import'../Mobile/Mobail.css'
import Label from '../UI/Label/Label';
import Text from '../UI/Text/Text';
import Select from '../UI/Select/Select';


const Login = () => {
    const [formData, setFormData] = useState({
        username: "", paasword: ""
    })
   const [error,setError] = useState([]);
    const onChangeHandler = (fieldname, value) => {
        setFormData(prev => ({ ...prev, [fieldname]: value }));
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        let errorArray = [];
        const { username, paasword } = formData;


        // if (username === "") {
        //     errorArray.push("username")

        // }
        // if (paasword === "") {
        //     errorArray.push("paasword")

        // }

        for(let x in formData){
            if(formData[x] === ""){
                errorArray.push(x)  
            }
        }
        setError(errorArray);

        if (errorArray.length <= 0) {
            //api hit 
           let reqBdy ={
            "UserName":username,
            "UserPassword": paasword
           }

           const result  = await axios.post(`https://onlinetestapi.gerasim.in/api/Ecomm/Login`,reqBdy);

           console.log(result.data);
           const response = result.data
           if(response.data !== null  && response.result ){
               localStorage.setItem("userInfo",JSON.stringify(response.data));
               alert("Login Succesfull");
               window.location.href = "/";
              
           }else{
            alert(response.message)
           }
            // {
            //     "UserName": "3874834783478347",
            //     "UserPassword": "prava@1234"
            //   }

        }
    }

    const handleError = (value) => {

      return  error.indexOf(value) > -1 ? true : false;
   }
   const optionArray=["Mumbai","Pune","Nashik"];
 return (
<div className='container offset-3 col-6 pt-3'>

<form onSubmit={(e) => submitHandler(e)}>
    <div className="form-group mt-2">
        <Label labelName="User Name"></Label>
        <Text type="text" value={formData.username} placeholder="please enter username "
            onChange={onChangeHandler} fieldname="username"
            handleError={handleError("username")}
        ></Text>
    </div>
    <div className="form-group mt-2">
        <Label labelName="Password"></Label>
        <Text type="password" value={formData.paasword} placeholder="please enter password "
            onChange={onChangeHandler} fieldname="paasword"
            handleError={handleError("paasword")}
        ></Text>
    </div>
    <div className="form-group mt-2">
        <Label labelName="Drop Down"></Label>
        <Select value={formData.dropvalue} fieldname="dropvalue" 
         options={optionArray} onChangeHandler={onChangeHandler}
         handleError={handleError("dropvalue")}
        ></Select>
        </div>


    <button type="submit" className="btn btn-primary mt-2">Submit</button>


    

</form>
</div>





    
    );
};

export default Login;