import Header from "./Header";
import Slogan from "./Slogan";
import Start from "./Start";
import KFC from "./images/KFC.png";
import KK from "./images/KK.jpg";
import McDonald from "./images/McDonald.png";
import SS from "./images/SS.png";
import { useNavigate } from "react-router-dom";

export default function Board() {
  const navigate = useNavigate();
  const imageStyle = {
    position: "absolute",
    left: "180px",
    top: "503px",
  };
  return (
    <div>
      <div position={"relative"}>
        <Header />
        <Slogan />
        <Start />
      </div>
      <div className="image" style={imageStyle}>
        <img src={KFC} alt="KFC" />
        <img
          src={KK}
          alt="KK"
          style={{ width: "100%", maxWidth: "258px", height: "auto" }}
        />
        <img
          src={SS}
          alt="SS"
          style={{ width: "100%", maxWidth: "258px", height: "auto" }}
        />
        <img
          src={McDonald}
          alt="McDonald"
          style={{
            width: "100%",
            maxWidth: "258px",
            height: "auto",
            margin: "20px",
          }}
        />
      </div>
    </div>
  );
}
