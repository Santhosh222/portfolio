// SITE SCRIPTS
import './site/hashHandler.js';

// COMPONENTS SCRIPTS
import Header from "./components/header.js";
import Typer from "./components/typer.js";
import AnimatedContainer from './components/animated-container.js';

document.addEventListener('DOMContentLoaded', event => {
    window.components = {
        header: new Header(document.querySelector('#header')),
        typers: [...document.querySelectorAll('.typer')].map(element => new Typer(element)),
        animatedContainers: [...document.querySelectorAll(".animated-container")].map(element => new AnimatedContainer(element))
    }
});