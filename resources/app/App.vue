<template>
  <el-container>
    <el-header>
      <TheNavMenu :user="user"></TheNavMenu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import TheNavMenu from '@/components/TheNavMenu.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    TheNavMenu,
  },
  computed: mapState({
    user: state => state.auth.user,
  }),
};
</script>

<style lang="less">
body {
  font-family: Monospaced Number,Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
</style>
