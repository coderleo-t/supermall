<!--
  功能：封装了home中前部分的分类推荐商品，实现点哪个分类的商品就会跳转到相应的界面
  实现：用data储存图片和文字再利用v-for便利内容，再利用a标签包裹住
-->
<style>
  .feature {
    background-image: url('~assets/img/feature/Feature.gif');
    background-repeat: no-repeat;
    width: 375.2px;
    height: 195.1px;
    display: flex;
    flex-flow:row wrap;
    border-bottom: 10px solid #eee;
    
  }
  .feature-item {
    width: 40px;
    height: 40px;
    margin: 25px 10px;
  }
  .feature-item label {
    font-size: 10px;
    margin-left: 10px;
  }
</style>
<template>
   <div class="feature">
        <div :key='index' v-for="(item, index) in source" class="feature-item">
          <a href="https://www.mogu.com/">
            <img :src="item.image">
            <label>{{item.text}}</label>
          </a>
        </div>
        
   </div>
</template>
<script>
export default {
  // import con1 from "@/assets/img/con01.png";
  data() {
    return {
      source: [
         // 在vue中储存图片要么导入图片，在下面写image: con1，要么这样的方法写
        {'image': require('assets/img/feature/1.jpg'), text:'裤子'},
        {'image': require('assets/img/feature/2.jpg'), text:'上衣'},
        {'image': require('assets/img/feature/3.jpg'), text:'化妆品'},
        {'image': require('assets/img/feature/4.jpg'), text:'卫衣'},
        {'image': require('assets/img/feature/5.jpg'), text:'高跟鞋'},
        {'image': require('assets/img/feature/6.jpg'), text:'背包'},
        {'image': require('assets/img/feature/7.jpg'), text:'衣柜'},
        {'image': require('assets/img/feature/8.jpg'), text:'内衣'},
        {'image': require('assets/img/feature/9.jpg'), text:'休闲衣'},
        {'image': require('assets/img/feature/10.jpg'), text:'连体衣'},
        {'image': require('assets/img/feature/11.jpg'), text:'裙子'},
        {'image': require('assets/img/feature/12.jpg'), text:'男鞋'},
      ]
    }
  }
}
</script>
