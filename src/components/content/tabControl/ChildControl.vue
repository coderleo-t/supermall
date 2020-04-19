<!--
  作用：封装了一个商品的容器用于展示商品
-->

<style>
  .frameImage {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .frameImage img {
    width: 150px;
    margin-bottom: 10px;
    background: red;
    border: 2px solid;
    border-radius: 10px 10px;
  }
  .describe {
    margin-left:53px;
  }
</style>
<template>
  <div class="frameImage">
    <div v-for="(item,index) in categoryImage" :key="index">
      <a href="javascript:"><img :src="item.http" alt=""></a>
      <div class="describe">￥99</div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    categoryImage: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
