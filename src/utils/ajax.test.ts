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
});
