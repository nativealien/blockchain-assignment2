
class Style {
    constructor(element, style, event, func){
            this.element = element
            this.style = style;
            if(event) this.event = event
            if(func) this.func = func

            this.initStyle()
    }
    initStyle(){
        const values = Object.values(this.style)
        const keys = Object.keys(this.style)

        let text = '';
        for(let i = 0; i<values.length; i++)
            if(values[i] !== null) {
                const string = keys[i].replace(/([A-Z])/g, '-$1').toLowerCase();
                text = `${text} ${string}: ${values[i]}; `
            }
        this.element.style.cssText = text

        if(this.event) {
            this.element.addEventListender(this.event, this.func)
        }
    }
}

export { Style }

