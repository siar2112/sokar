import React, { useState } from 'react';
import './stylesFiles/createAccount.css';

const InputTextField = ({ type, label, name, onChange}) => {
    const [hasContent, setHasContent] = useState(false);


    const handleBlur = (e) => {
        if (e.target.value !== "") {
            setHasContent(true);
        } else {
            setHasContent(false);
        }
    }

    return (
        <div>
            <input onBlur={handleBlur} className={`textField ${hasContent ? 'has-content' : ''}`} type={type} name={name} onChange={onChange} />
            <label>{label}</label>
            <span className="focus-border"></span>
        </div>
    );
}

export default InputTextField;