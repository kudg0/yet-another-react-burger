import React from 'react';



const LazyLoadPicture = (props: {imageMobile: (string | null), imageLarge: (string | null), image: string, alt: string, width: number, height: number}) => {
  const [inView, setInView] = React.useState<boolean>(false);
  
  const imageRef = React.useRef<HTMLDivElement>(null);


  React.useEffect( () => {
    const observerImage = imageRef.current!;

    if(!window['IntersectionObserver']){
      return setInView(true);
    }

    initLazyLoad(observerImage);
  }, [])


  const initLazyLoad = (observerImage: HTMLElement) => {
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
    const observer = new IntersectionObserver(callback, {threshold: .001});


    observer.observe(observerImage);
  }



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