/**
 * from https://stackoverflow.com/questions/20268128/how-to-test-if-an-element-has-class-using-protractor
 */
export function hasClass(element, cls) {
  return element.getAttribute('class').then(function (classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
}
