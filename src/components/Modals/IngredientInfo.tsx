import React from 'react';


import ModalWrapper from './ModalWrapper';



const IngredientInfo = React.memo((props: {
  shouldShow: boolean
}) => {

  return (
    <ModalWrapper shouldShow={props.shouldShow}>
      Привет, я модальник ингредиента!
    </ModalWrapper>
  )

});

export default IngredientInfo;