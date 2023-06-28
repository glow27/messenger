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

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>

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
  get: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET }
    );
  };

  post: HTTPMethod  = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST }
    );
  };

  put: HTTPMethod  = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT }
    );
  };

  delete: HTTPMethod  = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE }
    );
  };

  request = (url: string, options: RequestOptions) => {
    const { method, data, headers, timeout = 5000 } = options;

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
