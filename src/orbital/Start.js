import { useNavigate } from "react-router-dom";
function Start() {
  const navigate = useNavigate();
  const buttonStyle = {
    backgroudColor: "#2E86AB",
    Color: "#2E86AB",
    position: "absolute",
    left: "650px",
    top: "337px",
    margin: "30px",
    width: "140px",
    height: "60px",
    fontSize: "18px",
  };
  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={() => navigate("/generate")}
    >
      {" "}
      Generate Now{" "}
    </button>
  );
}

export default function Board() {
  return (
    <div position={"relative"}>
      <Start />
    </div>
  );
}
