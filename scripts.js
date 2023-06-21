const slider = document.getElementById('slider')
const sliderElements = document.querySelectorAll('.slider-element')

const sliderButtonLeft = document.getElementById('sliderButtonLeft')
const sliderButtonRight = document.getElementById('sliderButtonRight')
// Llamamos y almacenamos todas las variables css
const rootStyles = document.documentElement.style;

let slideCounter = 0;
let isInTransition = false;

const DIRECTION = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

// Recuperar el valor de transform (css) cada vez que se haga click
const getTransformValue = () => Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ''));

// Reorganizar los sliders cuando se acerquen al final
const reorderSlide = () => {
    const transformValue = getTransformValue();
    rootStyles.setProperty('--transition', 'none');
    
    if (slideCounter === sliderElements.length - 1) {
        slider.appendChild(slider.firstElementChild);
        rootStyles.setProperty(
            '--slide-transform',
            `${transformValue + sliderElements[slideCounter].scrollWidth}px`
        );
        slideCounter--;
    } else if (slideCounter === 0) {
        slider.prepend(slider.lastElementChild);
        rootStyles.setProperty(
            '--slide-transform',
            `${transformValue - sliderElements[slideCounter].scrollWidth}px`
        );
        slideCounter++;
    }

    isInTransition = false;
};

// Función que controla el movimiento del slider
const moveSlide = (direction) => {
    if (isInTransition) return;
    const transformValue = getTransformValue();
    rootStyles.setProperty('--transition', 'transform 2s');
    isInTransition = true;

    if (direction === DIRECTION.RIGHT) {
        rootStyles.setProperty(
            '--slide-transform',
            `${transformValue - sliderElements[slideCounter].scrollWidth}px`
        );

        slideCounter++;

    }else if (direction === DIRECTION.LEFT) {
        rootStyles.setProperty(
            '--slide-transform',
            `${transformValue + sliderElements[slideCounter].scrollWidth}px`
        );

        slideCounter--;

    }
};

sliderButtonLeft.addEventListener('click', () => moveSlide(DIRECTION.LEFT));
sliderButtonRight.addEventListener('click', () => moveSlide(DIRECTION.RIGHT));

// Reorganizamos los elementos del slider justo despúes de acabar la última animación
slider.addEventListener('transitionend', reorderSlide);

reorderSlide();