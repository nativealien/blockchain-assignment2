
export default class Element{
    constructor({ element='div', id=null, className=null, content=null, placeholder=null, value=null, type=null, href=null, event=null, func=null }){
        this.element = document.createElement(element)
        if(id) this.element.id = id
        if(className) this.element.classList.add(className)
        if(content) this.element.textContent = content
        if(placeholder) this.element.placeholder = placeholder
        if(value) this.element.value = value
        if(type) this.element.type = type
        if(href) this.element.href = href
        if(event) this.element.addEventListener(event, func)
    }
    static section(parent, className){
        const section =  new this({element: 'section', className: className})
        return parent.appendChild(section.element)
    }
    static nav(parent, className){
        const nav =  new this({element: 'nav', className: className})
        return parent.appendChild(nav.element)
    }
    static button(parent, className, text, event, func){
        const button =  new this({element: 'button', className: className, content: text, event: event, func: func })
        return parent.appendChild(button.element)
    }
    static input(parent, className, placeholder, type){
        const input =  new this({element: 'input', className: className, placeholder: placeholder, type: type })
        return parent.appendChild(input.element)
    }
    static form(parent, className){
        const form =  new this({element: 'form', className: className})
        return parent.appendChild(form.element)
    }
    static h1(parent, className, text){
        const h1 =  new this({element: 'h1', className: className, content: text})
        return parent.appendChild(h1.element)
    }
    static h2(parent, className, text){
        const h2 =  new this({element: 'h2', className: className, content: text})
        return parent.appendChild(h2.element)
    }
    static p(parent, className, text){
        const p =  new this({element: 'p', className: className, content: text})
        return parent.appendChild(p.element)
    }
    static a(parent, className, text, href, event, func){
        const a =  new this({element: 'a', className: className, content: text, href: href, event: event, func: func})
        return parent.appendChild(a.element)
    }
}