import React from 'react';

import { Counter, CurrencyIcon, InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import IngredientDetails from './../../Modals/IngredientDetails/IngredientDetails';


import {IngredientType} from './../../types/types';


import LazyLoadPicture from './../../LazyLoad/LazyLoad';
import getCoords from './../../utils/getCoords';

import Styles from './burgerIngredients.module.scss';



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


const BurgerIngredients = React.memo(( props: {
  ingredients: IngredientType[], 
  increaseCounterCallback: (clickedIngredientId: string) => void
}) => {
  
  const [clickedIngredient, setClickedIngredient] = React.useState<IngredientType>({ _id: "", name: "", type: "", proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 0, image: "", image_mobile: "", image_large: "", __v: 0 });
  const [activeMenuTab, setActiveMenuTab] = React.useState<string>( MENU_ITEMS[0].id );
  const [openIngredientDetails, setOpenIngredientDetails] = React.useState<boolean>(false);

  const contentRef = React.useRef<HTMLDivElement>(null);
  
  const contentSectionRef_bun = React.useRef<HTMLDivElement>(null);
  const contentSectionRef_sauce = React.useRef<HTMLDivElement>(null);
  const contentSectionRef_main = React.useRef<HTMLDivElement>(null);




  const scrollToNeededSection = React.useCallback((sectionId: string) => {
    const scrollableContent : HTMLElement = contentRef.current!;

    const neededRefs : (HTMLElement)[] = 
            [contentSectionRef_bun.current!, contentSectionRef_sauce.current!, contentSectionRef_main.current!]
            .filter( (contentSectionRef : HTMLElement) => contentSectionRef.getAttribute("id") === sectionId );


    const neededRef : HTMLElement =  neededRefs[0]!,
          valueForScroll : number = getCoords(neededRef, scrollableContent).top + scrollableContent.scrollTop; // Находим позицию нужной секции по отношению к странице

    scrollableContent.scrollTo(0, valueForScroll);
  }, [contentSectionRef_bun, contentSectionRef_sauce, contentSectionRef_main]);


  const changeActiveMenuItem = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target : HTMLElement = e.currentTarget!,
          target__anchor : string = target.getAttribute('data-anchor')!;


    scrollToNeededSection(target__anchor);
  }, [scrollToNeededSection]);


  const handleScrollOfContent = React.useCallback(() => {
    const scrollableContent : HTMLElement = contentRef.current!;

    const activeSections : (HTMLElement)[] = 
            [contentSectionRef_bun.current!, contentSectionRef_sauce.current!, contentSectionRef_main.current!]
            .filter( (scrollableContent__section : HTMLElement) => getCoords(scrollableContent__section, scrollableContent).top < 50);


    const activeSection : HTMLElement = activeSections[activeSections.length - 1]!,
          activeSection__id : string = activeSection.getAttribute('id')!;

    // Меняем активный элемент в меню ингедиентов
      setActiveMenuTab(activeSection__id)
    // END
  }, [contentSectionRef_bun, contentSectionRef_sauce, contentSectionRef_main]);


  const increaseCounter = (e: React.MouseEvent<HTMLElement>) => {
    const target : HTMLElement = e.currentTarget!,
          target__id : string = target.getAttribute("data-id")!;

    
    const selectedIngredient : IngredientType[] = props.ingredients.filter( (ingredient : IngredientType) => ingredient._id === target__id );
    
    setClickedIngredient(selectedIngredient[0]);
    showIngredientDetails();


    // Увеличиваем счетчик в пропсе у выбранного ингредиента
      props.increaseCounterCallback(target__id);
    // END
  };


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
                  MENU_ITEM.id === 'bun' ? 
                  contentSectionRef_bun : MENU_ITEM.id === 'sauce' ? 
                  contentSectionRef_sauce : contentSectionRef_main
                } 
                id={MENU_ITEM.id}
              >
                <h2 className={Styles.section__title}>
                  {MENU_ITEM.text}
                </h2>

                <ul className={Styles.section__items}>
                  {
                    props.ingredients && props.ingredients.length > 0 && 
                    props.ingredients.filter( (ingredient: IngredientType) => ingredient.type === MENU_ITEM.id)
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

      <IngredientDetails ingredient={clickedIngredient} shouldShow={openIngredientDetails} closeModalCallback={closeIngredientDetails}/>
    </div>
  )
});

export default BurgerIngredients;