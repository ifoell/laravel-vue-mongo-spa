<template>
  <el-form ref="loginForm" :model="form" :rules="rules">
    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="Email"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="Password"></el-input>
    </el-form-item>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="login">Login</el-button>
    </el-row >
  </el-form>
</template>

<script>
import report from '@/utils/errorReport';
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Invalid email', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async login() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return;

        this.$store.dispatch('auth/login', this.form).then(() => {
          this.$router.push({ name: 'dashboard' });
        }).catch((err) => {
          const { data } = err.response || {};
          if (data.errors && data.errors.email) {
            this.$refs.loginForm.clearValidate(['email', 'password']);
            this.$message.error({
              message: data.errors.email[0],
              center: true,
            });
          } else {
            report(err);
          }
        });
      });
    },
  },
};
</script>
