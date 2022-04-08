import React from 'react';
import { useSelector } from 'react-redux';
import { useGetHorecaQuery, } from '../../services';
import Loader from '../Loader/Loader';
import { selectCity } from '../../slices/locationSlice';
import RestaurantsCard from '../RestourantsCard/RestaurantCard';
import './RestaurantsListPage.scss';

const RestaurantsListPage = () => {
  
  const selectedLocation = useSelector(selectCity);
  const { data, error, isLoading, isSuccess, isError } = useGetHorecaQuery(selectedLocation);
  const selectedDeliveryTime = useSelector(state => state.deliveryTime.time);
  const searchParams = useSelector(state => state.search.value);

  const restaurantsListData = data ? Object.values(data?.data?.storesMap) : [];

  const filteredData = restaurantsListData.filter(card => {
    if (selectedDeliveryTime != 0) {
      return card.etaRange.text === selectedDeliveryTime;
    } 
    if (searchParams.length > 0 ) {
      return card.title.toLowerCase().includes(searchParams.toLowerCase())     
    }
    return card
  });

     const horecaCards =  filteredData.map(card => ( 
      <RestaurantsCard
        key={card.uuid}
        uuid={card.uuid}
        imageUrl={card.heroImageUrl}
        title={card.title}
        categories={card.categories}
        etaRange={card.etaRange.text}
      />
  ))
   
  return (
    <div className="restaurants-list">
      {isLoading && <Loader />}
      {isError && error.message}
      {isSuccess && data && horecaCards}
    </div>
  )
}

export default RestaurantsListPage;
