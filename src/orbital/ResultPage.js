import Header from "./Header";
import Loading from "./Loading";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
//Accessing passed route state
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";


function ResultPage() {
  const location = useLocation();
  const [resultData, setResultData] = useState({
  shoppingList: [],
  cookingTutorial: null
});

  const [feedbackInput, setFeedbackInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const navigate = useNavigate();
  
  const orderNow = () => {
    navigate("/order");
  }
   const backToGenerate = () => {
    navigate("/generate");
  }

  useEffect(() => {
  if (location.state?.responseData) { // if not null
    setResultData({ // set resultData to the data rendered from previous page
      shoppingList: location.state.responseData.shoppingList || [],
      cookingTutorial: location.state.responseData.cookingTutorial || null
    });
  }
}, [location.state]); // Re-run if location.state changes
  
 const exportToPDF = () => {
  const content = document.getElementById('shoppingList'); // store DOM element in content
  html2canvas(content).then(canvas => { //renders the HTML element as a canvas
    // then() if success, convert canvas content to pdf image 
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // p for protrait

    const imgWidth = 210; // A4 width in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('shopping-list.pdf'); // triggers browser download
  });
};
  function handleFeedbackSubmit(e) {
    e.preventDefault();
    console.log(feedbackInput);
    if (isLoading == false) {
      setIsLoading(true);
      fetch("http://localhost:5001/generate", {
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
       setResultData({
       shoppingList: data.shoppingList || [],
       cookingTutorial: data.cookingTutorial || null
  });
      })
      .catch(error => {
        console.error({error});
      }).finally(() => {
        setIsLoading(false); 
      });
    }
  }
   
  return (
    <div>
      <Header />
      <Loading
      open={isInitialLoading || isLoading}  
      message={
        isInitialLoading 
          ? "Generating your shopping list... Please wait for a while."
          : "Processing your feedback... Please wait for a while."
      }
    />
       <div style={{
      position: 'absolute',
      top: '100px',
      right: '50px',
      zIndex: 1000
    }}>
      <button 
        onClick={orderNow}
        style={submitButtonStyle}
      >
       Order Now
      </button>
    </div>
      <div style={{
      position: 'absolute',
      top: '100px',
      left: '50px',
      zIndex: 1000
    }}>
      <button 
        onClick={backToGenerate}
        style={submitButtonStyle}
      >
       Regenerate
      </button>
    </div>
      <div style={pageStyle} > 
      <div id="shoppingList" >
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
            {resultData.shoppingList.map((item) => (
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
         <h2 style={feedbackTitleStyle}>Cooking Tutorial:</h2>
         {resultData.cookingTutorial ? (
           <div style={{ 
      whiteSpace: 'pre-line',
      textAlign: 'left',
      padding: '10px',
      backgroundColor: '#f8f8f8',
      borderRadius: '4px'
    }}>
      {resultData.cookingTutorial}
    </div>
  )
        : <div> no cookingTutorial available </div>}
      </div>
      </div>
      <div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  margin: '20px 0'
}}>
  <button 
    onClick={exportToPDF}
    style={{
      padding: '10px 20px',
      backgroundColor: '#2E86AB', 
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    }}
  >
    Export as PDF
  </button>
  </div>
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
              <button type="submit" style={submitButtonStyle} disabled={isLoading}> {/* button unclickable if isLoading is true */}
                Regenerate
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
 // position: "absolute",
 // left: "400px",
 //top: "100px",
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
//  position: 'relative',
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

const pageStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',  // center the container
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'  // center child elements
}