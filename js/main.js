const state = {
    activeStep: "start",
    prevScrollY: 0,
};
const steps = document.querySelectorAll('.slider-step');
const addActiveStep = () => {
    steps.forEach(step => {
        if (step.hash.slice(1) === state.activeStep) {
            step.classList.add('slider-step_active')
        } else {
            step.classList.remove('slider-step_active')
        }
    })
}
addActiveStep();

const checkActiveStep = (step) => {
    if (step) {
        const target = document.getElementById(step.hash.slice(1));
        const windowPosition = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        },
        targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        };
    
        if (targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom) {
            state.activeStep = step.hash.slice(1);
            addActiveStep();
        }
    }
}

const scrollToStep = (element) => {
    element.scrollIntoView({block: "start", behavior: "smooth"})
}

const startPage = document.querySelector("#start");
startPage.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.closest(".slider-step")) {
        if (!target.matches('.slider-step')) {
            state.activeStep = target.parentElement.hash.slice(1);
        } else {
            state.activeStep = target.hash.slice(1);
        }
        addActiveStep();
        scrollToStep(document.getElementById(state.activeStep));
    } else if(target.matches('#scrollBtn')) {
        scrollToStep(document.querySelector("#content"))
    }
})

window.addEventListener('scroll', (e) => {
    if (state.prevScrollY < window.scrollY) {
        steps.forEach(step => {
            if (step.hash.slice(1) === state.activeStep) {
                checkActiveStep(step.nextElementSibling)
            }
        })
    } else {
        steps.forEach(step => {
            if (step.hash.slice(1) === state.activeStep) {
                checkActiveStep(step.previousElementSibling)
            }
        })
    }
    state.prevScrollY = window.scrollY;
})