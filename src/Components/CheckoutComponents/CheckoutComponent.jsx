import React from "react";
import CartItem from "./CartItem";
import './CheckoutComponent.css';

class CheckoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: this.props.cartItems,

      paymentSummary: {
        items: this.props.cartItems
          .map((item) => item.price * item.amount)
          .reduce((acc, val) => acc + val, 0),
        shippingAndHandling: 0,
      }
    }
  }

  render() {
    const {items, shippingAndHandling} = this.props;
    const totalBeforeTax = items + shippingAndHandling;
    const taxAmount = items * 0.08875;
    const total = totalBeforeTax + taxAmount;

    const summaryLines = [
      {id: 1, label: 'Items:', amount: items.toFixed(2)},
      {id: 2, label: 'Shipping & Handling:', amount: shippingAndHandling.toFixed(2)},
      {id: 3, label: 'Total before tax:', amount: totalBeforeTax.toFixed(2)},
      {id: 4, label: 'Tax amount:', amount: taxAmount.toFixed(2)}
    ]

    return (
      <div className="container checkoutComponent">
        <div className="cartItemsSection">
        <div className="cartItemsComponent">
          {this.props.cartItems.length ? this.props.cartItems.map((item) => (
            <CartItem
            name={item.name}
            price={item.price}
            amount={item.amount}
            categories={item.categories}
            imageUrl={item.imageUrl}
            itemID={item.itemID}
            key={item.name}
            handleRemoveItemFromCart={this.props.handleRemoveItemFromCart}
            handleAddOneFromCart={this.props.handleAddOneFromCart}
            handleSubtractOneFromCart={this.props.handleSubtractOneFromCart}
            />
          )): <div>NO ITEMS IN CART</div>}
        </div>
        </div>
        <div className="summaryComponent">
          <div className="orderSummary">
            <div className="summaryHeader">Price Summary</div>
            {summaryLines.map((line) => (
              <div className="summaryLine" key={line.id}>
                <div className="summaryLineHeader">{line.label}</div>
                <div className="summaryLineAmount">${line.amount}</div>
              </div>
            ))}
          </div>
          <div className="orderTotal">
            <div className="orderTotalHeader">Order Total:</div>
            <div className="orderTotalAmount">${total.toFixed(2)}</div>
          </div>
          <button className="placeOrderButton" disabled={this.state.cartItems.length ? false : true}>Place your order</button>
        </div>
      </div>
    )
  }
}

export default CheckoutComponent;