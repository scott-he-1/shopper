import React from "react";
import './DisplayGridItem.css'

const DisplayGridItem = ({name, price, categories, imageUrl, handleDisplayItem, id, handleAddItemToCart, handleShowQuantityError}) => (
  <div className="displayItem" categories={categories} itemID={id}>
    <img src={imageUrl} alt={name} itemID={id} onClick={handleDisplayItem} className="itemImage"/>
    <div className="itemInfo" onClick={handleDisplayItem} itemID={id}>
      <div className="itemName" itemID={id}>{name}</div>
      <div className="itemPrice" itemID={id}>${price.raw}</div>
    </div>
    <select name={name} itemID={id} className={`itemAmountSelector ${id}`} onChange={handleShowQuantityError}>
      {[...Array(10).keys()].map((item, index) => (<option value={index + 1} key={index}>{index + 1}</option>))}
    </select>
    <button className="addToCartButton" itemID={id} onClick={handleAddItemToCart}>ADD TO CART</button>
    <div className={`quantityError ${id}`}>Amount exceeds amount in stock</div>
  </div>
)

export default DisplayGridItem;