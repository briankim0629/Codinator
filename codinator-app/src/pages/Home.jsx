import StyleSelection from "../components/ChooseStyle";
import Closet from "../components/Closet";
import Upload from "../components/Upload";

function Home() {
  return (
    <div>
      <div
        style={{
          padding: "20px",
          margin: "120",
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "#e8e8e8",
        }}
      >
        <Upload />
        <Closet />
          </div>
          <StyleSelection/> 
    </div>
  );
}

export default Home;
