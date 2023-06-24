const HEADER_FIXED_CLASS = 'header--fixed';
const NAV_LINK_ACTIVE_CLASS = 'header__nav-link--active';
const HEADER_FIXED_SECTION_SELECTOR = '#about';
const NAV_LINK_SELECTOR = '.header__nav-link';
const HEADER_FIXED_HEIGHT = 100;

export default class Header {
    constructor(element) {
        this.element = element;
        this.headerFixedSectionElement = document.querySelector(HEADER_FIXED_SECTION_SELECTOR);
        this.navLinks = this.element.querySelectorAll(NAV_LINK_SELECTOR);
        this.navLinkSections = [...this.navLinks]
            .map(navLink => document.querySelector(navLink.hash));

        this.bindEvents();
        this.activateNavLink(this.navLinks[0]);
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            const windowTop = window.scrollY || document.documentElement.scrollTop;
            this.positionFixed(windowTop);
            this.activateSectionNavLinks(windowTop);
        });
    }

    /**
     * Function used to convert header position from absolute to fixed once when user scrolls from Home section to About Section
     */
    positionFixed(windowTop) {
        const elTop = this.headerFixedSectionElement.offsetTop;

        if (windowTop >= elTop - HEADER_FIXED_HEIGHT) {
            this.element.classList.add(HEADER_FIXED_CLASS);
        } else {
            this.element.classList.remove(HEADER_FIXED_CLASS);
        }
    }

    activateSectionNavLinks(windowTop) {
        let activeLink;
        for (let i = 0; i < this.navLinks.length; i++) {
            const navLink = this.navLinks[i];
            const navLinkSection = this.navLinkSections[i];
            if (navLinkSection && windowTop >= navLinkSection.offsetTop-HEADER_FIXED_HEIGHT) {
                activeLink = navLink;
            }
        }
        if (activeLink && !this.isActiveNavLink(activeLink)) {
            this.activateNavLink(activeLink);
        }
    }

    activateNavLink(navLink) {
        [...this.navLinks].forEach(navLink => navLink.classList.remove(NAV_LINK_ACTIVE_CLASS));
        navLink.classList.add(NAV_LINK_ACTIVE_CLASS);
    }

    isActiveNavLink(navLink) {
        return navLink.classList.contains(NAV_LINK_ACTIVE_CLASS);
    }
}