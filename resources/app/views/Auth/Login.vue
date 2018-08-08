<template>
  <el-card class="loginForm">
    <el-row type="flex" justify="center">
      <h1>Login</h1>
    </el-row >
    <TheLoginForm></TheLoginForm>
  </el-card>
</template>
<script>
import TheLoginForm from '@/components/TheLoginForm.vue';

export default {
  name: 'Login',
  components: {
    TheLoginForm,
  },
};
</script>

<style scoped lang="less">
.loginForm {
  max-width: 400px;
  margin: 0 auto;
}
</style>
