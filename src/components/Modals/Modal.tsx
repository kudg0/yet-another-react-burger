import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';

// YA imports
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// Components
import ModalOverlay from './ModalOverlay/ModalOverlay';

import { ILocationType } from './../../services/types'

// Styles
import Styles from './modal.module.scss';


const modalRoot: HTMLElement = document.getElementById("root__modal")!;

interface IModalComponent {
  closeModalCallback?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalComponent> = ({
  children,
  closeModalCallback,
}) => {

  const location = useLocation() as ILocationType;
  const navigate = useNavigate();

  const modalRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    if(!modalRef.current) return;

    modalRef.current!.focus();
  });


  const closeModal = React.useCallback(() => {
    navigate(location.state.from || '/');
  }, [navigate]);

  const handleKeyPress : (e: React.KeyboardEvent) => void = React.useCallback((e) => {
    let nameOfKey = e.key;

    nameOfKey === "Escape" ? 
      closeModalCallback ? closeModalCallback() : closeModal() : false;
  }, [closeModalCallback, closeModal]);

  
  return ReactDOM.createPortal(
    <div className={Styles.modalContainer} onKeyDown={handleKeyPress} tabIndex={-1} ref={modalRef}>
      <div className={Styles.modalContainer__block}>
        {children}

        <div className={Styles.modalContainer__close} onClick={closeModalCallback || closeModal}>
          <CloseIcon type="primary" />
        </div>
      </div>
      
      <ModalOverlay closeModalCallback={closeModalCallback || closeModal} />
    </div>,
    modalRoot
  )
};

export default React.memo(Modal);