<style scoped>

</style>
<template>
    <div class="wrapper" ref='wrapper'>
      <div>
        <slot></slot>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll
      
    }
  },
  props: {
    probeType: {
      type:Number,
      default() {
        return 0
      }
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType:this.probeType
    }),

    // 注意如果用鼠标滚轮方式此方法是不会响应的，此事件必须手指拖动测试
    this.scroll.on('scroll', (position) => {
      this.$emit('showBack',position)
    })

    
  },
  methods: {
    backTop(x=0, y=0, time=300) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>
