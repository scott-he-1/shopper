import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import DisplayGridItem from "./DisplayGridItem";
import './ItemsDisplayGrid.css';
import { DASHBOARD_URL, DASHBOARD_API } from "./constants"; 

class ItemDisplayGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryFilterTag: '',

      gridItems: [],
      categories: [],

      loading: false,
      requestError: false,

      addToCartNotification: {},
      itemOnDisplay: {},
    }
  }

  handleDisplayItem = (e) => {
    let item = this.state.gridItems.find((item) => item.id === e.target.getAttribute('itemID'));
    this.setState({itemOnDisplay: item});
  }

  handleDeleteDisplayItem = (e) => {
    if (e.target.classList.value === 'pageCover' || e.target.classList.value.includes('fa-x')) {
      this.setState({itemOnDisplay: {}});
    }
  }

  handleShowQuantityError = (e) => {
    let amountInCart = this.props.cartItems.find((item) => item.itemID === e.target.getAttribute('itemID')) ? this.props.cartItems.find((item) => item.itemID === e.target.getAttribute('itemID')).amount : 0;
    let selectedAmount = document.querySelector(`select[itemID=${e.target.getAttribute('itemID')}]`).value;
    let maxInDatabase = this.state.gridItems.find((item) => item.id === e.target.getAttribute('itemID')).amountInStock;
    if (amountInCart + Number(selectedAmount) > maxInDatabase) {
      document.querySelector(`div.quantityError.${e.target.getAttribute('itemID')}`).classList.add('active')
      document.querySelector(`button[itemID=${e.target.getAttribute('itemID')}]`).disabled = true;
      return true;
    } else {
      document.querySelector(`div.quantityError.${e.target.getAttribute('itemID')}`).classList.remove('active')
      document.querySelector(`button[itemID=${e.target.getAttribute('itemID')}]`).disabled = false;
      return false;
    }
  }

  handleSelectFilterTag = (e) => {
    let tags = document.querySelectorAll('.categoriesFilterTag')
    for (let tag of tags) {
      tag.classList.remove('active');
    }
    if (this.state.selectedCategoryFilterTag !== e.target.getAttribute('itemID')) {
      this.setState({selectedCategoryFilterTag: e.target.getAttribute('itemID')})
      e.target.classList.add('active')
    } else {
      this.setState({selectedCategoryFilterTag: ''})
    }
  }

  handleAddToCartNotification = (name, amount) => {
    this.setState({addToCartNotification: {name: name, amount: amount}})
  }

  handleRemoveAddToCartNotification = () => {
    this.setState({addToCartNotification: {}})
  }

  handleAddItemToCart = (e) => {
    let item = this.state.gridItems.find((item) => item.id === e.target.getAttribute('itemID'));
    let amount = document.querySelector(`.itemAmountSelector.${e.target.getAttribute('itemID')}`);
    let addToCartItem = {
      itemID: item.id,
      name: item.name,
      imageUrl: item.image,
      price: item.price.raw,
      categories: item.categories,
      amount: Number(amount.value)
    };
    if (!this.handleShowQuantityError(e)) {
      this.handleAddToCartNotification(item.name, amount.value);
      this.props.handleAddItemToCart(addToCartItem);
    }
  }

  async componentDidMount() {
    this.setState({loading: true})
    try {
      const response = await fetch(`${DASHBOARD_URL}`, {headers: {'X-Authorization': `${DASHBOARD_API}`}})
      if (response.ok) {
        const json = await response.json();
        const data = json.data
          .map((data) => ({
            name: data.name,
            price: data.price,
            categories: data.categories.map((item) => item.slug).join(' '),
            description: data.description.replace(/(<p>)?(<\/p>)?/g, ''),
            image: data.image.url,
            id: data.id,
            amountInStock: data.inventory.available
          }));
        this.setState({
          categories: [...new Set(json.data.map((item) => item.categories[0].slug))],
          gridItems: data,
          loading: false
        });
      } else {
        this.setState({
          loading: false,
          requestError: true
        });
      }
    } catch (error) {
      console.error('There was an error', error);
    }
  }

  render() {
    const {loading, requestError, gridItems, itemOnDisplay, categories, selectedCategoryFilterTag, addToCartNotification} = this.state;

    return (
      <div>
        {addToCartNotification.name && 
        <div className="addToCartNotification">
          <div className="notification"><span className="cartNotificationImportant">"{addToCartNotification.name}", {addToCartNotification.amount}</span> has been added to your cart.</div>
          <FontAwesomeIcon icon={faX} onClick={this.handleRemoveAddToCartNotification}/>
        </div>
        }
        {itemOnDisplay.id && 
          <div className="pageCover" onClick={this.handleDeleteDisplayItem}>
            <div className="onDisplayItem">
              <FontAwesomeIcon icon={faX} onClick={this.handleDeleteDisplayItem}/>
              <img src={itemOnDisplay.image} alt={itemOnDisplay.name} />
              <div className="onDisplayName">{itemOnDisplay.name}</div>
              <div className="onDisplayPrice">{itemOnDisplay.price.formatted_with_symbol}</div>
              <div className="onDisplayDescription">{itemOnDisplay.description}</div>
            </div>
          </div>
        }
        {categories.length > 0 &&
          <div className="categoriesFilter container">
            {categories.map((item) => (
              <div key={item} className="categoriesFilterTag" itemID={item} onClick={this.handleSelectFilterTag}>{item}</div>
            ))}
          </div>
        }
        <div className="itemsDisplayGrid container">
          {!loading ? gridItems.filter((item) => 
          item.name.match(new RegExp(this.props.searchInput, 'gi')) 
          && item.categories.includes(selectedCategoryFilterTag))
          .map((item) => (
            <DisplayGridItem 
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            categories={item.categories}
            description={item.description}
            imageUrl={item.image}
            handleDisplayItem={this.handleDisplayItem}
            handleAddItemToCart={this.handleAddItemToCart}
            handleShowQuantityError={this.handleShowQuantityError}
            />
          )) : (<div>Loading...</div>)}
          {requestError && (
            <div className="itemsLoadingError container">There was an error loading the products</div>
          )}
        </div>
      </div>
    )
  }
}

export default ItemDisplayGrid;