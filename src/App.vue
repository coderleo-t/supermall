<!--
  功能：封装好的将展示项目初始的控制初始路由的组件和路由切换视图
  实现：将封装好的控制整个大项目组件的下方导航列表导入，
        并写上路由所展示的组件展示标签
-->
<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from './components/content/mainTabbar/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import './assets/css/base.css';
</style>
