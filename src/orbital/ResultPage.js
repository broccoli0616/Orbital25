import Header from "./Header";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
//Accessing passed route state

function ResultPage() {
  const location = useLocation();
  const [resultData, setResultData] = useState([]); 
  const [feedbackInput, setFeedbackInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.responseData) {  // if not null
      setResultData(location.state.responseData); // set resultData to the data rendered from previous page
    }
  }, [location.state]); // Re-run if location.state changes
  
 
  function handleFeedbackSubmit(e) {
    e.preventDefault();
    console.log(feedbackInput);
    if (isLoading == false) {
      setIsLoading(true);
      fetch("http://localhost:5002/feedback", {
        method: "POST",
        mode: "cors",  
      //  credentials: "include",
        headers: { "Content-Type": "application/json" ,
        "Accept": "application/json",
       "ngrok-skip-browser-warning": "true" 
      },
        // Converting JavaScript → JSON (when sending to server)
        body: JSON.stringify({ feedback: feedbackInput })
      }) .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
       // Converting JSON → JavaScript (when receiving from server)
      })
      .then(data => {
        console.log( {data});
        setResultData(data);
      })
      .catch(error => {
        console.error({error});
        setIsLoading(false); 
      });
    }
  }
   
  return (
    <div>
      <Header />
      <h1 style={titleStyle}>Your Personalized Shopping List</h1> 
      <div style ={constentStyle}>
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
      <div style={feedbackStyle}>
          <h2 style={feedbackTitleStyle}>Not the ideal list that you are looking for? Type down your customised request:</h2>
          <form onSubmit={handleFeedbackSubmit} style={formStyle}>
            <input
              type="text"
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder="eg:I would like to have some desserts"
              style={inputStyle}
            />
            <div style={buttonContainerStyle}>
              <button type="submit" style={submitButtonStyle} disabled={isLoading}>
                {isLoading ? "Processing..." : "Regenerate"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
const titleStyle = {
  borderWidth: "0px",
  position: "absolute",
  left: "400px",
  top: "100px",
  width: "556px",
  height: "39px",
  display: "flex",
  fontFamily: 'Arial-BoldMT, "Arial Bold", Arial, sans-serif',
  fontWeight: "700",
  fontStyle: "normal",
  fontSize: "34px",
  color: "#2E86AB",
};

const tableStyle = {
  borderWidth: "0px",
  position: "relative",
  left: "0px",
  top: "0px",
  width: "636px",
  //height: "377px",
  fontFamily: "ArialMT, Arial, sans-serif",
  fontWeight: "400",
  fontStyle: "normal",
  fontSize: "13px",
  letterSpacing: "normal",
  textAlign: "center",
  lineHeight: "normal",
};

const feedbackStyle = {
   marginTop: '50px', 
   flexDirection: 'column', // Stack items vertically
   width: '636px', 
  display: "flex"
}
const feedbackTitleStyle = {
  fontFamily: 'Arial-BoldMT, "Arial Bold", Arial, sans-serif',
 // fontWeight: "700",
  fontStyle: "normal",
//  fontSize: "34px",
  color: "#2E86AB",
}
const constentStyle = {
  position: 'relative',
  left: '400px',
  top: '150px',
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    // Items are laid out vertically.
    gap: '15px',
}

const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box',
  
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignment:'center'
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#2E86AB',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
};