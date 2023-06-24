// SITE SCRIPTS
import './site/hashHandler.js';

// COMPONENTS SCRIPTS
import Header from "./components/header.js";
import Typer from "./components/typer.js";

window.components = {
    headers: [...document.querySelectorAll('#header')].map(element => new Header(element)),
    typers: [...document.querySelectorAll('.typer')].map(element => new Typer(element))
}