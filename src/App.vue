<template>
  <div id="nav">
    <router-link to="/">抽卡</router-link> |
    <router-link to="/all-card">所有卡片</router-link>
  </div>
  <Suspense>
    <template #default>
      <Main />
    </template>
    <template #fallback>
      <span>載入資料中...</span>
    </template>
  </Suspense>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Main from '@/views/Main.vue';

export default defineComponent({
  components: {
    Main,
  },
});
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.list-item {
  @media (min-width: 568px) {
    &.star-5 .img-outside {
      animation: flashing-goldenrod 2s infinite ease-out;
    }

    &.moon .img-outside {
      animation: flashing-purple 2s infinite ease-out;
    }
  }
}

.img-container {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  width: calc(150px - 0.5rem);
  height: 150px;

  @media (max-width: 1440px) {
    width: 200px;
    height: 200px;
  }
}

.material-icons {
  text-shadow: 1px 0.5px 0 #222;
}
</style>
