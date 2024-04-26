import "./App.css";
import Fact from "./components/fact";
import { RANDOM_ENDPOINT, TODAYS_ENDPOINT } from "./constants";

function App() {
  return (
    <>
      <h2>Today's useless fact</h2>
      <Fact url={TODAYS_ENDPOINT} />
      <h2>Random useless fact</h2>
      <Fact url={RANDOM_ENDPOINT} />
    </>
  );
}

export default App;
