
import { createContext, useState } from 'react';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Camera from './AllComponenets/Camere/Camera';
import EmptyPag from './AllComponenets/Emptypage/EmptyPag';
import Laptop from './AllComponenets/Laptop/Laptop';
import Mobail from './AllComponenets/Mobile/Mobail';
import Monitor from './AllComponenets/Monitor/Monitor';
import Tablet from './AllComponenets/Tablet/Tablet';
import './App.css';
import Navbarr from './Components/Navbar';
import axios from 'axios';
import Login from './AllComponenets/Login/Login';
import Logout from './AllComponenets/Logout/Logout';
import Singup from './AllComponenets/Singup/Singup';
import ShopCart from './other/shopCart';
import CreateProduct from './ProductCreation/CreateProduct/CreateProduct';
const LazySignup = React.lazy(()=>import('./AllComponenets/Singup/Singup'));
const LazyCreateProduct = React.lazy(()=>import('./ProductCreation/CreateProduct/CreateProduct'))
const LazyShopCart=React.lazy(()=>import( './other/shopCart'));
const LazyLogOut=React.lazy(()=>import('./AllComponenets/Logout/Logout'));
const LazyLogIn=React.lazy(()=>import('./AllComponenets/Login/Login'))
const Appcontext=createContext();
function App() { 
  const [cartData,setCartData] = useState([]);
  const[cartNumber,setCartNumber]=useState(0);
  const [currentPath,setCurrentPath] = useState("")
  const [globalObj,setGlobalObj] = useState({
    mobileData:[],
    cameraData:[],
    tabletData:[],
    laptopData:[],
    monitorData:[]
  
  })
  const getCartNumber = async () => {
    try {
      const res = await axios.get('https://onlinetestapi.gerasim.in/api/Ecomm/GetCartProductsByCustomerId?id=30');
      console.log(res.data.data)
      const cartArray = res.data.data
      setCartNumber(cartArray.length);
    } catch (error) {
    }
  }
  const setActiveTab=(pathNameFromNavbar)=>{
    const urlString = window.location.href;
    const url = new URL(urlString);
   console.log(url.pathname); 
   if(pathNameFromNavbar){
    setCurrentPath(pathNameFromNavbar);
   }else{
     setCurrentPath(url.pathname);
   }
  
  
  }
  const setGlobalData =(keyName,data)=>{
    setGlobalObj(prevState=>({...prevState,[keyName]:data}))
  }

  const incrementGlobalObj =(keyName,index)=>{
    setGlobalObj(prev=>{
      const upDateVal = [...prev[keyName]];
      upDateVal[index].quantity = upDateVal[index].quantity ?  upDateVal[index].quantity +1 : 1;
      console.log(keyName,upDateVal)
      return {
        ...prev,[keyName]:upDateVal
      }
    })

  }

  return (
    <div className='container'>
                                     {/* increMentMobile:increMent,mobileDataInfo:mobileData,setDataMobile:setDataInMobile, */}
      <Appcontext.Provider value={{incrementGlobalObj:incrementGlobalObj,setGlobalData:setGlobalData,globalObj:globalObj,cartDatainfo:cartData,cartNum:cartNumber,getCartNum:getCartNumber,curntPath:currentPath,setActiveTb:setActiveTab}}>
      <BrowserRouter>
      <Navbarr></Navbarr>
      <Routes>
        
        <Route path="/Tablet"element={<Tablet></Tablet>}></Route>
        <Route path="/Monitor"element={<Monitor></Monitor>}></Route>
        <Route path="/Laptop"element={<Laptop></Laptop>}></Route>
        <Route path="/Mobile"element={<Mobail></Mobail>}></Route> 
        <Route path="/Camera" element={<Camera></Camera>}></Route>

        <Route path="/Login"element={<React.Suspense><LazyLogIn></LazyLogIn></React.Suspense>}></Route>
        <Route path="/Signup"element={<React.Suspense><LazySignup/></React.Suspense>}></Route>
        <Route path="/Logout"element={<React.Suspense><LazyLogOut></LazyLogOut></React.Suspense>}></Route>
        <Route path="/createproduct"element={<React.Suspense><LazyCreateProduct></LazyCreateProduct></React.Suspense>}></Route> 
        <Route path="/shopcart"element={<React.Suspense><LazyShopCart></LazyShopCart></React.Suspense>}></Route>
        <Route path="*"element={<EmptyPag></EmptyPag>}></Route>
        
    
      </Routes>
      </BrowserRouter>
      </Appcontext.Provider>
    
     </div>
  );
}

export default App;
export{Appcontext}  