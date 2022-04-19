import React from 'react';
import ReactDOM from 'react-dom';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';


import ModalOverlay from './ModalOverlay/ModalOverlay';

import Styles from './modal.module.scss';



const modalRoot : HTMLElement = document.getElementById("root__modal")!;


const Modal = React.memo((props: {
  shouldShow: boolean,
  children: React.ReactNode, 
  closeModalCallback: () => void
}) => {

  const modalRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    if(!modalRef.current) return;

    modalRef.current!.focus();
  });


  const handleKeyPress = (e: React.KeyboardEvent) => {
    let nameOfKey = e.key;

    nameOfKey === "Escape" ? props.closeModalCallback() : false;
  }


  
  return ReactDOM.createPortal(
    props.shouldShow ? 
    <div className={Styles.modalContainer} onKeyDown={handleKeyPress} tabIndex={-1} ref={modalRef}>
      <div className={Styles.modalContainer__block}>
        {props.children}

        <div className={Styles.modalContainer__close} onClick={props.closeModalCallback}>
          <CloseIcon type="primary" />
        </div>
      </div>
      
      <ModalOverlay closeModalCallback={props.closeModalCallback} />
    </div> : <> </>,
    modalRoot
  )
});

export default Modal;