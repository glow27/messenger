import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<body></body>', {
  url: 'http://localhost:5173'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

// require.extensions['.scss'] = function () {
//   module.exports = () => ({});
// }
