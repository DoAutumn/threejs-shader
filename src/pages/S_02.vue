<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Base } from '../threejs/base';
import * as THREE from 'three';

class Demo extends Base {

  m: any;
  controls = { color1: 0xff0000, color2: 0xffff00 };

  initGui() {
    const g = this.gui.addFolder('调整这里试试');
    g.addColor(this.controls, 'color1').name('第一个色值');
    g.addColor(this.controls, 'color2').name('第二个色值');
    g.open();
  }

  initShader() {
    const g = new THREE.PlaneGeometry(100, 100);
    const m = new THREE.ShaderMaterial({
      uniforms: {
        uColor1: { value: new THREE.Color(this.controls.color1) },
        uColor2: { value: new THREE.Color(this.controls.color2) },
      },
      vertexShader: `
        varying vec3 vPosition;

        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vPosition;

        void main() {
          gl_FragColor = vec4(vPosition.y > 0.0 ? uColor1 : uColor2, 1.0);
        }`
    });
    const plane = new THREE.Mesh(g, m);
    this.scene.add(plane);
    this.m = m;
  }

  renderContent() {
    this.m.uniforms.uColor1.value = new THREE.Color(this.controls.color1);
    this.m.uniforms.uColor2.value = new THREE.Color(this.controls.color2);
  }
}

let ins: any;
const dom = ref();

onMounted(() => {
  ins = new Demo().init(dom.value);
});
onUnmounted(() => {
  ins.dispose();
});

const text = `
本示例主要学习了通过 varying 变量，可以把顶点着色器的数据传递到片元着色器之中。示例主要代码如下：
\`\`\`
const m = new THREE.ShaderMaterial({
  uniforms: {
    uColor1: { value: new THREE.Color(0xff0000) },
    uColor2: { value: new THREE.Color(0xffff00) },
  },
  vertexShader: \`
    varying vec3 vPosition;

    void main() {
      vPosition = position;  // 赋值给 varying 变量
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }\`,
  fragmentShader: \`
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec3 vPosition;  // 同样用 varying 变量接收数据

    void main() {
      gl_FragColor = vec4(vPosition.y > 0.0 ? uColor1 : uColor2, 1.0);
    }\`
});
\`\`\`
Model坐标如下：
`;
</script>

<template>
  <div class="shader-box" ref="dom"></div>
  <v-md-preview :text="text"></v-md-preview>
  <div class="zuobiao">
    <span>(0.0,0.0)</span>
    <span>(-0.5,0.5)</span>
    <span>(0.5,0.5)</span>
    <span>(-0.5,-0.5)</span>
    <span>(0.5,-0.5)</span>
  </div>
</template>

<style scoped>
.zuobiao {
  position: relative;
  top: -30px;
  left: 84px;
  width: 200px;
  height: 200px;
  border: solid 1px #a8a8a8;
  font-size: 12px;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);
}
.zuobiao span {
  position: absolute;
}
.zuobiao span:nth-child(1) {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.zuobiao span:nth-child(2) {
  left: -55px;
  top: -3px;
}
.zuobiao span:nth-child(3) {
  right: -48px;
  top: -3px;
}
.zuobiao span:nth-child(4) {
  left: -62px;
  bottom: -3px;
}
.zuobiao span:nth-child(5) {
  right: -55px;
  bottom: -3px;
}
</style>
