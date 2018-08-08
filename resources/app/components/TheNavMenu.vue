<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item v-if="!user" index="/login" class="right">
      Login
    </el-menu-item>
    <el-menu-item v-if="user" index="logout" @click="logout" class="right">
      Logout
    </el-menu-item>
    <el-menu-item v-if="user" disabled index="#" class="right">
      Hi {{user.name}}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: window.location.pathname,
    };
  },
  props: {
    user: Object,
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped lang="less">
.right{
  float: right;
}
</style>
