<!--
  功能：封装了一个插槽
-->

<style scoped>
#tab-bar {
    display: flex;
    background: #f6f6f6;
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: -6px;

    box-shadow: 0px -3px 1px rgba(100, 100, 100, .1);
  }

</style>
<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
   data() {
      return {
      }
   }
}
</script>
