<!--
  功能：封装了home主页前面的轮播图，隔段时间图片会轮流切换且下方图片导航圆点颜色位置会
        随图片变化而变化。拖动图片位置图片也会移动，达到图片整体宽度的一定比例则图片也
        会切换。并预留了几个插槽，方便其它组件调用插入图片
  实现：用props保存可能需要用户传入的：轮播的时间间隔、每段时间间隔动画持续的时间、用户滑
        动图片占一个图片的整体宽度的比例、是否显示图片下方图片导航圆球，并设置用户不传入的
        默认值。再用data保存可能此组件中可能每个地方都需要用的图片个数、整体图片的宽度、包含了
        整个图片滑动框的样式、当前所展示图片的索引、用户是否在手动滑动轮播图。
        先利用超时器在组件挂载运行200ms时调用封装好的初始函数handleDom，后执行定时器切换等操作
-->

<style>
  #hy-swiper {
    overflow: hidden;
    position:relative;
  }
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }
  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;

  }

  .indi-item.active {
    background-color: rgba(212, 62, 46, 1.0);
  }
</style>
<template>
  <div id="hy-swiper">

    <div class="swiper" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
      <slot></slot>
    </div>

    <slot name="indicator"></slot>

    <div class="indicator">
      <slot name="indicator" v-if='showIndicator && slideCount>1'>
        <div v-for="(item, index) in slideCount" class="indi-item" :class='{active:index === currentIndex-1}' :key='index'>
        </div>
      </slot>
    </div>

  </div>
</template>
<script>
export default {
  name : 'Swiper',
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //swipe的宽度
      swiperStyle: {}, //swiper的样式
      currentIndex: 1, //当前的index
      scrolling: false //是否正在滚动
    }
  },
  mounted() {
    // 操作DOM，在前后添加slide
    setTimeout(() => {   
      this.handleDom()

      // 开启定时器
      this.startTimer()
    },200)
  },
  methods: {
    // 定时器操作
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, this.interval)
    },
    stopTimer() {
      window.clearInterval(this.playTimer)
    },

    // 滚动到正确的位置
    scrollContent(currentPosition) {
      // 设置正在滚动
      this.scrolling = true

      // 开始滚动动画
      this.swiperStyle.transition = 'transform' + this.animDuration +'ms'
      this.setTransform(currentPosition)

      // 判断滚动的位置
      this.checkPosition()

      // 滚动完成
      this.scrolling = false
    },

    // 校验正确的位置
    checkPosition() {
      window.setTimeout(() => {

        // 校验正确的位置
        this.swiperStyle.transition = '0ms'
        if (this.currentIndex >= this.slideCount +1) {
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        } else if(this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }

        // 结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex-1)
      }, this.animDuration)
    },

    // 设置滚动的位置
    setTransform(position) {
      // ``为模板字符串的用法，里面的${position}会将position解析而不是当做字符串
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`

      // 兼容chrome浏览器
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px, 0, 0)`

      // 兼容ie浏览器
      this.swiperStyle['-ms-transform']= `translate3d(${position}px, 0, 0)`
    },
    
    // 操作dom，在dom前后添加slide
    handleDom() {
      // 获取要操作的元素
      let swiperEl = document.querySelector('.swiper')
      let slidesEls = swiperEl.getElementsByClassName('slide')

      // 保存个数
      this.slideCount = slidesEls.length

      // 如果大于1个，那么在前后分别添加一个slide
      if(this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, slidesEls[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        
        this.swiperStyle = swiperEl.style
      }

      // 让swiper元素，显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth)
    },

    // 拖动事件的处理
    touchStart(e) {
      // 如果正在滚动不可以拖动
      if (this.scrolling) return;

      // 停止定时器
      this.stopTimer()

      // 保存开始滚动的位置
      this.startX = e.touches[0].pageX
    },

    touchMove(e) {
      // 计算出用户拖动的距离
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      let currentPosition = -this.currentIndex * this.totalWidth
      let moveDistance = this.distance + currentPosition

      // 设置当前的位置
      this.setTransform(moveDistance)
    },

    touchEnd(e) {
      // 获取移动的距离,math.abs返回绝对值
      let currentMove = Math.abs(this.distance)

      // 判断最终的距离
      if (this.distance === 0) {
        return 
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio){
        // 右边移动超过0.25
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        // 向左边移动超过0.25
        this.currentIndex++
      }

      // 移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth)

      // 移动完成后重新开启定时器
      this.startTimer()
    },

    // 控制上一个，下一个,下面方法目前没有用到
    previous() {
      this.changeItem(-1)
    },

    next() {
      this.changeItem(1)
    },

    changeItem(num) {
      // 移除定时器
      this.stopTimer()

      // 修改index和位置
      this.currentIndex += num
      this.scrollContent(-this.currentIndex * this.totalWidth)

      // 添加定时器
      this.startTimer()
    }
 
  }//methods

}
</script>
