import React from "react";
import './CartItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({name, price, amount, categories, imageUrl, itemID, handleAddOneFromCart, handleSubtractOneFromCart, handleRemoveItemFromCart}) => (
  <div className="cartItem">
    <FontAwesomeIcon icon={faCircleXmark} itemID={itemID} onClick={handleRemoveItemFromCart}/>
    <img src={imageUrl} alt="item"/>
    <div className="cartItemInfo">
      <div className="cartItemCategory">{categories.toUpperCase()}</div>
      <div className="cartItemName">{name}</div>
      <div className="cartItemPrice">${price}</div>
      <div className="cartItemAmount">QTY: <span><FontAwesomeIcon icon={faMinus} itemID={itemID} onClick={handleSubtractOneFromCart}/></span><span className="cartItemAmountNumber">{amount}</span><span><FontAwesomeIcon icon={faPlus} itemID={itemID} onClick={handleAddOneFromCart} /></span></div>
    </div>
  </div>
)

export default CartItem;