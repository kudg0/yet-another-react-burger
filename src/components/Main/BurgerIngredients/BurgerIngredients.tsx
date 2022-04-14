import React from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import {IngredientType} from './../types.jsx';


import lazyload from './../../utils/lazyLoad.js';
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



class BurgerIngredients extends React.Component<{ ingredients: Array<IngredientType>, increaseCounterValue: any }, { activeMenuTab: string }> {
  constructor(props: any) {
    super(props);


    this.state = {
      activeMenuTab: MENU_ITEMS[0].id
    };


    this.increaseCounter = this.increaseCounter.bind(this);

    this.changeActiveMenuItem = this.changeActiveMenuItem.bind(this);

    this.scrollToNeededSection = this.scrollToNeededSection.bind(this);
    this.handleScrollOfContent = this.handleScrollOfContent.bind(this);
  }


  componentDidMount(){
    this.initLazyLoad();
  }
  componentDidUpdate(){
    this.initLazyLoad();
  }
  initLazyLoad(){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content);
    
    lazyload(scrollableContent);
  }


  changeActiveMenuItem(e: React.MouseEvent<HTMLElement>){
    let target : HTMLElement = e.currentTarget,
        target__anchor : any = target.getAttribute('data-anchor');


    this.scrollToNeededSection(target__anchor);
  }
  scrollToNeededSection(sectionId: string){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content),
        neededSection = scrollableContent.querySelector("#" + sectionId);

    // Находим позицию секции по отношению к странице
    let valueForScroll = getCoords(neededSection, scrollableContent).top + scrollableContent.scrollTop;


    scrollableContent.scrollTo(0, valueForScroll);
  }
  handleScrollOfContent(){
    let scrollableContent : any = document.querySelector("." + Styles.burgerIngredientsContainer__content),
        scrollableContent__sections = [...scrollableContent.querySelectorAll("." + Styles.content__section)];

    let activeSections = scrollableContent__sections.filter( (scrollableContent__section: HTMLElement) => getCoords(scrollableContent__section, scrollableContent).top < 10);


    // Меняем активный элемент в меню ингедиентов
      this.setState({
        activeMenuTab: activeSections.pop().id
      });
    // END
  }


  increaseCounter(e: React.MouseEvent<HTMLElement>){
    let target = e.currentTarget,
        target__id = target.getAttribute("data-id");


    // Увеличиваем счетчик в пропсе у выбранного ингредиента
    this.props.increaseCounterValue(target__id);
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
                    data-active={MENU_ITEM.id === this.state.activeMenuTab} 
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

        <section 
          className={Styles.burgerIngredientsContainer__content} 
          onScroll={this.handleScrollOfContent}
        >
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
                      this.props.ingredients && 
                      this.props.ingredients.length > 0 && 
                      this.props.ingredients.filter( (ingredient: IngredientType) => ingredient.type === MENU_ITEM.id)
                      .map( (ingredient: IngredientType, item__index: number) => {
                        return (
                          <li 
                            key={ingredient._id} 
                            data-id={ingredient._id}
                            className={Styles.items__item} 
                            onClick={this.increaseCounter}
                          >
                            <div className={Styles.item__counter}>
                              <Counter 
                                count={ingredient.__v} 
                                size={ingredient.__v.toString().length === 1 ? "default" : "small"} 
                              />
                            </div>
                            
                            <div className={Styles.item__image}>
                              <picture>
                                <source 
                                  data-src-set={ingredient.image_mobile} 
                                  media="(max-width: 768px)"
                                 />
                                <source 
                                  data-src-set={ingredient.image_large} 
                                  media="(min-width: 1440px)" 
                                />
                                <source 
                                  data-src-set={ingredient.image} 
                                />
                                <img 
                                  data-src-set={ingredient.image} 
                                  alt={ingredient.name} 
                                  width='240' height='120'
                                />
                              </picture>
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
}

export default BurgerIngredients;