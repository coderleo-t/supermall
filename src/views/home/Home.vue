<!--
  功能：整个home界面组件的集合，当点击首页所展现的内容全部集合在这里
  实现：导入和调用请求所有和home有关的数据，利用数据对封装好的组件进行赋值和使用
-->

<style>
/*表示当前可见窗口的100%*/
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*使顶上的购物街永远在头顶*/
    position: sticky;
    top: 0px;

    /*由于子标签会覆盖在父标签上面，所以加z-index解决，哪个z-index哪个就在上面显示*/
    /*如果其他标签都没有设置z-index则其他标签的z-index默认为零*/
    /*Z-index 仅能在定位元素上奏效*/
    z-index: 1;
  }
  .wrapper {
    height: calc(100% - 93px);
  }

</style>
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <scroll ref='scroll' class="wrapper" :probeType='2' @showBack='showBack'>
      <home-swiper :banners='banners'/>
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control @toggleGoods='toggleImage' :titles='["流行", "新款", "精选","套装"]' :image = 'goods[currentArray]'/>   
    </scroll>
    <back-top v-show="showBackTop" @click.native='backTop(0, 0, 500)'></back-top>
  </div> 
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {getHomeMultidata} from 'network/home.js'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl.vue'
import {getGoods} from 'network/homeGoods.js'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'
// import Swiper from 'components/common/swiper/Swiper.vue'
// import SwiperItem from 'components/common/swiper/SwiperItem.vue'


export default {
  name : 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result:null
      banners: [],
      recommends: [],
      tableName: {
        'news': 'news',
        'hotcake': 'hotcake',
        'coat': 'coat',
        'suit': 'suit'
      },

      // 储存首页下面的商品
      goods: {
        'popular': [],
        'news': [],
        'choiesness': [],
        'totally': []
      },

      // 储存子组件获取父组件goods内容的数组名
      'currentArray':'popular',
      'showBackTop':false
    }
  },
  methods: {
    getHomePicture() {
      getHomeMultidata().then(res => {
        // 因为函数在执行结束就会推出函数栈所以需要找个data保存
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
    },

    getGoodsPicture(tableName, goodsName) {
      // 获取商品信息
        getGoods(tableName).then(res => {

        // 加[]强制说明goodsName是goods里面的属性，就是变量等号后面的常量，如果用.goodsName
        // 那么他不会用变量的goodsName而是向goods里面添加一个属性为goodsName的对象
        // this.goods[goodsName]= res.data 

        // 上面的向数组里面添加元素的方法可以写成,相当于把res.data里面的数据一个个push到里面
        this.goods[goodsName].push(...res.data)
      })
    },

    // 根据切换的TabControl切换图片
    toggleImage(index) {
      switch(index) {
        case 0:
          this.currentArray = 'popular'
          break
        case 1:
          this.currentArray = 'news'
          break
        case 2:
           this.currentArray = 'choiesness'
        break
        case 3:
          this.currentArray = 'totally'
        break
        default:break
      }
    },
    backTop(x, y, time) {
      this.$refs.scroll.backTop(x, y, time)
    },
    showBack(position) {
      if(position.y < -900) {
        this.showBackTop = true
      } else {
        this.showBackTop = false
      }
    }
  },

  // 在数据都创建好的时候发送网络请求
  created() {
    this.getHomePicture()

    // 向数据库中查询商品并添加到数组中
    this.getGoodsPicture(this.tableName.news, 'news')
    this.getGoodsPicture(this.tableName.hotcake, 'popular')
    this.getGoodsPicture(this.tableName.coat, 'choiesness')
    this.getGoodsPicture(this.tableName.suit, 'totally')
  }

}
</script>
