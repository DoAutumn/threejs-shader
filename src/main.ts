import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupRouter } from './router'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

VMdPreview.use(githubTheme, {
  Prism,
})

const app = createApp(App).use(VMdPreview)

setupRouter(app)

app.mount('#app')