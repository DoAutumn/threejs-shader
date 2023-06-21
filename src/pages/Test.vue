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
    this.renderer.setClearColor(0x000000, 1);

    const g = new THREE.PlaneGeometry(100, 100);
    const m = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(this.controls.color) }
      },
      vertexShader: `
        varying vec2 vUV;
        void main() {
          vUV = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec2 vUV;
        
        void main() {
          float len = distance(vUV, vec2(0.5, 0.5));
          float a = 0.;
          if (len < 0.5 && len > 0.45) a = 20.0 * len - 9.;
          gl_FragColor = vec4(uColor, a);
        }`,
        transparent: true
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

const text = ``;
</script>

<template>
  <div class="shader-box" ref="dom"></div>
  <v-md-preview :text="text"></v-md-preview>
</template>

<style scoped></style>
