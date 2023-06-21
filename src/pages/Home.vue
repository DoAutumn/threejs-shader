<script setup lang="ts">
const text = `
# 简介
### shader是什么？
shader是一个用GLSL编写的、运行在GPU的小程序，也就是着色器语言，我们可以通过shader来编写顶点着色器和片元着色器。
### shader在three.js中如何使用？
three.js提供了两种shader材质：[RawShaderMaterial](https://threejs.org/docs/index.html?q=raw#api/zh/materials/RawShaderMaterial) 和 [ShaderMaterial](https://threejs.org/docs/index.html?q=shader#api/zh/materials/ShaderMaterial)
- RawShaderMaterial：不内置uniforms和attributes
- ShaderMaterial：内置一些需要的参数

本站所有示例均使用的是ShaderMaterial。

---
在开始之前，掌握[Shader基础知识](https://gitee.com/zDawnING/ThreejsDocs/blob/master/Threejs%20Shader%20%E6%95%99%E7%A8%8B%E8%AE%B2%E8%A7%A3%E6%96%87%E6%A1%A3.md)、[GLSL的基础语法](https://zhuanlan.zhihu.com/p/349296191)是很有必要的。
`;
</script>

<template>
  <v-md-preview :text="text"></v-md-preview>
</template>

<style scoped>
</style>
