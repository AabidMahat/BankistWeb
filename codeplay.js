// console.log(document.documentElement);

const message = document.createElement('div');
message.classList.add('cookie-message');
message.style.backgroundColor = 'lightgrey';
message.innerHTML = `We use cookies for improves functionality <button class="btn btn-close-cookie">Got It</button>`;

// header.prepend(message);
// header.append(message.cloneNode(true)); //to append multiple element we need to create a clone of it

// //before and after

// header.before(message);
// header.after(message);

// document.querySelector('.btn-close-cookie').addEventListener('click', e => {
//   message.remove();
// });
document.documentElement.addEventListener('keydown', e => {
  console.log(e.key);
});

//to read the particular css property from the style file

const computeHeight = Number.parseInt(getComputedStyle(message).height);
console.log(`${computeHeight + 50}px`);
message.style.height = `${computeHeight + 50}px`;

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');

const h1 = document.querySelector('h1');
console.log(h1);

//to deactivate addEventListener or remove we required func to be written outside the event listener
const alertH1 = e => {
  alert('AddEventListener triggered ');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

//Another way of adding events (old school way)

// h1.onmouseenter = e => {
//   alert('AddEventListener triggered ');
// };

//Random color generator rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`LINKS`, e.target, e.currentTarget);

  //to stop propagation

  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`CONTAINER`, e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(`NAVBAR`, e.target, e.currentTarget);
  }
  // true //the third parameter in add Event listener is capture phase as it will not listen to bubbling phase
);

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); //work only on direct children
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'orangered';

//Going Upward;
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //to find the parent element of h1 no matter how far away in dom tree

//querySelector finds children no matter how far it is and closest() finds the parent element no matter how far it is in the dom tree

//Going sideway (selecting sibling)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
