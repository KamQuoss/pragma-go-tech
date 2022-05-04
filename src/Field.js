import React, { useContext } from "react";
import GameContext from "./GameContext";

const Field = ({ id, onChange }) => {
    const [checked, fields] = useContext(GameContext);
    const frog = fields[id];

    let fieldStyle = {
        backgroundColor: frog !== null ? '#5AAA95' : 'transparent'
    }

    return (
        <label key={id} style={fieldStyle}>
            <input
                type='checkbox'
                onChange={() => onChange(id)}
                checked={checked.includes(id)}>
            </input>
            {frog?.gender === 'male' ? <span>male</span> : ''}
            {frog?.gender === 'female' ? <span>female</span> : ''}
        </label>
    )
}

export default Field