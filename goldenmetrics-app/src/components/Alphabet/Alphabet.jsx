import React from "react";

import "./Alphabet.css";

const Alphabet = props => {
  for (var i = 97, a = ""; i < 123; ) a += String.fromCharCode(i++);
  const alphabetLetters = a.toUpperCase().split("");

  return (
    <div className="alphabet">
      {alphabetLetters.map(letter => (
        <button
          key={letter}
          value={letter}
          onClick={props.onClickHandler}
          className="alphabet-letter"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Alphabet;
