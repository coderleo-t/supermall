<!--
  功能：封装了一个插槽，可以作为轮播图的子项目，向里面插入图片
  实现：定义了一个插槽
-->
<style>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }
  .slide img {
    width: 100%;
  }
</style>
<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'Slide'
}
</script>
