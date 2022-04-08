import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal, productDetails } from '../../slices/modalSlice';
import './ItemCard.scss';

export const ItemCard = (props) => {
  const {
    title,
    description,
    price,
    imgUrl,
    uuid,
  } = props;

  const dispatch = useDispatch();

  const truncate = input => (
    input.length > 5 ? `${input.substring(0, 35)}...` : input
  );

  const openMenuItemModalWindow = (id) => {
    dispatch(productDetails(id));
    dispatch(openModal(true));
  }

  return (
    <button
      className="item-card"
       onClick={() => openMenuItemModalWindow(uuid)}
      type="button" >
      <div className="item-card__left-section">
        <h3 className="item-card__title">{title}</h3>
        <p className="item-card__description">
          {description && truncate(description)}
        </p>
        <span className="item-card__price">
          {`£ ${price}`}
        </span>
      </div>
        <div className="item-card__img-container">
          {
          imgUrl ? (
            <img
              src={imgUrl}
              alt={title}
              className="item-card__img" />
              )
              : (
                <img src="./images/no-image.png" className="item-card__img" alt={title} />
              )
            }
          </div>
    </button>
  );
};