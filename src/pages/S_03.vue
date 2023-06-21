<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Base } from '../threejs/base';
import * as THREE from 'three';

class Demo extends Base {

  m: any;
  controls = { color: 0xff0000, value: 0.5 };

  initGui() {
    const g = this.gui.addFolder('调整这里试试');
    g.addColor(this.controls, 'color').name('色值');
    g.add(this.controls, 'value', 0, 1, 0.01).name('比例');
    g.open();
  }

  initShader() {
    const g = new THREE.PlaneGeometry(100, 100);
    const m = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(this.controls.color) },
        uValue: { value: this.controls.value },
        uTexture: { value: new THREE.TextureLoader().load('./texture.jpg') }
      },
      vertexShader: `
        varying vec2 vUV;

        void main() {
          vUV = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uValue;
        uniform sampler2D uTexture;
        varying vec2 vUV;
        
        void main() {
          gl_FragColor = vUV.t > uValue ? texture2D(uTexture, vUV) : vec4(uColor, 1.);
        }`
    });
    const plane = new THREE.Mesh(g, m);
    this.scene.add(plane);
    this.m = m;
  }

  renderContent() {
    this.m.uniforms.uColor.value = new THREE.Color(this.controls.color);
    this.m.uniforms.uValue.value = this.controls.value;
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
本示例主要学习了如何将图片作为纹理传递到着色器中。示例主要代码如下：
\`\`\`
const m = new THREE.ShaderMaterial({
  uniforms: {
    uColor: { value: new THREE.Color(0xff0000) },
    uValue: { value: 0.5 },
    uTexture: { value: new THREE.TextureLoader().load('./texture.jpg') }
  },
  vertexShader: \`
    varying vec2 vUV;

    void main() {
      vUV = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }\`,
  fragmentShader: \`
    uniform vec3 uColor;
    uniform float uValue;
    uniform sampler2D uTexture;
    varying vec2 vUV;

    void main() {
      gl_FragColor = vUV.t > uValue ? texture2D(uTexture, vUV) : vec4(uColor, 1.);
    }\`
});
\`\`\`
纹理坐标如下：

<img width="650" alt="" src="./纹理坐标.png">
`;
</script>

<template>
  <div class="shader-box" ref="dom"></div>
  <v-md-preview :text="text"></v-md-preview>
</template>

<style scoped></style>
