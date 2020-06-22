import React from "react";

function Square({ value, handleClick }) {
  return (
    <button onClick={handleClick} className="square">
      {value}
    </button>
  );
}

export default Square;
