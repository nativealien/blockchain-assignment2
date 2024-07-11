import Element from "./Element.mjs"
import { p, presets } from "../settings/settings.mjs"
// import User from "./User.mjs"
import { Style } from "./Style.mjs"
import { login, register, retrievePassword, getUser } from '../utils/api-utils.mjs'

export default class Dom{
    constructor(){
        this.token = localStorage.getItem('token')
        this.user = {}
        this.body = new Element({element: 'body', parent: document.documentElement, style: presets.body}).element
        this.header = new Element({element: 'header', parent: this.body, style: presets.header}).element
        this.main = new Element({element: 'main', parent: this.body, style: presets.main}).element
        this.footer = new Element({element: 'footer', parent: this.body, style: presets.footer}).element
        
        this.init()
    }
    init(){
        const bodies = document.getElementsByTagName('body')
        if(bodies.length > 1) bodies[0].remove()
        
        this.body.appendChild(this.header)
        this.body.appendChild(this.main)
        this.body.appendChild(this.footer)

        this.initPage()
    }

    async initPage(){
        Element.p(this.footer, 'Copyright etc', {fontSize: '1.2rem', padding: '2px', textAlign: 'center'})
        this.navBar(this.header)
        Element.h1(this.header, 'submachine', null)
        this.body.appendChild(this.header)
        this.body.appendChild(this.main)
        this.body.appendChild(this.footer)

        if(this.token){
            this.user = await getUser()
            this.accountPage(this.main)
        }else {
            this.loginPage(this.main)
        }

    }

    navBar(parent){
        const navbar = Element.nav(parent, null)
        Element.a(navbar, 'Machine', '#', 'click', e => this.homePage(this.main), {backgroundColor: p.colors.f})
        if(!this.token){
            Element.a(navbar, 'Enter', '#', 'click', e => this.loginPage(this.main), {backgroundColor: p.colors.f})
            Element.a(navbar, 'Join', '#', 'click', e => this.signupPage(this.main), {backgroundColor: p.colors.f})
        }else{
            Element.a(navbar, 'Account', '#', 'click', e => this.accountPage(this.main), {backgroundColor: p.colors.f})
            Element.a(navbar, 'Leave', '#', 'click', e => this.logout(e), {backgroundColor: p.colors.f})
        }
    }

    homePage(parent){
        parent.innerHTML = ''
        const section = Element.section(parent, null)
        Element.h2(section, 'The Machine', {fontSize: '2rem'})
    }

    accountPage(parent){
        parent.innerHTML = ''
        const section = Element.section(parent, null)
        const form = Element.form(section, {height: 'auto'})
        const name = Element.input(form, `Username: ${this.user.name}`, 'text', true, {borderTopRightRadius: '5px', borderTopLeftRadius: '5px', opacity: '0.9', color: 'black'})
        const email = Element.input(form, `Email: ${this.user.email}`, 'email', true, {borderTop: '0', borderBottom: '0', opacity: '0.9', color: 'black'})
        const role = Element.input(form, `Role: ${this.user.role}`, 'text', true, {borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px', opacity: '0.9', color: 'black'})
        const div = Element.div(form, null, null, {height: 'auto', display: 'flex', alignItems: 'end'})
        Element.button(div, 'Update', 'click', () => {
            console.log(this.user)
        }, {flex: '1', borderTopRightRadius: '0', borderTopLeftRadius: '0', margin: '0 auto'})
        Element.button(div, 'Change Pass', 'click', () => {
            console.log(name.ariaPlaceholder, email.ariaPlaceholder, role.placeholder)
        }, {flex: '1', borderTopRightRadius: '0', borderTopLeftRadius: '0'})
        Element.button(div, 'Logout', 'click', () => {
            console.log(name.ariaPlaceholder, email.ariaPlaceholder, role.placeholder)
        }, {flex: '1', borderTopRightRadius: '0', borderTopLeftRadius: '0'})
    }

    loginPage(parent){
        parent.innerHTML = ''
        const section = Element.section(parent, null)
        // Element.h2(section, 'Login', null ) //{width: 'auto', color: 'white', margin: '0', fontSize: '3rem'})
        const form = Element.form(section, null)

        const email = Element.input(form, 'Enter email', 'email', false, {borderTopRightRadius: '5px', borderTopLeftRadius: '5px'})
        const password = Element.input(form, 'Enter password', 'password', false, {borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px'})

        const div = Element.div(form, null, null, {display: 'flex', flexDirection: 'column', alignItems: 'center'})
        Element.button(div, 'Login', 'click', async e => {
            const result = await login(email.value, password.value)
            console.log('Result', result)
            this.popupMsg(result)
        
        }, {borderTopRightRadius: '0', borderTopLeftRadius: '0', borderTop: '0'})
        Element.a(div, 'or signup here.', '#', 'click', e => this.signupPage(this.main), {fontSize: p.size.font.e} )
        // Element.a(div, 'lost password', '#', 'click', e => this.lostPassword(this.main), null )
    }

    logout(e){
        e.preventDefault()
        localStorage.removeItem('token')
        location.reload()

    }

    popupMsg(head, msg, color){
        const div = Element.div(this.body, 'click', e => {
            location.reload()
        }, {position: 'absolute', zIndex: '10', width: '100vw', height: '100vh', backgroundColor: color, opacity: '0.5', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'})
        const msgDiv = Element.div(div, 'click', e => {
            location.reload()
        }, {})
        Element.h2(msgDiv, head, {fontSize: p.size.font.b, zIndex: '1'})
        Element.p(msgDiv, msg, {zIndex: '1'})
    }

    lostPassword(parent){
        parent.innerHTML = ''
        const section = Element.section(parent, null)
        const form = Element.form(section, null)
        const email = Element.input(form, 'Enter email', 'email', false, null)
        const token = Element.button(form, 'Reset', 'click', async e => {
           const token = await retrievePassword(email.value)
        }, null)
    }

    signupPage(parent){
        parent.innerHTML = ''
        const section = Element.section(parent, null)
        Element.h2(section, 'Signup', null )
        const form = Element.form(section, null)

        const name = Element.input(form, 'Enter name', 'text', false, {borderTopRightRadius: '5px', borderTopLeftRadius: '5px'})
        const email = Element.input(form, 'Enter email', 'email', false, {borderTop: '0', borderBottom: '0'})
        const password = Element.input(form, 'Enter password', 'password', false, {borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px'})
        Element.button(form, 'Sign Up', 'click', async e => {
            const result = await register(name.value, email.value, password.value, 'user')
            if(result.data) location.reload()
            else this.errorMsg(result)
            
        }, {borderTopRightRadius: '0', borderTopLeftRadius: '0', borderTop: '0'})
        Element.a(form, 'or login here', '#', 'click', e => this.loginPage(this.main), null )
    }

}