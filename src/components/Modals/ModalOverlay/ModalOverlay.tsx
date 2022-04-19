import React from 'react';


import Styles from './modalOverlay.module.scss';



const ModalOverlay = React.memo((props: {
  closeModalCallback: () => void
}) => {

  return (
    <div className={Styles.modalOverlay} onClick={props.closeModalCallback} />
  )
})


export default ModalOverlay;