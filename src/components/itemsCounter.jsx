import React, { useState } from 'react';

const Counter = ({ count }) => {
  const [itemCount, setItemCount] = useState(count);

  function handleCountIncrease() {
    setItemCount((prevState) => prevState + 1);
  }

  function handleCountDecrease() {
    setItemCount((prevState) => prevState - 1);
  }

  return (
    <>
      <div>
        <button onClick={handleCountIncrease}>+</button>
        <h2>{itemCount}</h2>
        <button onClick={handleCountDecrease}> -</button>
      </div>
    </>
  );
};

export default Counter;
