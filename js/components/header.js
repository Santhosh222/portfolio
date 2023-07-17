const HEADER_FIXED_CLASS = 'header--fixed';
const NAV_LINK_ACTIVE_CLASS = 'header__nav-link--active';
const MOBILE_NAV_EXPAND_BTN_CLASS = 'header__nav-mobile-expand';
const MOBILE_NAV_EXPANDED_CLASS = 'header__nav-mobile--expanded';
const HEADER_FIXED_SECTION_SELECTOR = '#about';
const NAV_LINK_SELECTOR = '.header__nav-link';
const HEADER_FIXED_HEIGHT = 100;
const MOBILE_NAV_EXPAND_BTN_SELECTOR = '.header__nav-mobile-expand';
const MOBILE_NAV_SELECTOR = '.header__nav-mobile';

export default class Header {
    constructor(element) {
        this.element = element;
        this.headerFixedSectionElement = document.querySelector(HEADER_FIXED_SECTION_SELECTOR);
        this.navLinks = this.element.querySelectorAll(NAV_LINK_SELECTOR);
        this.navLinkSections = [...this.navLinks]
            .map(navLink => document.querySelector(navLink.hash));
        this.mobileNavExpandBtn = this.element.querySelector(MOBILE_NAV_EXPAND_BTN_SELECTOR);
        this.mobileNav = this.element.querySelector(MOBILE_NAV_SELECTOR);
        console.log({element: this.element, mobileNav: this.mobileNav});

        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            const windowTop = window.scrollY || document.documentElement.scrollTop;
            this.positionFixed(windowTop);
            this.activateSectionNavLinks(windowTop);
        });

        console.log({mobileNavExpandBtn: this.mobileNavExpandBtn, collapseMobileNav: this.collapseMobileNav});
        this.mobileNavExpandBtn.addEventListener('click', () => this.expandAndCollapseMobileNav());
        document.addEventListener('click', e => this.closeMenuOnDocumentClick(e));
        // this.mobileNavCollapseBtn.addEventListener('click', () => this.collapseMobileNav());
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

    expandAndCollapseMobileNav(event) {
        console.log('expandMobileNav - ', this.mobileNav);
        const isMenuExpanded = this.mobileNavExpandBtn.getAttribute('aria-expanded') === 'true';
        if (!isMenuExpanded) {
            this.mobileNav.classList.add(MOBILE_NAV_EXPANDED_CLASS);
        } else {
            this.mobileNav.classList.remove(MOBILE_NAV_EXPANDED_CLASS);
        }
        this.mobileNavExpandBtn.setAttribute('aria-expanded', !isMenuExpanded);
    }

    closeMenuOnDocumentClick(event) {
        const target = event.target;
        const isMenuBtn = target.classList.contains(MOBILE_NAV_EXPAND_BTN_CLASS);
        console.log({target, isMenuBtn});
        if (isMenuBtn) {
            return;
        }

        this.collapseMobileNav();
    }

    collapseMobileNav() {
        this.mobileNav.classList.remove(MOBILE_NAV_EXPANDED_CLASS);
        this.mobileNavExpandBtn.setAttribute('aria-expanded', false);
    }
}