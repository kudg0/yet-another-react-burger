import React, {useState} from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import {IngredientType} from './../types.jsx';


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
  },
];


const BurgerIngredients = ( props: {ingredients: Array<IngredientType>, increaseCounterValue: any} ) => {
  const [activeMenuTab, setActiveMenuTab] : [string, any] = React.useState( MENU_ITEMS[0].id );

  const contentRef = React.useRef<HTMLDivElement>(null);
  
  const contentSectionRef_bun = React.useRef<HTMLDivElement>(null);
  const contentSectionRef_sauce = React.useRef<HTMLDivElement>(null);
  const contentSectionRef_main = React.useRef<HTMLDivElement>(null);



  const changeActiveMenuItem = (e: React.MouseEvent<HTMLElement>) => {
    let target : HTMLElement = e.currentTarget,
        target__anchor : (string | null) = target.getAttribute('data-anchor');

    if(!target__anchor) return;

    scrollToNeededSection(target__anchor);
  }


  const scrollToNeededSection = (sectionId: string) => {
    if(!contentRef.current) return;

    let scrollableContent : HTMLElement = contentRef.current,
        neededRefs : (HTMLElement | null)[] = 
          [contentSectionRef_bun.current, contentSectionRef_sauce.current, contentSectionRef_main.current]
          .filter( (contentSectionRef : (HTMLElement | null)) => {
            if(!contentSectionRef) return false;

            return contentSectionRef.getAttribute("id") === sectionId
          });

    if(neededRefs.length === 0) return;


    let neededRef : (HTMLElement | null) =  neededRefs[0];

    if(!neededRef) return;


    // Находим позицию секции по отношению к странице
    let valueForScroll : number = getCoords(neededRef, scrollableContent).top + scrollableContent.scrollTop;


    scrollableContent.scrollTo(0, valueForScroll);
  }


  const handleScrollOfContent = () => {
    let scrollableContent : (HTMLElement | null) = contentRef.current;

    if(!scrollableContent) return;


    let activeSections : (HTMLElement | null)[] = 
      [contentSectionRef_bun.current, contentSectionRef_sauce.current, contentSectionRef_main.current]
      .filter( (scrollableContent__section : (HTMLElement | null)) => {
        if(!scrollableContent__section || !scrollableContent){
          return false;
        }

        return getCoords(scrollableContent__section, scrollableContent).top < 10;
      });

    if(activeSections.length === 0) return;


    let activeSection : (HTMLElement | null) = activeSections[activeSections.length - 1];

    if(!activeSection) return;


    let activeSection__id : (string | null) = activeSection.getAttribute('id');

    if(!activeSection__id) return;


    // Меняем активный элемент в меню ингедиентов
      setActiveMenuTab(activeSection__id)
    // END
  }


  const increaseCounter = (e: React.MouseEvent<HTMLElement>) => {
    let target : HTMLElement = e.currentTarget,
        target__id : (string | null) = target.getAttribute("data-id");

    if(!target__id) return;


    // Увеличиваем счетчик в пропсе у выбранного ингредиента
    props.increaseCounterValue(target__id);
  }




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
                <span className={Styles.section__title}>
                  {MENU_ITEM.text}
                </span>

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
                          <div className={Styles.item__counter}>
                            {
                              ingredient.__v > 0 && 
                              <Counter 
                                count={ingredient.__v} 
                                size={ingredient.__v.toString().length === 1 ? "default" : "small"} 
                              />
                            }
                          </div>
                          
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
    </div>
  )
}


export default BurgerIngredients;