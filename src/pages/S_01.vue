<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Base } from '../threejs/base';
import * as THREE from 'three';

class Demo extends Base {

  m: any;
  controls = { color: 0xff0000 };

  initGui() {
    const g = this.gui.addFolder('调整这里试试');
    g.addColor(this.controls, 'color').name('色值');
    g.open();
  }

  initShader() {
    const g = new THREE.PlaneGeometry(100, 100);
    const m = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(this.controls.color) }
      },
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        
        void main() {
          gl_FragColor = vec4(uColor, 1.0);
        }`
    });
    const plane = new THREE.Mesh(g, m);
    this.scene.add(plane);
    this.m = m;
  }

  renderContent() {
    this.m.uniforms.uColor.value = new THREE.Color(this.controls.color);
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
本示例主要学习了通过 uniforms 向着色器传递数据。示例主要代码如下：
\`\`\`
const m = new THREE.ShaderMaterial({
  uniforms: {
    uColor: { value: new THREE.Color(0xff0000) }
  },
  vertexShader: \`
    void main() {
      
      // position 是顶点的local坐标(Model坐标)
      // Model坐标 * ModelMatrix = World坐标；World坐标 * ViewMatrix = Camera坐标；Camera坐标 * ProjectionMatrix = 投影坐标

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }\`,
  fragmentShader: \`
    uniform vec3 uColor;  // 接收 uniforms 传过来的数据
    
    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }\`
});
\`\`\`
`;
</script>

<template>
  <div class="shader-box" ref="dom"></div>
  <v-md-preview :text="text"></v-md-preview>
</template>

<style scoped></style>
