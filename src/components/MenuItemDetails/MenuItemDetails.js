import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../../services';
import { addToCart } from '../../slices/cartSlice';
import { openModal } from '../../slices/modalSlice';
import Loader from '../Loader/Loader';
import ModalWindow from '../ModalWindow/ModalWindow';
import './MenuItemDetails.scss';

const MenuItemDetails = () => {
  const [cartQuantity, setCartQuantity] = useState(1);
  const [activeId, setActiveId] = useState();
  const [extraprice, setExtraprice] = useState(0);

  const history = useNavigate();

  const dispatch = useDispatch();
  const id = useSelector((state) => state.modal.idValue);

  const {data, error, isLoading, isError} = useGetProductDetailsQuery(id);

  if(isLoading){
    return <Loader />
  }

  if(isError){
    return (<p>{JSON.stringify(error)}</p>)
  }

  const {imageUrl, itemDescription, customizationsList, price, title} = data.data;

  const addOrderToCart = (data) => {
    history('cart');
    dispatch(openModal(false));
    dispatch(addToCart({...data, cartQuantity, extraprice}));
  }

  const decrementHandler = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
    return cartQuantity;
  }

  const incrementHandler = () => {
      setCartQuantity(cartQuantity + 1);
  }

  const handleOption = (data) => {
  const price = data.option.price;
  const optionId = data.option.uuid;

  if (price !== 0 || '') {
    setExtraprice(price)
  }

  if (optionId !== activeId ) {
    setActiveId(optionId);
    setExtraprice(price);
  } else {
    setActiveId(null);
    setExtraprice(0);
  }
}

  return (
  <ModalWindow >      
    <div className="menu-item-details">
      <div className="menu-item-details__img-container">
        { imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="menu-item-details__main-img"
          />
          ) : (
          <img 
            src="./uber-eats/images/no-image.png" alt={title} 
            className="menu-item-details__main-noimg"/>
          )
        }
      </div>
      <div className="menu-item-details__main-information">
        <div className="menu-item-details__header">
          <h1 className="menu-item-details__title">{title}</h1>
          <p className="menu-item-details__description">
            {itemDescription}
          </p>
        </div>
       { customizationsList.map(customItem => (
          <div
            className="menu-item-details__order-details"
            key={customItem.uuid}
          >
            <div className="menu-item-details__details-header">
              <h2 className="menu-item-details__order-title">
                {customItem.title}
              </h2>
              <p className="menu-item-details__order-restrictions">
                {`Choose up to ${customItem.maxPermitted}`}
              </p>
            </div>
            {
              customItem.options.map((option) => (
                <div className="menu-item-details__option"
                  key={option.uuid} >
                  <div className="menu-item-details__option-inner-container" >
                    <button
                      type="button"
                      className="menu-item-details__add-ingridient-btn"
                      id={option.uuid}
                      onClick={() => handleOption({customItem, option})}
                    >
                      <div 
                      className={`icon-img ${activeId === option.uuid ? "active" : ""}`}>
                      </div>
                    </button>
                    <p className="menu-item-details__option-title">
                      {option.title}
                    </p>
                  </div>
                  {
                    option.price !== 0 && (
                      <p
                        className="menu-item-details__option-price"
                      >
                        {`+ ${option.price} £`}
                      </p>
                    )
                  }
                </div>
              ))
            } 
          </div>
          ))
        } 
        <div className="menu-item-details__footer">
          <div className="menu-item-details__order-regulations">
            <p className="menu-item-details__order-amount">
              Amount:
            </p>
            <div className="menu-item-details__order-regulations-inner-wrapper">
              <button
                type="button"
                className="menu-item-details__decrement-btn"
                onClick={decrementHandler} >
                <img
                  src="./uber-eats/images/btn-minus.svg"
                  alt="remove one item"
                  className="menu-item-details__decrement-btn-img"
                />
              </button>
              <span className="menu-item-details__number-of-orders">
                {cartQuantity}
              </span>
              <button
                type="button"
                className="menu-item-details__increment-btn"
                onClick={incrementHandler}
              >
                <img
                  src="./uber-eats/images/btn-plus.svg"
                  alt="add one item"
                  className="menu-item-details__increment-btn-img"
                />
              </button>
            </div>
          </div>
          <button
            className="menu-item-details__add-order"
            type="button"
            onClick={() => addOrderToCart(data.data)}
          >
            {`Add ${cartQuantity} to order`}
            <span className="menu-item-details__price">
              {`${price * cartQuantity + extraprice * cartQuantity} £`}
            </span>
          </button>
        </div>
      </div>
    </div>
      
    </ModalWindow>
  )
}

export default MenuItemDetails;