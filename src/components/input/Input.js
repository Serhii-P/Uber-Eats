import { useState } from 'react';
import './Input.scss';

const Input = ({iconUrl, name, placeholder, label, onChange}) => {
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

        <input
          name={name}
          className="control__input"
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </label>
  );
}

export default Input;
