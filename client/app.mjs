import Dom from "./models/Dom.mjs"

const initApp = async () => new Dom(localStorage.getItem('token'))

document.addEventListener('DOMContentLoaded', initApp)