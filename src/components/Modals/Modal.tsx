import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import ModalOverlay from './ModalOverlay/ModalOverlay';

import Styles from './modal.module.scss';



const modalRoot : HTMLElement = document.getElementById("root__modal")!;


const Modal = React.memo((props: {
  children: React.ReactNode, 
  closeModalCallback?: () => void
}) => {

  const navigate = useNavigate();
  const modalRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    if(!modalRef.current) return;

    modalRef.current!.focus();
  });


  const closeModal = React.useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleKeyPress : (e: React.KeyboardEvent) => void = React.useCallback((e) => {
    let nameOfKey = e.key;

    nameOfKey === "Escape" ? 
      props['closeModalCallback'] ? props.closeModalCallback() : closeModal() : false;
  }, [props, closeModal]);


  
  return ReactDOM.createPortal(
    <div className={Styles.modalContainer} onKeyDown={handleKeyPress} tabIndex={-1} ref={modalRef}>
      <div className={Styles.modalContainer__block}>
        {props.children}

        <div className={Styles.modalContainer__close} onClick={props.closeModalCallback || closeModal}>
          <CloseIcon type="primary" />
        </div>
      </div>
      
      <ModalOverlay closeModalCallback={props.closeModalCallback || closeModal} />
    </div>,
    modalRoot
  )
});

export default Modal;