interface IAxiosConfig {
    url?: string;
    method?: string;
    headers?: { [key: string]: string };
    data?: { [key: string]: any };
    auth?: string
  }

class AxiosConfig implements IAxiosConfig {
    url: string;
    method: string;
    headers: { [key: string]: string };
    data: { [key: string]: any };
    auth?: string;

    constructor({ url, method, headers, data, auth }: IAxiosConfig) {
        this.url = url || 'http://127.0.0.1:5001/api/v2';
        this.method = method || 'GET';
        this.headers = headers || { 'Content-Type': 'application/json', Authorization: auth || 'Bearer <KEY>' };
        this.data = data || { message: "no data" };
    }
    static blockchain() { return new this({url: this.url + '/blockchain'}) }
    }

