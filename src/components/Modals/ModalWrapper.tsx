import React from 'react';
import ReactDOM from 'react-dom';



const modalRoot : HTMLElement = document.getElementById("root__modal")!;


const ModalWrapper = React.memo((props: {
  children: React.ReactNode, 
  shouldShow: boolean
}) => {
  const [isShow, setIsShow] = React.useState<boolean>(false)

  React.useEffect( () => {
    setIsShow(props.shouldShow);
  }, [props.shouldShow])



  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    setIsShow(false);
  }


  return ReactDOM.createPortal(
    isShow ? 
    <div className="modalContainer" onClick={closeModal}>
      {props.children}
    </div> : <> </>,
    modalRoot
  )
});

export default ModalWrapper;