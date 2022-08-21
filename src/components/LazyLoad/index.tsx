import React from 'react';

import { useInView } from 'react-intersection-observer';


interface LazyLoadPictureProps {
  imageMobile?: string, 
  imageLarge?: string, 
  image: string, 
  width: number, 
  height: number,
  alt: string, 
}

const LazyLoadPicture: React.FC<LazyLoadPictureProps> = ({
  alt,
  width,
  height,
  image,
  imageLarge,
  imageMobile,
}) => {

  const { ref, inView, entry } = useInView({
    threshold: 0.001,
  });


  return (
    <picture 
      ref={ref}
      style={{ 
        width: width + 'px', 
        height: height + 'px' 
      }}
    >
      {
        inView && 
        <>
          {
            imageLarge && 
            <source 
              srcSet={image} 
              media="(min-width: 1440px)" 
            />
          }
          { 
            imageMobile && 
            <source 
              srcSet={image} 
              media="(max-width: 768px)"
            />
          }
          <source 
            srcSet={image}
          />
          <img
            srcSet={image}
            width={width}
            height={height}
            alt={alt}
          />
        </>
      }
    </picture>
  )
};

export default React.memo(LazyLoadPicture);