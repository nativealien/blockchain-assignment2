import Dom from "./models/Dom.mjs"

console.log($fx)

const initApp = async () => new Dom(localStorage.getItem('token'))

document.addEventListener('DOMContentLoaded', initApp)