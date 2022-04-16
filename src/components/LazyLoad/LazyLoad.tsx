import React, {useState, useEffect} from 'react';



const LazyLoadPicture = (props: {imageMobile: (string | null), imageLarge: (string | null), image: string, alt: string, width: number, height: number}) => {
  const [inView, setInView] = React.useState<boolean>(false);
  
  const imageRef = React.useRef<HTMLDivElement>(null);


  React.useEffect( () => {
    if(!imageRef.current || !window['IntersectionObserver']){
      return setInView(true);
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: .001
    }
    const callback = (entries: any, observer: any) => {
      entries.forEach((observerItem: { isIntersecting: boolean, target: HTMLElement }) => {
        if(
          observerItem.isIntersecting && 
          !observerItem.target.classList.contains("lazyInit"))
        {
          observerItem.target.classList.add("lazyInit");

          setInView(true);
        }
      })
    };
    const observer = new IntersectionObserver(callback, options);

    observer.observe(imageRef.current);
  }, [])



  return (
    <picture 
      ref={imageRef}
      style={{ 
        width: props.width + 'px', 
        height: props.height + 'px' 
      }}
    >
      {
        inView && 
        <>
          <source 
            srcSet={props.imageMobile ? props.imageMobile : props.image} 
            media="(max-width: 768px)"
           />
          <source 
            srcSet={props.imageLarge ? props.imageLarge : props.image} 
            media="(min-width: 1440px)" 
          />
          <source 
            srcSet={props.image}
          />
          <img
            srcSet={props.image}
            alt={props.alt} 
          />
        </>
      }
    </picture>
  )
}

export default LazyLoadPicture;