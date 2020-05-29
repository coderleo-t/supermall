<style scoped>
  .Navcart {
    background-color: var(--color-tint);
    color: white;
  }
</style>
<template>
   <div class="cart">
     <nav-bar class="Navcart">
      <template v-slot:center>
        <div > 购物车</div>
      </template>
     </nav-bar>
   </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name : 'Cart',
  components: {
    NavBar
  }
}
</script>
