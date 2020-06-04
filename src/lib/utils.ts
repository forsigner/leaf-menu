export const utils = {
  addClass,
  removeClass,
};

export default utils;

function addClass(element: any, className: string) {
  if (!element) return;
  const classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }

  element.className = classes.join(' ');
  return element;
}

function removeClass(element: any, className: string) {
  if (!element) return;
  const classes = element.className.split(' ');
  const index = classes.indexOf(className);
  if (index > -1) {
    classes.splice(index, 1);
  }

  element.className = classes.join(' ');
  return element;
}