import Closet from "../components/Closet";
import Upload from "../components/Upload";

function Home() {
  return (
    <div
      style={{
        padding: "20px",
        margin: "60",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
          <Upload />
          <Closet/>
    </div>
  );
}

export default Home;
