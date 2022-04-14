import React from 'react';



class LazyLoadPicture extends React.Component
  <{ 
    imageMobile: (string | null), imageLarge: (string | null), image: string, alt: string, width: number, height: number }, 
    { inView: boolean }
  >{
    private imageRef: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
      super(props);
    
      this.state = {
        inView: false
      };

      this.imageRef = React.createRef();

      this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
      if(!this.imageRef.current || !window['IntersectionObserver']){
        return;
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

            this.setState({
              inView: true
            });
          }
        })
      };
      const observer = new IntersectionObserver(callback, options);


      observer.observe(this.imageRef.current);
    }

    render() {
      return (
        <picture 
          ref={this.imageRef}
          style={{ 
            width: this.props.width + 'px', 
            height: this.props.height + 'px' 
          }}
        >
          {
            this.state.inView && 
            <>
              <source 
                srcSet={this.props.imageMobile ? this.props.imageMobile : this.props.image} 
                media="(max-width: 768px)"
               />
              <source 
                srcSet={this.props.imageLarge ? this.props.imageLarge : this.props.image} 
                media="(min-width: 1440px)" 
              />
              <source 
                srcSet={this.props.image}
              />
              <img
                srcSet={this.props.image}
                alt={this.props.alt} 
              />
            </>
          }
        </picture>
      )
    }
}

export default LazyLoadPicture;