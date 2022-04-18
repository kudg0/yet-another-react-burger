import React from 'react';
import ReactDOM from 'react-dom';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';


import ModalOverlay from './ModalOverlay/ModalOverlay';

import Styles from './modal.module.scss';



const modalRoot : HTMLElement = document.getElementById("root__modal")!;


const Modal = React.memo((props: {
  children: React.ReactNode, 
  shouldShow: boolean,
  closeModalCallback: () => void
}) => {

  


  return ReactDOM.createPortal(
    props.shouldShow ? 
    <ModalOverlay closeModalCallback={props.closeModalCallback}>
      <div className={Styles.modalContainer}>
        {props.children}

        <div className={Styles.modalContainer__close} onClick={props.closeModalCallback}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </ModalOverlay> : <> </>,
    modalRoot
  )
});

export default Modal;