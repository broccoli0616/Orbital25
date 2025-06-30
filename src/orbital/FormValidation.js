import React from "react";

// Functional component with props destructuring
function FormValidation({open, close, missingFields}) {
 // open: boolean to control visiability
 // close: function to close the pop-up window 
 // missingfileds: array to indicate missingfields

 if (!open) return null;

 return (
    <div className="window" style={windowStyle} >
    <div className ="text" style = {textStyle}>
    <h3 style={headerStyle}>Error: Requirement Form is Incomplete! </h3>
    <p >Please fill in the following fields: </p>
    <ul>
  {missingFields.map((field, index) => (
    <li key={index}>{field}</li>
  ))}
</ul>
</div>
<button 
  onClick={close}
  style={buttonStyle}
>
  OK
</button>
</div>
 );
}
const windowStyle ={
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const textStyle ={
    backgroundColor: '#2E86AB',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px'
};

const headerStyle ={
    color: 'white',
    marginBottom: '10px'
     // 10px of empty space below it before the <p> starts
}

const buttonStyle = {
   padding: '8px 16px',
    backgroundColor: '#2E86AB',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  export default FormValidation;