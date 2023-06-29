import React from 'react';
import './stylesFiles/createAccount.css';

const SelectPosition = (onChange) => {

    return (
        <div>
            <label style={{fontSize:"25px", paddingRight:"5%"}} htmlFor="position_selector">Which position do you want to play:</label>
            <select style={{paddingRight: "10px", paddingLeft:"10px",paddingTop:"5px",paddingBottom:"5px",background:"#edf2ff",border:"none",
                borderRadius:"20px"}} name="position" className="form_selector" onChange={onChange}>
                <option value="ATT">Attacker</option>
                <option value="MID">Midfielder</option>
                <option value="DEF">Defender</option>
                <option value="G">Goalkeeper</option>
            </select>
        </div>
    );
}

export default SelectPosition;