import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.scss';

 const RestaurantsCard = (props) => {
  const { imageUrl, title, categories, uuid, etaRange } = props;

  return (
    <>
      <Link className="restaurant-card" to={`/${uuid}`} >
        <img src={imageUrl} alt={title} className="restaurant-card__img" />
        <h2 className="restaurant-card__title">{title}</h2>
        <div className="restaurant-card__categories">
          {categories.join(' • ')}
        </div>
        <div className="restaurant-card__eta">
          {etaRange}
        </div>
      </Link>
    </>
  );
};

export default RestaurantsCard;