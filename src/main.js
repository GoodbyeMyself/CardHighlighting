import "./public-path";

import { createApp } from 'vue';
import App from './App.vue';

import store from './store';

import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

let instance = null;
let router = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function render(props = {}) {
    // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
    router = createRouter({
        routes,
        history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/'),
        base: window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/'
    })
    

    const { container } = props;

    instance = createApp(App);

    // 挂载应用
    instance.use(store).use(router).mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
    console.log("Vue3 MicroApp bootstraped <- 子应用");
}
  
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
    console.log("Vue3 MicroApp mount <- 子应用", props);
    // 动态加载子应用代码
    render(props);
}
  
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    console.log("Vue3 MicroApp unmount <- 子应用");
    instance.unmount();
    instance._container.innerHTML = '';
    instance = null;
    router = null;
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function update(props) {
    console.log('update props', props);
}
