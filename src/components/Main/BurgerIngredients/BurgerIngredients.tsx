import React from 'react';

import { Counter, CurrencyIcon, InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import Modal from './../../Modals/Modal';
import IngredientDetails from './../../Modals/IngredientDetails/IngredientDetails';


import {IngredientType} from './../../types/types';


import LazyLoadPicture from './../../LazyLoad/LazyLoad';
import getCoords from './../../utils/getCoords';

import Styles from './burgerIngredients.module.scss';


import { ProductsContext, ActiveProductsContext } from '../../../services/productsContext';



const MENU_ITEMS = [
  {
    text: "Булки",
    id: "bun"
  },
  {
    text: "Соусы",
    id: "sauce"
  },
  {
    text: "Начинки",
    id: "main"
  }
];


const BurgerIngredients = React.memo(() => {
  const { ingredients, setIngredients } = React.useContext(ProductsContext);
  const { activeIngredients, setActiveIngredients } = React.useContext(ActiveProductsContext);
  

  const [activeMenuTab, setActiveMenuTab] = React.useState<string>( MENU_ITEMS[0].id );

  const [clickedIngredient, setClickedIngredient] = React.useState<IngredientType>({ _id: "", name: "", type: "", proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 0, image: "", image_mobile: "", image_large: "", __v: 0 });
  const [openIngredientDetails, setOpenIngredientDetails] = React.useState<boolean>(false);


  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentSectionsRef = React.useRef<(HTMLDivElement | null)[]>(new Array(MENU_ITEMS.length));



  React.useEffect( () => {
    let activeIngredients : IngredientType[] = [];

    ingredients.forEach( (ingredient: IngredientType) => {
      for(let i : number = 0; i < ingredient.__v; i++){
        activeIngredients.push(ingredient);
      }
    });

    setActiveIngredients(activeIngredients);
  }, [clickedIngredient])


  const scrollToNeededSection = React.useCallback((sectionId: string) => {
    const scrollableContent : HTMLElement = contentRef.current!;

    const neededRefs : (HTMLElement | null)[] = 
      contentSectionsRef.current!.filter( (contentSectionRef : (HTMLElement | null)) => contentSectionRef!.getAttribute("id") === sectionId );


    const neededRef : HTMLElement =  neededRefs[0]!,
          valueForScroll : number = getCoords(neededRef, scrollableContent).top + scrollableContent.scrollTop; // Находим позицию нужной секции по отношению к странице

    scrollableContent.scrollTo(0, valueForScroll);
  }, [...contentSectionsRef.current]);


  const changeActiveMenuItem = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target : HTMLElement = e.currentTarget!,
          target__anchor : string = target.getAttribute('data-anchor')!;


    scrollToNeededSection(target__anchor);
  }, [scrollToNeededSection]);


  const handleScrollOfContent = React.useCallback(() => {
    const scrollableContent : HTMLElement = contentRef.current!;

    const activeSections : (HTMLElement | null)[] = 
      contentSectionsRef.current!.filter( (scrollableContent__section : (HTMLElement | null)) => getCoords(scrollableContent__section!, scrollableContent).top < 50);


    const activeSection : HTMLElement = activeSections[activeSections.length - 1]!,
          activeSection__id : string = activeSection.getAttribute('id')!;

    // Меняем активный элемент в меню ингедиентов
      setActiveMenuTab(activeSection__id)
    // END
  }, [...contentSectionsRef.current]);


  const increaseCounter = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target : HTMLElement = e.currentTarget!,
          target__id : string = target.getAttribute("data-id")!;

    
    const selectedIngredient : IngredientType[] = ingredients.filter( (ingredient : IngredientType) => ingredient._id === target__id );
    
    setClickedIngredient(selectedIngredient[0]);

    let activeBun : boolean = false;

    // Собираем в массив выбранные ингредиенты
    let updatedIngredientsArr : IngredientType[] = 
        ingredients.map( (ingredient: IngredientType, ingredient_index: number) => {
          if(
            ingredient._id !== target__id || 
            (ingredient.type === 'bun' && ingredient.__v === 1) || 
            (ingredient.type === 'sauce' && ingredient.__v >= 5) || 
            ingredient.__v >= 10
          ){
            return ingredient;
          }
          if(ingredient.type === 'bun'){
            activeBun = true;
          }


          ingredient.__v = ingredient.__v + 1;
          
          return ingredient;
        });
    // END

    // Если уже есть активная булка, убираем ее
      if(activeBun){
        updatedIngredientsArr = updatedIngredientsArr.map((ingredient: IngredientType, ingredient_index: number) => {
          if(ingredient.type === 'bun' && ingredient._id !== target__id){
            ingredient.__v = 0;

            return ingredient;
          }

          return ingredient;
        });
      }
    // END

    setIngredients(updatedIngredientsArr);
  }, [...ingredients]);

  const showIngredientDetails : () => void = React.useCallback(() => {
    setOpenIngredientDetails(true);
  }, []);
  const closeIngredientDetails : () => void = React.useCallback(() => {
    setOpenIngredientDetails(false);
  }, []);



  return (
    <div className={Styles.burgerIngredientsContainer}>
      <section className={Styles.burgerIngredientsContainer__menu}>
        <ul className={Styles.menu__items}>
          {
            MENU_ITEMS.map( (MENU_ITEM: {id: string, text: string}, MENU_ITEM_INDEX: number) => {
              return (
                <li 
                  key={MENU_ITEM_INDEX} 
                  className={Styles.items__item} 
                  data-active={MENU_ITEM.id === activeMenuTab} 
                  data-anchor={MENU_ITEM.id}
                  onClick={changeActiveMenuItem}
                >
                  <span className={Styles.item__text}>
                    {MENU_ITEM.text}
                  </span>
                </li>
              );
            })
          }
        </ul>
      </section>

      <section 
        className={Styles.burgerIngredientsContainer__content} 
        onScroll={handleScrollOfContent}
        ref={contentRef}
      >
        {
          MENU_ITEMS.map( (MENU_ITEM: {id: string, text: string}, MENU_ITEM_INDEX: number) => {
            return (
              <div 
                key={MENU_ITEM_INDEX} 
                className={Styles.content__section} 
                ref={
                  (ref) => contentSectionsRef.current[MENU_ITEM_INDEX] = ref
                } 
                id={MENU_ITEM.id}
              >
                <h2 className={Styles.section__title}>
                  {MENU_ITEM.text}
                </h2>

                <ul className={Styles.section__items}>
                  {
                    ingredients && ingredients.length > 0 && 
                    ingredients.filter( (ingredient: IngredientType) => ingredient.type === MENU_ITEM.id)
                    .map( (ingredient: IngredientType, item__index: number) => {
                      return (
                        <li 
                          key={ingredient._id} 
                          data-id={ingredient._id}
                          className={Styles.items__item} 
                          onClick={increaseCounter}
                        > 
                          <div className={Styles.item__image}>
                            <LazyLoadPicture 
                              imageMobile={ingredient.image_mobile} 
                              imageLarge={ingredient.image_large} 
                              image={ingredient.image}
                              width={240} height={120}
                              alt={ingredient.name} 
                            />
                          </div>
                          <div className={Styles.item__info}>
                            <span className={Styles.info__price}>
                              {ingredient.price}
                            </span>
                            <div className={Styles.info__icon}>
                              <CurrencyIcon type="primary"/>
                            </div>
                          </div>
                          <div className={Styles.item__title}>
                            <h3 className={Styles.title__text}>
                              {ingredient.name}
                            </h3>
                          </div>
                          <div 
                            className={Styles.item__more} 
                            onClick={showIngredientDetails}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px">    
                              <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"/>
                            </svg>
                          </div>
                          
                          {
                            ingredient.__v > 0 && 
                            <div className={Styles.item__counter}>
                              <Counter 
                                count={ingredient.__v} 
                                size={ingredient.__v.toString().length === 1 ? "default" : "small"} 
                              />
                            </div>
                          }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            );
          })
        }
      </section>

      <Modal shouldShow={openIngredientDetails} closeModalCallback={closeIngredientDetails}>
        <IngredientDetails ingredient={clickedIngredient}/>
      </Modal>
    </div>
  )
});

export default BurgerIngredients;