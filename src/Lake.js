import React from 'react'
import Field from './Field'

const Lake = ({fields, onChange}) => {

    const stylesLake = {
        display: 'grid',
        gridTemplateColumns: 'repeat(10,100px)',
        gridTemplateRows: 'repeat(6, 100px)',
        gridGap: 6,
    }

    return (
        <div style={stylesLake}>
            {fields.map((field, index) => <Field key={index} id={index} onChange={onChange}/>)}
        </div>
    )

}

export default Lake