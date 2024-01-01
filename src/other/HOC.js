
import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import {Navigate} from 'react-router-dom';
// what is HOC?

// HOC is higher order comonent.

// HOC component allows to reuse component logic across multiple components .

// It takes a component as argument(parameter) and return new component .


const HOC = (WrapperComponent)=>{

   
    
    class NewComponent extends Component {

        constructor(props) {
            super(props);
            this.state={

            }
        }
        componentDidMount(){
            //api call 
            
        }
        
        render(){

            const ls  = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(ls);
            if(userInfo !==null){
                return <WrapperComponent />
            }
            else{
              return  <Navigate  to="/Login"></Navigate>
            }
        }
    }


    return NewComponent;
    


}

export default HOC;