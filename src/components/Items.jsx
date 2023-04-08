import React from 'react';

function Items({ items }) {
  const itemList = items;
  //обязательно ли записывать items в переменную?
  return (
    <div className="container">
      {itemList.map((item) => (
        <div className="card" key={item.id}>
          <div className="content">
            <img src={item.image} alt="" className="game__img" />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <p>Purchase</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
