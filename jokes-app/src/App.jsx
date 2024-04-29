import Joke from "./components/joke";
import { JOKES_URL } from "./constants";
import "./App.css";

function App() {
  return (
    <>
      <h2>Joke</h2>
      <Joke url={JOKES_URL} />
    </>
  );
}

export default App;
