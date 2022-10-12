import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPlugin from './piniaPlugin'
import 'uno.css'
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message.css";
import 'animate.css';
import mitt from 'mitt'

declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}



const Mit = mitt()
const pinia = createPinia()

pinia.use(piniaPlugin({ key: 'pinia' }))

const app = createApp(App)
app.config.globalProperties.$Bus = Mit
app.use(pinia).use(router).mount('#app')
