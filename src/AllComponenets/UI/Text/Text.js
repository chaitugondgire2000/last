import React from 'react';

const Text = (props) => {
    return (
        <>
            <input type={props.type}id={props.fieldname}className={props.handleError ?"form-control is-invalid":"form-control"}
            vlaue={props.value}onChange={(e)=>props.onChange(props.fieldname,e.target.value)}
            placeholder={props.placeholder}>

            </input>
            {props.handleError && <div className='invalid-feedback'>
                please provide a valid city
                </div>}

        </>
    );
};

export default Text;