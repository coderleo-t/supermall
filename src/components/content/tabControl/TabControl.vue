<!--2020年4月9日17:52:51：
功能：封装一个项目整体分类功能，点击文字下方会出现红色边框
实现：利用props接收在其他地方用此组件传递过来的值，并利用v-for进行展示文字，
      并利用判断索引值进行类的切换
-->

<style>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: #eee;

    /*如果位置要小于顶部44px则永远在44的位置，也就是顶部导航栏的下面*/
    position: sticky;
    top: 44px;
    

    /*line-height和font-size都可以被子标签继承所以可以写在父标签上*/ 
    line-height: 40px;
    font-size: 14px;
  }
  .tab-control-item {
    flex: 1;
    height: 40px;
  }
  .active {
    color: red;
    
  }
  .active span {
    padding: 8px;
    border-bottom: red 2px solid;
  }
</style>
<template>
  <div>
    <div class="tab-control">
      <div :key="index" v-for="(item, index) in titles" class="tab-control-item" 
      :class="{active:currentIndex === index}" @click="toggleClass(index)">
        <span :class="{active:currentIndex === index}">{{item}}</span>
      </div>
    </div>
    <child-control :categoryImage = 'image'/>
  </div>
</template>
<script>
import ChildControl from './ChildControl'
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    image: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toggleClass(index) {
      this.currentIndex = index
      this.$emit('toggleGoods',index)
    }
  },
  components: {
    ChildControl
  }
}
</script>
