import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//navigates between routes
import FormValidation from "./FormValidation";
// no {} for import 

function GeneratePage() {
  const navigate = useNavigate();
  // ensure the form only submit once to the backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  // for form validation 
  const [showInvalid, setShowInvalid] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [formData, setFormData] = useState({
    // need a colon
    cookingInvolved: false,
    type: "",
    attendees: "",
    budgets: "",
    dietary: "",
    store: [],
  });
  function handleChange(e) {
    var target = e.target;
    var name = target.name;
    var type = target.type;
    var value = target.value;
    var checked = target.checked;

    function update(data) {
      return {
        ...data,
        [name]: type == "radio" ? JSON.parse(value) : value,
      };
    }

    setFormData(update);
  }

  function handleMultiSelect(e) {
    var target = e.target;
    var value = target.value;
    var checked = target.checked;

    function update(data) {
      return {
        ...data,
        store: checked
          ? [...data.store, value]
          : data.store.filter((item) => item !== value),
      };
    }

    setFormData(update);
  }

  function validateForm() {
    const requiredFields = [
      { name: 'type', label: 'Event Type' },
      { name: 'attendees', label: 'Number of Attendees' },
      { name: 'budgets', label: 'Budget' },
      { name: 'dietary', label: 'Dietary Requirement' },
    ];
    // construct a new array containing data with props name + label 
  
    const missing = requiredFields
      .filter(field => !formData[field.name])
      .map(field => field.label);
  // the array containing the label of all missing fields
    setMissingFields(missing);
    return missing.length === 0; // there is no missing fields;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    // before fetch data, do validation first, fail - submit will not proceed 
    if (!validateForm()) {
      setShowInvalid(true); // Show the pop-up window if validation fails
      return;
    } 
    if (isSubmitting == false) {
      setIsSubmitting(true);
      fetch("http://localhost:5002/generate", {
        method: "POST",
        mode: "cors",  
      //  credentials: "include",
        headers: { "Content-Type": "application/json" ,
        "Accept": "application/json",
       "ngrok-skip-browser-warning": "true" 
      },
        // Converting JavaScript → JSON (when sending to server)
        body: JSON.stringify(formData),
      }) .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
       // Converting JSON → JavaScript (when receiving from server)
      })
      .then(data => {
        console.log( {data});
        navigate("/result", { state: { responseData: data } });
      })
      .catch(error => {
        console.error({error});
        setIsSubmitting(false); 
      });
    }
  }

  if (isSubmitting) return;

  return (
    <div>
      <h1 style={titleStyle}>Enter Your Event Details</h1>
      <form style={formStyle}>
        <div className="Cooking">
          <h2>Cooking Involved: </h2>
          <div>
            <label>
              <input
                type="radio"
                name="cookingInvolved"
                value="true"
                checked={formData.cookingInvolved === true}
                onChange={handleChange}
              />
              Yes
            </label>
            {/* </div>
          <div> */}
            <label>
              <input
                type="radio"
                name="cookingInvolved"
                value="false"
                checked={formData.cookingInvolved === false}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="EventType">
          <h2>Event Type:</h2>
          <div>
            <input
              type="text"
              name="type"
              placeholder="eg.Birthday Party"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="Number">
          <h2>Number of Attendees :</h2>
          <div>
            <input
              type="Number"
              name="attendees"
              placeholder="eg.4"
              value={formData.attendees}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="Budgets">
          <h2>Budgets(S$):</h2>
          <div>
            <input
              type="Number"
              name="budgets"
              placeholder="eg.100"
              value={formData.budgets}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="Dietary">
          <h2>Dietary Requirement:</h2>
          <div>
            <input
              type="text"
              name="dietary"
              placeholder="eg.Halal"
              value={formData.dietary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="Store">
          <h2>Purchase From:</h2>
          <div>
            {["McDonald's", "KFC", "Sheng Siong", "Krispy Kreme"].map(
              (option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.store.includes(option)}
                    onChange={handleMultiSelect}
                  />
                  {option}
                </label>
              )
            )}
          </div>
        </div>
        <button style = {buttonStyle}onClick={handleSubmit}>Generate</button>
      </form>
      <FormValidation
      open={showInvalid} 
      close={() => setShowInvalid(false)} 
      missingFields={missingFields} 
    />
    </div>
  );
}

export default function Board() {
  return (
    <div>
      <Header />
      <GeneratePage />
    </div>
  );
}

const titleStyle = {
  borderWidth: "0px",
  position: "absolute",
  left: "500px",
  top: "100px",
  width: "407px",
  height: "39px",
  display: "flex",
  fontFamily: '"Arial-BoldMT", "Arial Bold", "Arial", sans-serif',
  fontWeight: "700",
  fontStyle: "normal",
  fontSize: "34px",
  color: "#2E86AB",
  textAlign: "center",
};

const formStyle = {
  position: "absolute",
  left: "500px",
  top: "150px",
  textAlign: "center"
};

const buttonStyle = {
  marginTop: '30px'
}