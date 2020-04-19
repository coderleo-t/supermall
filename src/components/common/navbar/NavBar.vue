<!--
  功能：封装了预留三个位置的具名插槽，分别为左边、中间、右边
-->
<style>
  .nav-bar {
    display: flex;
    text-align: center;
    line-height: 44px;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
<template>
   <div class="nav-bar">
     <div class="left"><slot name="left"></slot></div>
     <div class="center"><slot name="center"></slot></div>
     <div class="right"><slot name="right"></slot></div>
   </div>
</template>
<script>
export default {

}
</script>
