<!--
  功能：封装了两个具名插槽，分别插入图片和文本
-->

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  /* 如果插槽里面刚好有这个标签则作用 */
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .router-link-active {
     color:rgb(230, 22, 22);
     text-decoration:overline;
  }
</style>
<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot name='item-icon'></slot>
    <slot name='item-text'></slot>
  </div>
</template>
<script>
export default {
  props : {
    // 接收传过来的值
    path : String
  },
  methods : {
    itemClick () {
      // 如果连续点击同一个会抛出异常，这是改变组件的方法之一
      // this.$router.replace(this.path).catch(err =>{})
      // console.log(this.$route)
    }
  }
}
</script>
