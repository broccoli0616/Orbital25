import Header from "./Header";
import Slogan from "./Slogan";
import Start from "./Start";
import KFC from "./images/KFC.png";
import KK from "./images/KK.jpg";
import McDonald from "./images/McDonald.png";
import SS from "./images/SS.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Board() {
  const navigate = useNavigate();
  const [showKFC, setShowKFC] = useState(false);
  const [showKK, setShowKK] = useState(false);
  const [showSS, setShowSS] = useState(false);
  const [showMcDonald, setShowMcDonald] = useState(false);
   const imageStyle = {
    position: "absolute",
    left: "180px",
    top: "503px",
     display: "flex",     // for horizontal alignment
   flexDirection: "row",  
     gap: "20px"
  };

   const picStyle = {
    width: "100%",
    maxWidth: "258px",
    height: "auto",
    position: "relative", 
    cursor: "pointer",
  };

   const popupStyle = {
    position: "absolute",
    bottom: "-5px", // Position below the image
    left: "50%",
   transform: "translateX(-50%)", //center the entire element
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    zIndex: 100, // Ensures popup appears above other elements
    width: "200px",
    textAlign: "center",
  };

  return (
    <div>
      <div position={"relative"}>
        <Header />
        <Slogan />
        <Start />
      </div>
      <div className="image" style={imageStyle}>
         <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowKFC(true)}
          onMouseLeave={() => setShowKFC(false)}
        >
          <img src={KFC} alt="KFC" style={picStyle} />
          {showKFC && (
            <div style={popupStyle}>KFC Clementi Mall(129588) KFC Star Vista(138617)</div>
          )}
          {/* If showKFC is true, then render the <div> with the popup text(direction of this store). Otherwise, don't render anything */}
        </div>
       
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowKK(true)}
          onMouseLeave={() => setShowKK(false)}
        >
          <img src={KK} alt="KK" style={picStyle} />
          {showKK && (
            <div style={popupStyle}>Krispy Kreme The Clementi Mall(129588)</div>
          )}
      
        </div>
         <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowSS(true)}
          onMouseLeave={() => setShowSS(false)}
        >
          <img src={SS} alt="Sheng Siong" style={picStyle} />
          {showSS && (
            <div style={popupStyle}>Sheng Siong Supermarket Commonwealth View(141088) Sheng Siong Supemarket Clementi Avenue 2(120352)</div>
          )}
      
        </div>
       <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowMcDonald(true)}
          onMouseLeave={() => setShowMcDonald(false)}
        >
          <img src={McDonald} alt="McDonald" style={picStyle} />
          {showMcDonald && (
            <div style={popupStyle}>McDonald's Clementi Mall(129588)</div>
          )}
      
        </div>
    </div>
    </div>
  );
}


 