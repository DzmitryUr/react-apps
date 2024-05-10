import { useEffect, useState } from "react";
import "./Advice.css";

const Advice = ({ url }) => {
  const [currentAdvice, setCurrentAdvice] = useState("Loading...");
  const [nextAdvice, setNextAdvice] = useState("");
  const [prevAdvice, setPrevAdvice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAdvice(url);
  }, []);

  const fetchAdvice = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      console.log(response);
      if (!response.ok) {
        setErrorMessage("Error in response");
        return;
      }

      const data = await response.json();
      setCurrentAdvice(data.slip.advice);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error in connection. Try again later.");
    }
  };

  const handlePrevAdvice = () => {
    setNextAdvice(currentAdvice);
    setCurrentAdvice(prevAdvice);
    setPrevAdvice("");
  };

  const handleNextAdvice = () => {
    setPrevAdvice(currentAdvice);
    if (nextAdvice) {
      setCurrentAdvice(nextAdvice);
      setNextAdvice("");
    } else {
      fetchAdvice(url);
    }
  };

  return (
    <div className="advice">
      {errorMessage && (
        <div className="error">
          <span>{errorMessage}</span>
        </div>
      )}
      <span>&#128526; &#128526; &#128526;</span>
      <div>{currentAdvice}</div>
      <button onClick={handlePrevAdvice} disabled={!prevAdvice}>
        Prev Advice
      </button>
      <button onClick={handleNextAdvice}>Next Advice</button>
    </div>
  );
};

export default Advice;
