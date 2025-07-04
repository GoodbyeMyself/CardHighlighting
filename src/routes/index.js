import HomeView from '../views/HomeView.vue';

const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    name: 'home',
    component: HomeView
}]

export default routes;
