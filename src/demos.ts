import Home from './pages/Home.vue'
import S_01 from './pages/S_01.vue'
import S_02 from './pages/S_02.vue'
import S_03 from './pages/S_03.vue'
import S_04 from './pages/S_04.vue'
import S_05 from './pages/S_05.vue'
import Test from './pages/Test.vue'

export const Demos = [
  {
    label: '开始',
    path: '/',
    component: Home
  },
  {
    label: '第一个示例',
    path: '/01',
    component: S_01
  },
  {
    label: '顶点着色器传值到片元着色器',
    path: '/02',
    component: S_02
  },
  {
    label: '将图片作为纹理传递到着色器',
    path: '/03',
    component: S_03
  },
  {
    label: '简单动画',
    path: '/04',
    component: S_04
  },
  {
    label: '圆形内发光',
    path: '/05',
    component: S_05
  },
  {
    label: '测试',
    path: '/test',
    component: Test
  }
]