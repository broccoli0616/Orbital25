function Slogan() {
  const sloganStyle = {
    borderWidth: "0px",
    position: "absolute",
    left: "173px",
    top: "180px",
    width: "1120px",
    height: "44px",
    display: "flex",
    background: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: "0px",
    filter: "drop-shadow(none)",
    transition: "none",
    fontFamily: "ComicSansMS-Bold",
    fontWeight: 1000,
    fontSize: "32px",
    fontStyle: "large",
    color: "#2E86AB",
    textAlign: "center",
    alignItems: "center",
  };
  const textStyle = {
    fontfamily: 'Arial-BoldMT, "Arial Bold", Arial, sans-serif',
    fontWeight: 700,
    fontStyle: "normal",
    textAlign: "center",
    color: "black",
    fontSize: "18px",
    // padding: "20px",
    position: "absolute",
    alignSelf: "flexstart",
    padding: "0 30px",
    boxSizing: "borderbox",
    width: "100%",
  };

  return (
    <div className="slogan" style={sloganStyle}>
      <div className="text">
        <p>
          Generate Your Event Shopping List Easily, Save Valuable Time for Fun
        </p>
        <p style={textStyle}>
          Our AI-powered tool helps NUS students quickly create shopping lists
          from nearby fast-food stores or supermarkets for parties or cooking
          events based on your budget, preferences, and number of attendees.
        </p>
      </div>
    </div>
  );
}

export default function Board() {
  return (
    <div position={"relative"}>
      <Slogan />
    </div>
  );
}
