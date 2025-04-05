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
        <div style={{ display: "flex", width: "100%", backgroundColor: "#e8e8e8" }}>
          <Upload />
          <Closet />
        </div>
      </div>
          <StyleSelection/>
          
    </div>
  );
}

export default Home;
