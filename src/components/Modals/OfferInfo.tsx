import React from 'react';


import ModalWrapper from './ModalWrapper';



const OfferInfo = React.memo((props: {
  shouldShow: boolean
}) => {
 
  return (
    <ModalWrapper shouldShow={props.shouldShow}>
      Привет, я модальник оформления заказа!
    </ModalWrapper>
  )
});

export default OfferInfo;