<script setup lang="ts">
import { ref } from 'vue';
import { Demos } from './demos'

const searchValue = ref('')

const handleSearch = () => {

}
</script>

<template>
  <div class="header">
    <div>
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      <span class="title">Shader</span>
    </div>
    <el-input v-model="searchValue" class="search" size="small" placeholder="搜索" @keyup.enter="handleSearch()" />
  </div>
  <div class="main">
    <div class="sidebar">
      <el-menu>
        <el-menu-item v-for="item in Demos" :index="item.path">
          <router-link :to="item.path">{{ item.label }}</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #d6d6d6;
  padding: 0 40px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search {
  width: 200px;
}

.logo {
  height: 25px;
}

.title {
  font-weight: bold;
  margin-left: 10px;
  font-size: 20px;
}

.main {
  position: relative;
  padding-top: 50px;
  height: 100%;
}

.sidebar {
  position: fixed;
  z-index: 10;
  top: 50px;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #d6d6d6;
  width: 260px;
  padding-top: 10px;
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  padding: 0 !important;
  margin-top: 1px;
}

a {
  display: block;
  width: 100%;
  padding: 0 var(--el-menu-base-level-padding);
  text-decoration: none;
  color: var(--el-menu-text-color);
}

a.router-link-active {
  color: var(--el-menu-active-color);
  background-color: var(--el-menu-hover-bg-color);
}

.content {
  position: relative;
  margin-left: 260px;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
  color: var(--el-text-color-primary);
}
</style>
