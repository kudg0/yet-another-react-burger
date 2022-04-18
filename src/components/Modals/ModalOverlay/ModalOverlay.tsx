import React from 'react';


import Styles from './modalOverlay.module.scss';



const ModalOverlay = React.memo((props: {
  closeModalCallback: () => void,
  children: React.ReactNode
}) => {
  const modalOverlayRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    modalOverlayRef.current!.focus();
  }, []);


  const handleKeyPress = (e: React.KeyboardEvent) => {
    let nameOfKey = e.key;

    nameOfKey === "Escape" ? props.closeModalCallback() : false;
  }
  


  return (
    <div className={Styles.modalOverlay} onKeyDown={handleKeyPress} tabIndex={0} ref={modalOverlayRef}>
      {props.children} 
      <div className={Styles.modalOverlay__background} onClick={props.closeModalCallback}/>
    </div>
  )
})


export default ModalOverlay;