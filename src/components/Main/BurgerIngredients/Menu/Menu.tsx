import React from 'react';

import { v4 as uuidv4 } from 'uuid';


import Styles from './menu.module.scss';

import getCoords from './../../../../services/utils/helpers/getCoords';


const Menu = React.forwardRef((
  props: {
    menuItems: {text: string, id: string, uuid: string}[], 
    scollableContainer: HTMLDivElement | null, 
    contentContainers: (HTMLDivElement  | null)[]
  }, 
  ref
) => {
  
  const [activeMenuTab, setActiveMenuTab] = React.useState<string>( props.menuItems[0].id );



  const scrollToNeededSection = React.useCallback((sectionId: string) => {
    if(!props.scollableContainer || !props.contentContainers) return ;


    const neededRefs : (HTMLElement | null)[] = 
      props.contentContainers.filter( (contentSectionRef : (HTMLElement | null)) => contentSectionRef!.getAttribute("id") === sectionId);


    const neededRef : HTMLElement =  neededRefs.shift()!,
          valueForScroll : number = getCoords(neededRef, props.scollableContainer).top + props.scollableContainer.scrollTop; // Находим позицию нужной секции по отношению к странице


    props.scollableContainer.scrollTo(0, valueForScroll);
  }, [props.scollableContainer, props.contentContainers]);


  const changeActiveMenuItem : (e: React.MouseEvent<HTMLElement>) => void = React.useCallback((e) => {
    const target : HTMLElement = e.currentTarget!,
          target__anchor : string = target.getAttribute('data-anchor')!;


    scrollToNeededSection(target__anchor);
  }, [scrollToNeededSection]);


  React.useImperativeHandle(ref, () => ({
    handleScrollOfContent() {
      if(!props.scollableContainer || !props.contentContainers) return ;

      const activeSections : (HTMLElement | null)[] = 
          props.contentContainers.filter( (scrollableContent__section : (HTMLElement | null)) => getCoords(scrollableContent__section!, props.scollableContainer!).top < 50);

      const activeSection : HTMLElement = activeSections.pop()!,
            activeSection__id : string = activeSection.getAttribute('id')!;


      // Меняем активный элемент в меню ингедиентов
        setActiveMenuTab(activeSection__id)
      // END
    }
  }));



  return (
    <section className={Styles.menuContainer}>
      <ul className={Styles.menuContainer__items}>
        {
          props.menuItems.map( (menuItem: {id: string, text: string, uuid: string}, menuItemIndex: number) => {
            return (
              <li 
                key={menuItem.uuid} 
                className={Styles.items__item} 
                data-active={menuItem.id === activeMenuTab} 
                data-anchor={menuItem.id}
                onClick={changeActiveMenuItem}
              >
                <span className={Styles.item__text}>
                  {menuItem.text}
                </span>
              </li>
            );
          })
        }
      </ul>
    </section>
  )
});

export default Menu;