import Header from "./Header";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
//Accessing passed route state

function ResultPage() {
  const location = useLocation();
  const [resultData, setResultData] = useState([]); 

  useEffect(() => {
    if (location.state?.responseData) {
      setResultData(location.state.responseData);
    }
  }, [location.state]); // Re-run if location.state changes

  const titleStyle = {
    borderWidth: "0px",
    position: "absolute",
    left: "339px",
    top: "127px",
    width: "556px",
    height: "39px",
    display: "flex",
    fontFamily: 'Arial-BoldMT, "Arial Bold", Arial, sans-serif',
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "34px",
    color: "#2E86AB",
    textAlign: "center",
  };

  const tableStyle = {
    borderWidth: "0px",
    position: "absolute",
    left: "339px",
    top: "203px",
    width: "636px",
    // height: "377px",
    fontFamily: "ArialMT, Arial, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "13px",
    letterSpacing: "normal",
    textAlign: "center",
    lineHeight: "normal",
  };

  return (
    <div>
      <Header />
      <h1 style={titleStyle}>Your Personalized Shopping List</h1>
      <div className="resultTable">
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>Items</th>
              <th>Stores</th>
              <th>Quantity</th>
              <th>Prices</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((item) => (
              <tr>
                <td>{item.Items}</td>
                <td>{item.Stores}</td>
                <td>{item.Quantity}</td>
                <td>{item.Prices}</td>
                <td>{item.Total}</td>
              </tr>
            ))}
            {/* if no {}, it will be considered as text instead of js code ; */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;
