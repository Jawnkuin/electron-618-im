import '../app.global.css';

function component () {
  const element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = 'Hello webpack';

  return element;
}

document.body.appendChild(component());
