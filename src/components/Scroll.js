import React from 'react';


const Scroll = (props) => {
    // console.log(props);
    // return props.children;
    return (
        // kurung kurawal pertama = JSX, kedua = return object di JSX
        <div style={{ overflowY: 'scroll', border: '5px solid black', height: '800px' }}>
            {props.children}
        </div>
    )
};

export default Scroll;