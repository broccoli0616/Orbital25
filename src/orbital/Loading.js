import React from "react";

function Loading({ open, message }) {

 if (!open) return null;

 return (
    <div style={windowStyle} >
      <div style={textStyle}>
        <h3 style={headerStyle}>Processing Your Request</h3>
        <p>{message}</p>
      </div>
    </div>
 );
}

const windowStyle = {
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

const textStyle = {
    backgroundColor: '#2E86AB',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    textAlign: 'center',
};

const headerStyle = {
    color: 'white',
    marginBottom: '10px'
};

export default Loading;