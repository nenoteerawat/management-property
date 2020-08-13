import NProgress from 'nprogress';
const progressShowDelay = 100;
let routeResolved = false;
/**
 * Initializes NProgress after a specified delay only if the route was not resolved yet.
 */
function tryInitProgress() {
  routeResolved = false;
  setTimeout(()=> {
    if (!routeResolved) {
      NProgress.start();
    }
  }, progressShowDelay);
}
export default function initProgress(router, store) {
  router.beforeEach((to, from, next) => {
    tryInitProgress();
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        return next()
      }
      return next('/login') 
    } else {
      return next() 
    }
  });

  router.afterEach(() => {
    // Complete the animation of the route progress bar.
    routeResolved = true;
    NProgress.done();
  });
}
