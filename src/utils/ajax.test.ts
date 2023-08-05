import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './ajax.ts';

describe('HTTPTransport test', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    global.XMLHttpRequest = xhr as unknown as typeof XMLHttpRequest;

    xhr.onCreate = (req) => {
      requests.push(req);
    }

    instance = new HTTPTransport('');
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it('Method get() should be called with GET method', () => {
    instance.get('/');

    const [request] = requests;

    expect(request.method).to.equal('GET');
  });

  it('Method post() should be called with POST method', () => {
    instance.post('/');

    const [request] = requests;

    expect(request.method).to.equal('POST');
  });

  it('Method put() should be called with PUT method', () => {
    instance.put('/');

    const [request] = requests;

    expect(request.method).to.equal('PUT');
  });

  it('Method post() should be called with right data', () => {
    const data = { name: 'xxx' }
    
    instance.post('/', { data });

    const [request] = requests;

    expect(request.requestBody).to.equal(JSON.stringify(data));
  });

  it('Method get should be called with url params', () => {
    
    instance.get('/', { data: { a: 1, b: 2 } });

    const [request] = requests;

    expect(request.url).to.include('?a=1&b=2');
  });
  
});
