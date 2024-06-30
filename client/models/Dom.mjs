import Element from "./Element.mjs"
import User from "./User.mjs"
import { login, getUser } from '../utils/api-utils.mjs'

export default class Dom{
    constructor(){
        this.token = localStorage.getItem('token')
        this.user = {}
        this.body = document.getElementsByTagName('body')[0]
        this.header = new Element({element: 'header'}).element
        this.main = new Element({element: 'main'}).element
        this.footer = new Element({element: 'footer'}).element

        this.init()
    }
    init(){
        Element.h1(this.header, 'header-h1', 'Swooosh...')
        if(this.token) this.loadUser()
        this.navBar(this.header)
        this.body.appendChild(this.header)
        this.body.appendChild(this.main)
        this.body.appendChild(this.footer)
    }
    async loadUser(){
        const user = await getUser()
        this.user = user.data
    }

    navBar(parent){
        const navbar = Element.nav(parent, 'header-nav')
        Element.a(navbar, 'nav-home', 'Home', '#', 'click', e => this.homePage(this.main))
        if(!this.token){
            Element.a(navbar, 'nav-login', 'Login', '#', 'click', e => this.loginPage(this.main))
            Element.a(navbar, 'nav-signup', 'Signup', '#', 'click', e => this.signupPage(this.main))
            this.loginPage(this.main)
        }else{
            Element.a(navbar, 'nav-user', 'Account', '#', 'click', e => this.accountPage(this.main))
            Element.a(navbar, 'nav-logout', 'Logout', '#', 'click', e => this.logout(e))
            this.homePage(this.main)
        }
        parent.appendChild(navbar)
    }

    homePage(parent){
        parent.innerHTML = ''
        const section =         Element.section(parent, 'home-section')
        Element.h2(section, 'home-h2', 'Home')
    }

    accountPage(parent){
        console.log(this.user)
        parent.innerHTML = ''
        const section =         Element.section(parent, 'user-section')
        Element.h2(section, 'user-h2', 'Account')
        Element.h2(section, 'user-name', this.user.name)
        Element.h2(section, 'user-email', this.user.email)
        Element.h2(section, 'user-role', this.user.role)
    }

    loginPage(parent){
        parent.innerHTML = ''
        const section =         Element.section(parent, 'login-section')
        const form =            Element.form(section, 'login-form')

        const email = Element.input(form, 'login-email', 'Enter email', 'email')
        const password = Element.input(form, 'login-password', 'Enter password', 'password')
        Element.button(form, 'login-button', 'Login', 'click', async e => {
            console.log(email, password)
            await login(email.value, password.value)})
        Element.a(section, 'login-signup', 'or signup here', '#', 'click', e => this.signupPage(this.main) )
    }

    logout(e){
        e.preventDefault()
        localStorage.removeItem('token')
        location.reload()

    }

    signupPage(parent){
        parent.innerHTML = ''
        const section =         Element.section(parent, 'login-section')
        const form =            Element.form(section, 'login-form')

        Element.input(form, 'login-name', 'Enter name', 'text')
        Element.input(form, 'login-email', 'Enter email', 'email')
        Element.input(form, 'login-password', 'Enter password', 'password')
        Element.button(form, 'login-button', 'Login', 'click', e => {
            e.preventDefault()
            console.log('SIGNUP')
        })
        Element.a(section, 'login-signup', 'or login here', '#', 'click', e => this.loginPage(this.main) )
    }
}