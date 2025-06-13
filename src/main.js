import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import jsonViewer from 'vue-json-viewer'
createApp(App).use(ElementPlus).use(jsonViewer).mount('#app')
