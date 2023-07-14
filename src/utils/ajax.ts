const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

type MethodsType = keyof typeof METHODS

interface RequestOptions {
  timeout?: number,
  data?: Record<string, unknown> | FormData,
  headers?: Record<string, string>,
  isAvatar?: boolean
}

interface OptionsWithMethod extends RequestOptions {
  method: MethodsType[number]
}

type HTTPMethod<T = unknown> = (url: string, options?: RequestOptions) => Promise<T>
type XHRSendBody = Document | XMLHttpRequestBodyInit | null | undefined

function queryStringify(data: Record<string, unknown>) {
  const keys = Object.keys(data);

  if (!keys.length) return;

  let params = '?';

  for (let i = 0; i < keys.length; i++) {
    params += `${keys[i]}=${data[keys[i]]}`;
    if (i < keys.length - 1) params += '&';
  }

  return params;
}

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get: HTTPMethod = (url, options) => {
    return this.request(
      this.endpoint + url,
      { ...options, method: METHODS.GET }
    );
  };

  post: HTTPMethod  = (url, options) => {
    return this.request(
      this.endpoint + url,
      { ...options, method: METHODS.POST }
    );
  };

  put: HTTPMethod  = (url, options) => {
    return this.request(
      this.endpoint + url,
      { ...options, method: METHODS.PUT }
    );
  };

  delete: HTTPMethod  = (url, options) => {
    return this.request(
      this.endpoint + url,
      { ...options, method: METHODS.DELETE }
    );
  };

  request = (url: string, options: OptionsWithMethod) => {
    const { method, data, headers, timeout = 5000, isAvatar } = options;

    if (method === METHODS.GET && data && !(data instanceof FormData)) {
      url += queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
       
          resolve({data: xhr.response, status: xhr.status});
      
        }
      };

      if (headers) {
        for (const key in headers) {
          xhr.setRequestHeader(key.toString(), headers[key].toString());
        }
      }

      if (!isAvatar) xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isAvatar && data) {
        xhr.send(data as unknown as XHRSendBody)
      } else if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
