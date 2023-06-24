const ANCHOR_LINK_SELECTOR = 'a[href^="#"]:not([href="#"]):not(:empty)';

[...document.querySelectorAll(ANCHOR_LINK_SELECTOR)].forEach(anchorLink => {
    anchorLink.addEventListener('click', (e) => {
        e.preventDefault();
        const newHash = anchorLink.hash;
        const target = document.querySelector(newHash);
        if (target) {
            target.scrollIntoView({behavior: 'smooth'});
            setTimeout(() => {
                window.location.hash = newHash;
            }, 500);
        }
    });
})