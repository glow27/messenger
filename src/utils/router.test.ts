import { appRouter } from './router.ts';
import { expect } from 'chai';

describe('Router test', () => {
  it('Should start', () => {
   appRouter.start()

   expect(window.location.pathname).to.equal('/');
  });

  it('Should go to route', async () => {
    appRouter.go('xxx')

    expect(window.location.pathname).to.equal('/xxx');
   });

   it('Should go to a few routes', async () => {
    appRouter.go('xxx')
    appRouter.go('signin')
    appRouter.go('settings')

    expect(window.location.pathname).to.equal('/settings');
   });
  
});
