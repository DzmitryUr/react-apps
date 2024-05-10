import { ADVICES_URL } from "./constants";
import Advice from "./components/Advice";
import "./App.css";

function App() {
  return <Advice url={ADVICES_URL} />;
}

export default App;
