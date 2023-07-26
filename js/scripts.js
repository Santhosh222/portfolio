// SITE SCRIPTS
import './site/hashHandler.js';

// COMPONENTS SCRIPTS
import Header from "./components/header.js";
import Typer from "./components/typer.js";
import AnimatedContainer from './components/animated-container.js';
import Portfolio from './components/portfolio.js';
import ProjectService from './services/projectService.js';

window.components = {};
window.services = {};

document.addEventListener('DOMContentLoaded', event => {
    window.services = {
        projectService: new ProjectService()
    };
    window.components = {
        header: new Header(document.querySelector('#header')),
        typers: [...document.querySelectorAll('.typer')].map(element => new Typer(element)),
        animatedContainers: [...document.querySelectorAll(".animated-container")].map(element => new AnimatedContainer(element)),
        portfolio: new Portfolio(document.querySelector('#portfolio'))
    };
});