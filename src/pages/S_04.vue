<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Base } from '../threejs/base';
import * as THREE from 'three';

class Demo extends Base {

  m: any;
  controls = { color: 0xff0000, radius: 0 };

  initGui() {
    const g = this.gui.addFolder('调整这里试试');
    g.addColor(this.controls, 'color').name('色值');
    g.open();
  }

  initShader() {
    const g = new THREE.PlaneGeometry(100, 100);
    const m = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(this.controls.color) },
        uTexture: { value: new THREE.TextureLoader().load('./texture.jpg') },
        uRadius: { value: this.controls.radius }
      },
      vertexShader: `
        varying vec2 vUV;

        void main() {
          vUV = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        uniform sampler2D uTexture;
        uniform float uRadius;
        varying vec2 vUV;
        
        void main() {
          vec4 color = texture2D(uTexture, vUV);

          // 计算每一个顶点到中心位置的距离
          float len = distance(vec2(0.5, 0.5), vUV);
          
          gl_FragColor = len < uRadius ? color : vec4(uColor, 1.);
        }`
    });
    const plane = new THREE.Mesh(g, m);
    this.scene.add(plane);
    this.m = m;
  }

  renderContent() {
    this.m.uniforms.uColor.value = new THREE.Color(this.controls.color);
    this.m.uniforms.uRadius.value = Math.abs(Math.sin(this.controls.radius)) * 0.5;
    this.controls.radius += 0.025;
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
本示例主要学习了如何在 shader 中实现简单动画。示例主要代码如下：
\`\`\`
let radius = 0;

const m = new THREE.ShaderMaterial({
  uniforms: {
    uColor: { value: new THREE.Color(0xff0000) },
    uTexture: { value: new THREE.TextureLoader().load('./texture.jpg') },
    uRadius: { value: radius }
  },
  vertexShader: \`
    varying vec2 vUV;

    void main() {
      vUV = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }\`,
  fragmentShader: \`
    uniform vec3 uColor;
    uniform sampler2D uTexture;
    uniform float uRadius;
    varying vec2 vUV;
    
    void main() {
      vec4 color = texture2D(uTexture, vUV);

      // 计算每一个顶点到中心位置的距离
      float len = distance(vec2(0.5, 0.5), vUV);
      
      gl_FragColor = len < uRadius ? color : vec4(uColor, 1.);
    }\`
});

// 持续改变 uRadius 值：
render() {
  m.uniforms.uRadius.value = Math.abs(Math.sin(radius)) * 0.5;
  radius += 0.025;
}
\`\`\`
`;
</script>

<template>
  <div class="shader-box" ref="dom"></div>
  <v-md-preview :text="text"></v-md-preview>
</template>

<style scoped></style>
