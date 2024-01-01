import React, { useContext, useEffect, useState } from 'react';
//import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faRightToBracket, faUserPlus, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { getData } from '../other/commone';
import { Link } from 'react-router-dom';
import { Appcontext } from '../App.js';
const Navbarr = () => {
  const cartNumb = useContext(Appcontext)
  console.log(cartNumb);
  const [navData, setNavData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo !== null) {
      setIsLogin(true);
    }
    cartNumb.setActiveTb()
    getData().then((data) => {
      setNavData(data);
    });
  }, [])
  const setActiveTAB = (path) => {
    cartNumb.setActiveTb(path)
  }
  const logout = () => {
    localStorage.clear();
    window.location.href = "/"
  }
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "25px" }}></FontAwesomeIcon>
        <Nav.Item>
          <Nav.Link as={Link} href="/eCom">eCom</Nav.Link>
        </Nav.Item>
        <Nav className="me-auto">
          {navData && navData.length > 0 && navData.slice(0, 5).map((item, index) => {
            {/* {navData.length>0 && navData.slice(0,5).map((item, index) => { */ }
            return (
              <Nav.Link as={Link} to={item.categoryName} onClick={() => setActiveTAB(item.categoryName)} style={cartNumb.curntPath.indexOf(item.categoryName) > -1 ? { color: "red" } : {}}>{item.categoryName}</Nav.Link>
            )
          })}
          {/* <select value="Create"> CreateProduct </select> */}
         {/* <Nav.Link as={Link}to="/createproduct"onClick={()=>setActiveTAB("CreateProduct")}style={cartNumb.curntPath.indexOf("createproduct") > -1 ? {color:"red"} : {}}>CreateProduct</Nav.Link> */}
          {/* <Nav.Link as={Link} to="/shopcart"><sup classNameName='offset-3' style={cartNumb.curntPath.indexOf("shopcart") > -1 ? { color: "red" } : {}}>{cartNumb.cartNum}<FontAwesomeIcon icon={faBagShopping} style={{ fontSize: "20px", color: "orange" }}></FontAwesomeIcon></sup></Nav.Link> */}
        </Nav>
        <Nav className="ml-auto">
          {!isLogin && <>
            <Nav.Link as={Link} to="/login" onClick={() => setActiveTAB("Login")}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon>Login</Nav.Link>
            <Nav.Link as={Link} to="/Signup" onClick={() => setActiveTAB("Signup")}><FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>Sign up</Nav.Link>
          </>
          }
          {isLogin &&
            <>
              <Nav.Link as={Link} to="/createproduct" onClick={() => setActiveTAB("CreateProduct")} style={cartNumb.curntPath.indexOf("createproduct") > -1 ? { color: "red" } : {}}>
                <select className='bg-primary' onClick={() => setActiveTAB("CreateProduct")} style={cartNumb.curntPath.indexOf("createproduct") > -1 ? { color: "red" } : {}} >
                  <option value="Create" onClick={() => setActiveTAB("CreateProduct")} style={cartNumb.curntPath.indexOf("createproduct") > -1 ? { color: "red" } : {}}>CreateProduct</option>
                  <option value="Create" onClick={() => setActiveTAB("CreateProduct")} style={cartNumb.curntPath.indexOf("createproduct") > -1 ? { color: "red" } : {}}>Create Category</option>
                </select>
              </Nav.Link>
              <Nav.Link as={Link} to="/shopcart" onClick={() => setActiveTAB("shopcart")}  style={cartNumb.curntPath.indexOf("shopcart") > -1 ? { color: "red" } : {}}><FontAwesomeIcon icon={faBagShopping} style={{ fontSize: "20px", color: "orange" }}></FontAwesomeIcon><sup>{cartNumb.cartDatainfo?.length}</sup></Nav.Link>
              {/* <Nav.Link as={Link} to="/shopcart" onClick={() => setActiveTAB("shopcart")}  style={cartNumb.curntPath.indexOf("shopcart") > -1 ? { color: "red" } : {}}><FontAwesomeIcon icon={faBagShopping} style={{ fontSize: "20px", color: "orange" }}></FontAwesomeIcon><sup>{cartNumb.cartDatainfo?.length}</sup></Nav.Link> */}
              {/* <Nav.Link as={Link} to="/shopcart"><sup classNameName='offset-3' style={cartNumb.curntPath.indexOf("shopcart") > -1 ? { color: "red" } : {}}><FontAwesomeIcon icon={faBagShopping} style={{ fontSize: "20px", color: "orange" }}></FontAwesomeIcon></sup></Nav.Link> */}
              <Nav.Link as={Link} to="/Logout" onClick={() => logout()} style={{ color: "white" }}><FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>Logout</Nav.Link>
            </>
          }
        </Nav>
      </Navbar>
    </div >
  );
};
export default Navbarr;