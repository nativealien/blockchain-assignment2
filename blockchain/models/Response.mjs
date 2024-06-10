
export default class Response{
    constructor({statusCode = 200, message = null, data = null, error = null}){
        this.success = statusCode > 100 && statusCode < 300
        this.statusCode = statusCode

        if(message !== null) this.message = message;
        if(data !== null) this.data = data;
        if(error !== null) this.error = error;
    }
    static get(message, data){
        return new this({statusCode: 200, message: message, data: data})
    }
    static post(message, data){
        return new this({statusCode: 201, message: message, data: data})
    }
    static error(code, message, error){
        return new this({statusCode: code, message: message, error: error})
    }
}

