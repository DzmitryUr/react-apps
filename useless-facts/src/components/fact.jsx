import { useEffect, useState } from "react";

const Fact = ({ url }) => {
  const [text, setText] = useState("Loading...");

  useEffect(() => {
    fetch(url)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          setText("Error in Response");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setText(data.text);
      })
      .catch((error) => {
        console.error(error);
        setText("Error with fetching data. Try again later");
      });
  }, []);

  return <div>{text}</div>;
};

export default Fact;
