import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSquare, faCircle, faRectangleTimes, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import React from "react";
import './Homepage.css';
import MainMenuSearch from "./MainMenuSearch";
import ItemsDisplayGrid from "./ItemsDisplayGrid";
import { testAccountPictureUrl } from "./profilePictures";
import SignInSignUpComponent from "../LoginComponents/SignInSignUpComponent";
import CheckoutComponent from "../CheckoutComponents/CheckoutComponent";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',

      cartItems: [],
      showMiniCart: false,

      showLogin: false,
      loggedInAs: localStorage.getItem('loggedInEmail'),

      showMainCart: false,
      showAccountOptions: false,
    }
  }

  handleShowLogin = () => {
    this.setState({ showLogin: true });
  }

  handleRemoveShowLogin = (e) => {
    if (e.target.classList.value === 'pageCover') {
      this.setState({ showLogin: false });
    }
  }

  handleShowAccountOptions = () => {
    this.setState({ showAccountOptions: true });
  }

  handleRemoveShowAccountOptions = () => {
    this.setState({ showAccountOptions: false });
  }

  handleShowMainCart = () => {
    this.setState({ showMainCart: true });
  }

  handleRemoveShowMainCart = (e) => {
    if (e.target.classList.value === 'pageCover') {
      this.setState({ showMainCart: false });
    }
  }

  handleRemoveItemFromCart = (e) => {
    let newCart = this.state.cartItems.filter((item) => item.itemID !== e.target.getAttribute('itemID'));
    this.setState({cartItems: newCart})
  }

  handleSubtractOneFromCart = (e) => {
    if (this.state.cartItems.find((item) => item.itemID === e.target.getAttribute('itemID')).amount === 1) {
      this.handleRemoveItemFromCart(e);
    } else {
      let previousItemAmount = this.state.cartItems.find((item) => item.itemID === e.target.getAttribute('itemID')).amount
      let updatedCart = this.state.cartItems.map((item) => item.itemID === e.target.getAttribute('itemID') ? {...item, amount: (previousItemAmount - 1)} : item);
      this.setState({cartItems: updatedCart});
    }
  }

  handleAddOneFromCart = (e) => {
    let previousItemAmount = this.state.cartItems.find((item) => item.itemID === e.target.getAttribute('itemID')).amount;
    let updatedCart = this.state.cartItems.map((item) => item.itemID === e.target.getAttribute('itemID') ? {...item, amount: (previousItemAmount + 1)} : item);
    this.setState({cartItems: updatedCart});
  }

  handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('loggedInEmail', '');
    window.location.reload(false);
  }

  handleSearchInput = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  handleUpdateCartItem = (id, newValue) => {
    const previousItemAmount = this.state.cartItems.find((item) => item.itemID === id).amount;
    const updatedArray = this.state.cartItems.map((item) => item.itemID === id ? {...item, amount: (previousItemAmount + newValue)} : item);
    this.setState({cartItems: updatedArray});
  }

  handleAddItemToCart = (newItem) => {
    if (this.state.cartItems.find((item) => item.itemID === newItem.itemID)) {
      this.handleUpdateCartItem(newItem.itemID, newItem.amount);
    } else {
      this.setState((prevState) => ({
        cartItems: [...prevState.cartItems, newItem],
      }))
    }
  }

  handleShowMiniCart = () => {
    this.setState({ showMiniCart: true })
  }

  handleRemoveMiniCart = () => {
    this.setState({ showMiniCart: false })
  }

  render() {
    const {cartItems, showMiniCart, loggedInAs, showLogin, searchInput, showAccountOptions, showMainCart} = this.state;

    const shoppingCartCounter = [
      {icon: faCircle, className: 'shapeOne', willAppear: cartItems.length >= 3 ? true : false},
      {icon: faRectangleTimes, className: 'shapeTwo', willAppear: cartItems.length >= 5 ? true : false},
      {icon: faSquare, className: 'shapeThree', willAppear: cartItems.length >= 10 ? true : false}
    ]

    let items = this.state.cartItems.map((item) => item.amount * item.price).reduce((a, b) => a + b, 0);
    let shippingAndHandling = 0;

    return (
      <div className="homePage">
        {showLogin &&
        <div className="pageCover" onClick={this.handleRemoveShowLogin}>
          <SignInSignUpComponent />
        </div>
        }
        {showMainCart &&
        <div className="pageCover" onClick={this.handleRemoveShowMainCart}>
          <CheckoutComponent
          cartItems={this.state.cartItems}
          items={items}
          handleRemoveItemFromCart={this.handleRemoveItemFromCart}
          shippingAndHandling={shippingAndHandling}
          handleAddOneFromCart={this.handleAddOneFromCart}
          handleSubtractOneFromCart={this.handleSubtractOneFromCart}
          />
        </div>
        }
        <div className="mainNavbar">
          <div className="container">
            <div className="pusher">SHOPPER</div>
            <div className="mainMenu">
              {loggedInAs.length > 0 &&
              <img src={testAccountPictureUrl} alt="test" onMouseEnter={this.handleShowAccountOptions} onMouseLeave={this.handleRemoveShowAccountOptions}/>
              }
              {showAccountOptions &&
              <div className="showAccountOptions" onMouseEnter={this.handleShowAccountOptions} onMouseLeave={this.handleRemoveShowAccountOptions}>
                <img src={testAccountPictureUrl} alt="test" />
                <button className="logoutButton" onClick={this.handleLogout}>LOGOUT</button>
              </div>
              }
              {loggedInAs.length === 0 &&
              <div className="" onClick={this.handleShowLogin}>LOGIN</div>
              }
              <div className="shoppingCartIcon">
                <FontAwesomeIcon icon={faCartShopping} onClick={this.handleShowMainCart} onMouseEnter={this.handleShowMiniCart} onMouseLeave={this.handleRemoveMiniCart}/>
                {shoppingCartCounter.map((item) => item.willAppear 
                ? (<FontAwesomeIcon icon={item.icon} key={item.className} className={item.className}/>) 
                : null)}
                {showMiniCart && 
                <div className="miniCart" onMouseEnter={this.handleShowMiniCart} onMouseLeave={this.handleRemoveMiniCart}>
                  {cartItems.length ? cartItems.map((item) => (
                    <div className="miniCartItem" key={item.itemID}>
                      <FontAwesomeIcon icon={faCircleXmark} itemID={item.itemID} onClick={this.handleRemoveItemFromCart} />
                      <img src={item.imageUrl} alt={item.name} />
                      <div className="miniCartItemInfo">
                        <div className="miniCartItemName">{item.name}</div>
                        <div className="miniCartItemPrice">
                          <div className="miniCartItemQuantity">QTY: {item.amount}</div>
                          <div className="miniCartItemTotalPrice">${(item.amount * item.price).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  )) : <div className="miniCartNoItems">No items in cart</div>}
                </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="itemsNavbar container">
          <MainMenuSearch handleSearchInput={this.handleSearchInput}/>
        </div>

        <div className="itemsDisplayGridContainer">
          <ItemsDisplayGrid 
          searchInput={searchInput}
          handleAddItemToCart={this.handleAddItemToCart}
          cartItems={this.state.cartItems}
          />
        </div>
      </div>
    )
  }
}

export default Homepage;