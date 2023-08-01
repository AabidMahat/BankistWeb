'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tab = document.querySelector('.operations');
const tabButton = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const allSec = document.querySelectorAll('.section');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/////////////////////////////////////////////////////////////////
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////////////////////////////////////

btnScrollTo.addEventListener('click', e => {
  const slcords = section1.getBoundingClientRect();
  console.log(slcords);

  console.log('The X and Y co-ordinates are', window.scrollX, window.scrollY);

  //to view height and width of current viewport;
  console.log(
    'The heigth and width are',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(slcords.left + window.screenX, slcords.top + window.scrollY);

  //Old fashion way

  // window.scrollTo({
  //   left: slcords.left + window.screenX,
  //   top: slcords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  //new fashion way
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////PAGE NAVIGATION //////////////////////
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//drawback of current method is that we create a copy of addEventListener for each link

//1) Add event listener to the parent element;
//2) find the target to which event happens

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

console.log(tabContainer);
tabContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //guard clauses
  if (!clicked) return;

  //Active Tabs and contents
  tabButton.forEach(tabs => tabs.classList.remove('operations__tab--active'));

  tabContent.forEach(tabs =>
    tabs.classList.remove('operations__content--active')
  );
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//nav bar
const handleNavBar = function (e) {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Passing "argument" into handler

nav.addEventListener('mouseover', handleNavBar.bind(0.5));

nav.addEventListener('mouseout', handleNavBar.bind(1));

//Sticky Navbar
// const initalCord = section1.getBoundingClientRect();
// console.log(initalCord);
// window.addEventListener('scroll', function () {
//   // console.log(this.window.scrollY);
//   if (this.window.scrollY > initalCord.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(section1);

//Intersection API Observer;
const headerHeight = nav.getBoundingClientRect();
const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const optionsObj = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight.height}px`,
};

const observer = new IntersectionObserver(stickyNav, optionsObj);
observer.observe(header);

//Reveal Section

const allSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');

  // observer.unobserve(entry.target);
};

const observeSection = new IntersectionObserver(allSection, {
  root: null,
  threshold: 0.1,
});

allSec.forEach(sec => {
  observeSection.observe(sec);
  sec.classList.add('section--hidden');
});

//Lazy Loading
const imgTarget = document.querySelectorAll('img[data-src]');
console.log(imgTarget);
const loadImg = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace the img with data src img;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(img => imgObserver.observe(img));

//Slider

let currentSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"> </button>`
    );
  });
};

const activateDot = slide => {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
const gotoSlide = (numOfSlide = 0) => {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - numOfSlide)}%)`;
  });
};
const init = () => {
  gotoSlide();
  createDots();
  activateDot(0);
};
init();
const nextSlide = () => {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};
const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//Keyboard slide
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

//dots
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slider = e.target.dataset.slide;
    e.target.classList.add('dots__dot--active');
    gotoSlide(slider);
    activateDot(slider);
  }
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
