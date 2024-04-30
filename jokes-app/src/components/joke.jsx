import { useEffect, useState } from "react";
import "./joke.css";

const Joke = ({ url }) => {
  const [text, setText] = useState("Loading...");

  useEffect(() => {
    getJoke(url);
  }, []);

  const getJoke = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        setText("Error in response. Try again later");
        return;
      }

      const data = await response.json();
      setText(data.value);
    } catch (error) {
      console.error(error);
      setText("Error in connection. Try again later");
    }
  };
  return (
    <div className="joke">
      <span>&#128512; &#128512; &#128512;</span>
      <div>{text}</div>
      <button onClick={() => getJoke(url)}>Next Joke</button>
    </div>
  );
};

export default Joke;
