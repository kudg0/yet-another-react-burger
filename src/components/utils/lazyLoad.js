// Код для работы lazyload ресурсов

/*
  Для использования нужно вместо 'srcset' проставлять элементу 'data-src-set'
*/


export default function lazyload(container) {
  let lazyItems = container.querySelectorAll("[data-src-set]");



  var options = {
    root: null,
    rootMargin: '0px',
    threshold: .001
  }
  var callback = function(entries, observer) {
    entries.forEach((item) => {
      if(item.isIntersecting && !item.target.classList.contains("lazyInit")){
        item.target.classList.add("lazyInit");

        loadImage( item.target );
      }
    })
  };
  var observer = new IntersectionObserver(callback, options);


  lazyItems.forEach( lazyItem => {
    setInitSizes( lazyItem )


    if(window['IntersectionObserver']){

      observer.observe(lazyItem);

    } else {
      // Если браузер не поддерживаем IntersectionObserver API, то просто загружаем элементы

      loadImage( lazyItem );
    }
  });

  function setInitSizes( imageItem ){
    let lazyItem__width = imageItem.getAttribute('width'),
        lazyItem__height = imageItem.getAttribute('height');


    if(!lazyItem__width && !lazyItem__height){
      return;
    }

    imageItem.parentNode.style.width = lazyItem__width + 'px';
    imageItem.parentNode.style.height = lazyItem__height + 'px';
  }

  function loadImage( imageItem ){
    let neededSrc = imageItem.getAttribute("data-src-set");

    imageItem.addEventListener("load", () => {
      imageItem.parentNode.classList.add("lazyLoaded");

      imageItem.removeAttribute("data-src-set");
      imageItem.removeAttribute("style");
    });

    imageItem.src = neededSrc;
  }
}
