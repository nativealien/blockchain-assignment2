import { Style } from "./Style.mjs"
import { presets } from "../settings/settings.mjs"

export default class Element{
    constructor({ element='div', parent=null, id=null, textDecoration=null, content=null, placeholder=null, value=null, type=null, href=null, event=null, func=null, disabled=null, style=null }){
        this.element = document.createElement(element)
        this.parent = parent
        if(id) this.element.id = id
        if(content) this.element.textContent = content
        if(placeholder) this.element.placeholder = placeholder
        if(value) this.element.value = value
        if(type) this.element.type = type
        if(href) this.element.href = href
        if(event) this.element.addEventListener(event, func)
        if(disabled) this.element.disabled = disabled
        if(style) this.style = new Style(this.element, style)
        
        this.parent.appendChild(this.element)
    }
    static section(parent, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.section}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.section
        const section =  new this({element: 'section', parent: parent, style: style})
        return section.element
    }
    static nav(parent, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.nav}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.nav
        const nav =  new this({element: 'nav', parent: parent, style: style})
        return nav.element
    }
    static button(parent, text, event, func, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.button}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.button
        const button =  new this({element: 'button', parent: parent, content: text, event: event, func: func, style: style })
        if(event){
            button.element.addEventListener(event, func)
        }
        return button.element
    }
    static form(parent, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.form}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.form
        const form =  new this({element: 'form', parent: parent, style: style})
        return form.element
    }
    static input(parent, placeholder, type, disabled, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.input}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.input
        const input =  new this({element: 'input', parent: parent, placeholder: placeholder, type: type, disabled: disabled, style: style})
        return input.element
    }
    static h1(parent, text, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.h1}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.h1
        const h1 =  new this({element: 'h1', parent: parent, content: text, style: style})
        return h1.element
    }
    static h2(parent, text, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.h2}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.h2
        const h2 =  new this({element: 'h2', parent: parent, content: text, style: style})
        return h2.element
    }
    static p(parent, text, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.p}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.p
        const p =  new this({element: 'p', parent: parent, content: text, style: style})
        return p.element
    }
    static a(parent, text, href, event, func, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.a}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.a
        const a =  new this({element: 'a', parent: parent, content: text, href: href, event: event, func: func, style: style})
        if(event){
            a.element.addEventListener(event, func)
        }
        return a.element
    }
    static div(parent, event, func, style){
        if(style){
            const keys = Object.keys(style)
            const newStyle = {...presets.div}
            keys.forEach( key => {
                newStyle[key] = style[key]
            })
            style = newStyle
        }
        else style = presets.div
        const div = new this({element: 'div', parent: parent, event: event, func: func, style: style})
        return div.element
    }
}