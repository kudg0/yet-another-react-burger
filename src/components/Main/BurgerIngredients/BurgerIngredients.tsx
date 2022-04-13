import React from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import {IngredientType} from './../types.jsx';

import Styles from './burgerIngredients.module.scss';
import Lazyload from './../../App/lazyLoad.js';


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


class BurgerIngredients extends React.Component<{ ingredients: Array<IngredientType>, increaseCounterValue: any }, { menuItems: any, topMargin: number }> {
  constructor(props: any) {
    super(props);

    this.state = {
      menuItems: [
        true, 
        false, 
        false
      ],
      topMargin: 0
    };

    this.changeActiveMenuItem = this.changeActiveMenuItem.bind(this);
    this.scrollToNeededSection = this.scrollToNeededSection.bind(this);
    this.increaseCounter = this.increaseCounter.bind(this);
    this.handleScrollOfContent = this.handleScrollOfContent.bind(this);
  }

  changeActiveMenuItem(e: any){
    let target = e.currentTarget,
        target__anchor = target.getAttribute('data-anchor');


    this.scrollToNeededSection(target__anchor);
  }

  scrollToNeededSection(sectionId: string){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content),
        neededSection = scrollableContent.querySelector("#" + sectionId);


    const SCROLL_VALUE = getCoords(neededSection, scrollableContent).top + scrollableContent.scrollTop;


    // Логика скролла блока с ингедиентами
      scrollableContent.scrollTo(0, SCROLL_VALUE);
    // END
  }

  handleScrollOfContent(){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content),
        scrollableContent__sections = [...scrollableContent.querySelectorAll("." + Styles.content__section)];

    let activeItems = scrollableContent__sections.filter( (scrollableContent__section: HTMLElement) => getCoords(scrollableContent__section, scrollableContent).top < 10),
        activeIndex = scrollableContent__sections.indexOf(activeItems.pop());


    // Меняем активный элемент в меню ингедиентов
      this.setState({
        menuItems: scrollableContent__sections.map( (scrollableContent__section: any, scrollableContent__section__index: number) : boolean => {
          return scrollableContent__section__index === activeIndex;
        })
      });
    // END
  }

  lazyLoadContent(){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content),
        scrollableContent__lazyImages = [...scrollableContent.querySelectorAll("[data-src-set]")];

  }

  increaseCounter(e: any){
    let target = e.currentTarget,
        target__id = target.getAttribute("data-id");

    // Увеличиваем счетчик в пропсе у ингредиента
    this.props.increaseCounterValue(target__id);
  }

  componentDidMount(){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content);
    
    Lazyload(scrollableContent);
  }
  componentDidUpdate(){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content);
    
    Lazyload(scrollableContent);
  }

  render(){
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
                    data-active={this.state.menuItems[MENU_ITEM_INDEX]} 
                    data-anchor={MENU_ITEM.id}
                    onClick={this.changeActiveMenuItem}
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



        <section className={Styles.burgerIngredientsContainer__content} onScroll={this.handleScrollOfContent}>
          {
            MENU_ITEMS.map( (MENU_ITEM: {id: string, text: string}, MENU_ITEM_INDEX: number) => {
              return (
                <div 
                  key={MENU_ITEM_INDEX} 
                  className={Styles.content__section} 
                  id={MENU_ITEM.id}
                >
                  <span className={Styles.section__title}>
                    {MENU_ITEM.text}
                  </span>

                  <ul className={Styles.section__items}>
                    {
                      this.props.ingredients && this.props.ingredients.length > 0 && this.props.ingredients.filter((item: IngredientType) => item.type === MENU_ITEM.id).map((item: IngredientType, item__index: number) => {
                        return (
                          <li 
                            key={item._id} 
                            data-id={item._id}
                            className={Styles.items__item} 
                            onClick={this.increaseCounter}
                          >
                            <div className={Styles.item__counter}>
                              <Counter count={item.__v} size={item.__v.toString().length === 1 ? "default" : "small"} />
                            </div>
                            
                            <div className={Styles.item__image}>
                              <picture>
                                <source data-src-set={item.image_mobile} media="(max-width: 768px)" />
                                <source data-src-set={item.image_large} media="(min-width: 1440px)" />
                                <source data-src-set={item.image_large} />
                                <img data-src-set={item.image} alt="My default image" />
                              </picture>
                            </div>
                            <div className={Styles.item__info}>
                              <span className={Styles.info__price}>
                                {item.price}
                              </span>
                              <div className={Styles.info__icon}>
                                <CurrencyIcon type="primary"/>
                              </div>
                            </div>
                            <div className={Styles.item__title}>
                              <h3 className={Styles.title__text}>
                                {item.name}
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
}

export default BurgerIngredients;


// получаем координаты элемента в контексте документа
function getCoords(elem: any, parent?: any) : any {
  const parentCoords : any = parent ? getCoords(parent) : {top: 0, bottom: 0, left: 0, right: 0};
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - parentCoords.top,
    left: box.left + window.pageXOffset - parentCoords.left,
    right: box.right + window.pageXOffset - parentCoords.right,
    bottom: box.bottom + window.pageYOffset - parentCoords.bottom,
  };
}
