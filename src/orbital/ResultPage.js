import Header from "./Header";
import { useState } from "react";
import { useEffect } from "react";

function ResultPage() {
  const [mockData, setMockData] = useState([]);
  // useEffect(() => {
  //   fetch("https://0237-222-210-137-155.ngrok-free.app/generate", {
  //     headers: {
  //       "ngrok-skip-browser-warning": "true",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setMockData(data));
  // }, []);

  useEffect(() => {
    fetch("https://a7d5-222-210-137-155.ngrok-free.app/generate", {
      method: "POST", // Your backend only accepts POST
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Accept: "application/json", // Force JSON response
      },
      body: JSON.stringify({ requestType: "getResults" }), // Add identifier
    })
      .then((response) => response.json())
      .then((data) => setMockData(data));
  }, []);

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
            {mockData.map((item) => (
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
