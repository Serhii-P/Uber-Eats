import { useState } from 'react';
import './Input.scss';

const Select = ({iconUrl, value, placeholder, label, onChange, passedData}) => {
    const [focused, setFocused] = useState(false);
    const inputWrapperClass = focused ? 'control__input-wrapper--focused' : '';

    return (
      <label className="control">
        {label && (
          <p className="control__label">{label}</p>
        )}
          <div className={`control__input-wrapper ${inputWrapperClass}`}>
          {!!iconUrl && (
            <img
              src={iconUrl}
              alt={placeholder}
              className="control__icon"
            />
          )}

          <select className='select__control' 
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)} >
              <option value={value}>{placeholder}</option>
              {passedData}
          </select>
        </div>
    </label>
    )
}

export default Select;