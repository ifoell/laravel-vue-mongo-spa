<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item v-if="!user" index="/login" class="right">
      Login
    </el-menu-item>
    <el-submenu index="/admin/posts" v-if="user">
      <template slot="title":router="true">Posts</template>
      <el-menu-item index="/admin/posts">List</el-menu-item>
      <el-menu-item index="/admin/posts/new">Create</el-menu-item>
    </el-submenu>
    <span v-if="user">
      <el-menu-item index="logout" @click="logout" class="right">
        Logout
      </el-menu-item>
      <el-menu-item disabled index="#" class="right">
        Hi {{user.name}}
      </el-menu-item>
    </span>
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
