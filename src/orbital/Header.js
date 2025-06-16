function Header() {
    const headerStyle = {
      width: "100vw",
      backgroundColor: "#2E86AB",
      color: "white",
      padding: "15px 20px",
      fontFamily: "Arial, sans-serif",
      fontSize: "24px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };
    const logoStyle = {
      display: "flex",
      alignitems: "center",
    };
    const logoai = {
      color: "#F97200",
    };
  
    return (
      <div class="header" style={headerStyle}>
        <div class="logo" style={logoStyle}>
          <span>sh</span>
          <span class="logo-ai" style={logoai}>
            AI
          </span>
          <span>pping_list@ NUS</span>
        </div>
      </div>
    );
  }
  
  import React from "react";
  
  export default function Board() {
    return <Header />;
  }
  