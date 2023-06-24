// SITE SCRIPTS
import './site/hashHandler.js';

// COMPONENTS SCRIPTS
import Header from "./components/header.js";
import Typer from "./components/typer.js";

window.components = {
    header: new Header(document.querySelector('#header')),
    typers: [...document.querySelectorAll('.typer')].map(element => new Typer(element))
}