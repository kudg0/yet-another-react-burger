// Код для работы lazyload ресурсов

/*
  Для использования нужно вместо 'src' проставлять элементу 'data-lazy-src'
*/


function Lazyload(container) {
  let lazyItems = container.querySelectorAll("[data-src-set]");

  console.log(lazyItems);


  lazyItems.forEach( lazyItem => {
    initLazyLoad( lazyItem );
  });

  function initLazyLoad( lazyItem ){
    let lazyItem__parent = lazyItem.parentNode;
    lazyItem__parent.classList.add('lazyloadItem');

    lazyItem.getAttribute("data-lazy-theme") === 'black' ? lazyItem__parent.classList.add('lazyloadItem_black') :  lazyItem__parent.classList.add('lazyloadItem_white');
  }


  try{
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
        lazyItem.classList.add("lazyInit");

        loadImage( lazyItem );
      }
    });
  } catch (e) {
    lazyItems.forEach( lazyItem => {
      setInitSizes( lazyItem )

      lazyItem.classList.add("lazyInit");

      loadImage( lazyItem );
    });
  }

  function setInitSizes( imageItem ){
    let lazyItem__width = imageItem.getAttribute('width'),
        lazyItem__height = imageItem.getAttribute('height');

    imageItem.style.width = lazyItem__width + 'px';
    imageItem.style.height = lazyItem__height + 'px';
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

export default Lazyload;
