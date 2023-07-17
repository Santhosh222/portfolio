const BOTTOM_REACHED_CLASS = 'bottom-reached';

export default class AnimatedContainer {
    constructor(element) {
        this.element = element;
        this.checkIfElementInWindow();
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.checkIfElementInWindow();
        });
    }

    /**
     * Function used to convert header position from absolute to fixed once when user scrolls from Home section to About Section
     */
    checkIfElementInWindow() {
        const windowHeight = window.innerHeight;
        const componentBottom = this.element.getBoundingClientRect().bottom;
        if (windowHeight > componentBottom) {
            this.element.classList.add(BOTTOM_REACHED_CLASS);
        }
    }
}