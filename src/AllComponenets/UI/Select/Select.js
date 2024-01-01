import React from 'react';

const Select = (props) => {
    return (
        <>
          <select vlaue={props.value}
            className={props.handleError ?"form-select from-control is-invalid":"form-select form-control"}
            id={props.fieldname}onChange={(e)=>props.onChangeHandler(props.fieldname,e.target.value)}

          >
            <option selected>open this select menu</option>
            {props.options.map((item,index)=>{
                return(
                    <option value={item}>{item}</option>
                )
            })}

          </select>
          {props.handleError&&<div className='invalid-feedback'></div>}
          please provide a valid city.
        </>
    );
};

export default Select;