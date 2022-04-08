import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slices/modalSlice';
import './ModalWindow.scss';

const ModalWindow = ({children}) => {

  const dispatch = useDispatch();

  const closeModalWindow = () => {
      dispatch(openModal(false))
  }

  return ReactDOM.createPortal (
   <div className="modal-window">
      <div className="modal-window__inner-container">
        <button
          type="button"
              className="modal-window__close-btn"
              onClick={closeModalWindow}
        >
          <img
            src="./images/close-btn.svg"
            alt="close button"
            className="modal-window__close-btn-img"
          />
        </button>
        {children}
      </div>
    </div>,
  document.getElementById('portal')
  )
}

export default ModalWindow;
