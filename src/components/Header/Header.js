import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Input from '../input/Input';
import Select from '../input/Select';
import { horecaApi, useGetLocationQuery } from '../../services';
import { selectDeliveryTime } from '../../slices/deliveryTimeSlice';
import { changeLocation ,selectCity} from '../../slices/locationSlice';
import { searchValues } from '../../slices/searchSlice';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const selectedLocation = useSelector(selectCity);
  const { data } = useGetLocationQuery();

  const { etaRanges } = horecaApi.endpoints.getHoreca.useQueryState(selectedLocation, {
    selectFromResult: ({data }) => {
      if (data && data.data){
        const result = new Set();
        const dataArr = Object.values(data.data.storesMap)
        dataArr.forEach(item => result.add(item.etaRange.text))
        return { etaRanges:[...result.values()] }
      }
      return {etaRanges: []}
    }
  })

  const dispatch = useDispatch();

  const locationsMap = data?.data?.locationsMap || null
  const locationMapArr = locationsMap ? Object.values(locationsMap) : [];

  const cityChangeHandler = (e) => {
    const value = e.target.value
    dispatch(changeLocation(value))
  }

  const searchHandler = (e) => {
    dispatch(searchValues(e.target.value))
  }

  const destination = locationMapArr.map(option => (
    <option key={option.id} value={option.id}>{option.title}</option>
  ));

  const deliveryTimeHandler = (e) => {
      dispatch(selectDeliveryTime(e.target.value))
  }

  const deliveryTimeOpt = etaRanges.length? etaRanges.map((range) => {
    return (
    <option key={range} value={range}>{range}</option>
  )}) :[];

  const {cartTotalQuantity} = useSelector((state) => state.cart);

  return (
    <header className="header">
      <div className="content">
        <div className="header__inner">
          <Link to="/uber-eats">
            <img src="./uber-eats/images/logo.svg" alt="Uber Eats" className="header__logo" />
          </Link>

          <div className="header__delivery-info">
            <div className="header__locations-info">
                <Select 
                iconUrl="./uber-eats/images/locationImg.svg"
                onChange={cityChangeHandler}
                passedData={destination}
                placeholder="Select city"
                label="Where"
                value=""
              />
            </div>
      
              <Select 
                iconUrl="./uber-eats/images/time.png"
                onChange={deliveryTimeHandler}
                passedData={deliveryTimeOpt}
                placeholder="Any time"
                label="Delivery time"
                value="0"
              />
          </div>

    <div className="header-bottom__mob-block">
      <label className="control">
        <div className="header__search">
          <Input
            name="search"
            label="Find"
            onChange={searchHandler}
            placeholder="Search"
            iconUrl="./uber-eats/images/search.svg"
          />
        </div>
      </label>
          <Link to="/cart">
            <div className="header__link">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-handbag" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
              </svg>
              <span className="bag-quantity">
                  <span>{cartTotalQuantity}</span>
              </span>
            </div>
          </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
