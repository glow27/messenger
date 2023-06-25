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
  data?: Record<string, unknown>,
  method: MethodsType[number]
  headers?: Record<string, string>
}

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
  get = (url: string, options: RequestOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: RequestOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: RequestOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: RequestOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options: RequestOptions, timeout = 5000) => {
    const { method, data, headers } = options;

    if (method === METHODS.GET && data) {
      url += queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (headers) {
        for (const key in headers) {
          xhr.setRequestHeader(key.toString(), headers[key].toString());
        }
      }

      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
