<!-- 
功能：封装了一个整体的项目下方导航栏，点击下方对应的文字或图标会切换对应的主组件，
      这是一个完整的功能，可以直接用
实现：利用已经传过来的封装好的TabBar和TabBarItem组件，向里面插入图片和文字，
      并设置点击它们所跳转的路由
-->

<style>

</style>
<template>
   <tab-bar>
      <!-- 如果本身就传字符串就不需要绑定 -->
      <tab-bar-item path='/home'>
        <template v-slot:item-icon>           <!--加载图片的时候必须写上~号-->
          <router-link to="/home"><img src="~assets/img/tabbar/1.jpg" alt=""></router-link>
        </template>
        <template v-slot:item-text>
          <router-link to="/home" tag="div"><div>首页</div></router-link>
        </template>
      </tab-bar-item>

      <tab-bar-item path='/category'>
        <template v-slot:item-icon>
          <router-link to="/category"><img src="~assets/img/tabbar/1.jpg" alt=""></router-link>
        </template>
        <template v-slot:item-text>
          <router-link to="/category" tag="div"><div>分类</div></router-link>
        </template>
      </tab-bar-item>

      <tab-bar-item path='/cart'>
        <template v-slot:item-icon>
          <router-link to="/cart"><img src="~assets/img/tabbar/1.jpg" alt=""></router-link>
        </template>
        <template v-slot:item-text>
          <router-link to="/cart" tag="div"><div>购物车</div></router-link>
        </template>
      </tab-bar-item>

     
      <tab-bar-item path='/profile'>
        <template v-slot:item-icon>
          <router-link to="/profile"><img src="~assets/img/tabbar/1.jpg" alt=""></router-link>
        </template>
        <template v-slot:item-text>
          <router-link to="/profile" tag="div"><div>我的</div></router-link>
        </template>
      </tab-bar-item>


    </tab-bar>
</template>
<script>
import TabBar from '../../common/tabbar/tabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'
export default {
  components: {
    TabBar,
    TabBarItem
  }
}

</script>
