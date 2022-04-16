import React from 'react';
import ReactDOM from 'react-dom';


const modalRoot = document.getElementById("root__modal")!;

const OfferInfo = () => {
  return ReactDOM.createPortal(
    <>
      привет!
    </>,
    modalRoot
  )

}


export default OfferInfo;