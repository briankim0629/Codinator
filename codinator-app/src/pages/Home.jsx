import StyleSelection from "../components/ChooseStyle";
import Closet from "../components/Closet";
import Upload from "../components/Upload";

function Home() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          backgroundColor: "#e8e8e8",
          minHeight: "70vh",
        }}
      >
        {/* Upload section (gray) */}
        <div
          style={{
            flex: 4,
            padding: "40px 60px",
            backgroundColor: "#e8e8e8",
            boxSizing: "borderbox",
          }}
        >
          <Upload />
        </div>

        {/* Closet section (white) */}
        <div
          style={{
            flex: 8,
            padding: "40px 60px",
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
          }}
        >
          <Closet />
        </div>
      </div>
          <StyleSelection/>
          
    </div>
  );
}

export default Home;
