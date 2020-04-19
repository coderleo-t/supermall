<style>
  .recommends {
    display: flex;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
    text-align: center;
  }
  .recommend-item img{
    width: 80px;
    height: 80px;
    padding: 10px 10px;
  }
  .recommend-item div{
    font-size: 15px;
    margin-bottom: 30px;
   
  }
</style>
<template>
    <div class="recommends">
      <div v-for='(item, index) in recommends' :key='index' class='recommend-item'>
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
