// получаем координаты элемента в контексте документа
export default function getCoords(elem: any, parent?: any) : any {
  const parentCoords : any = parent ? getCoords(parent) : {top: 0, bottom: 0, left: 0, right: 0};
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - parentCoords.top,
    left: box.left + window.pageXOffset - parentCoords.left,
    right: box.right + window.pageXOffset - parentCoords.right,
    bottom: box.bottom + window.pageYOffset - parentCoords.bottom,
  };
}
