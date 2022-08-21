import React from 'react';

// Styles
import Styles from './modalOverlay.module.scss';


interface IModalOverlayComponent {
  closeModalCallback: () => void
}

const ModalOverlay: React.FC<IModalOverlayComponent> = ({
  closeModalCallback,
}) => {

  return (
    <div className={Styles.modalOverlay} onClick={closeModalCallback} />
  )
};

export default React.memo(ModalOverlay);