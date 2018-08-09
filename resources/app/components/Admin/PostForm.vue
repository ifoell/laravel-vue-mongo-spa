<template>
  <el-form :model="post" :rules="rules" ref="postForm" label-width="120px">
    <el-form-item label="Title" prop="title">
      <el-input v-model="post.title" placeholder="Title"></el-input>
    </el-form-item>
    <el-form-item label="Content" prop="content">
      <el-input
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 40}"
        placeholder="Content"
        v-model="post.content"
        >
      </el-input>
    </el-form-item>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="handleSubmit">Save</el-button>
    </el-row >
  </el-form>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { mapFields } from 'vuex-map-fields';
import * as types from '@/store/mutation-types';

export default {
  data() {
    return {
      preview: false,
      rules: {
        title: [
          { required: true, message: 'Every brilliant idea has a title, please enter yours.', trigger: 'blur' },
        ],
        content: [
          { required: true, message: 'Please enter the post content', trigger: 'blur' },
          { min: 10, message: 'Go one, write something awesome containing at least 10 characters long.', trigger: 'blur' }
        ],
      },
    };
  },
  props: {
    post: Object,
  },
  methods: {
    handleSubmit() {
      // validate form and delegate action to parent page
      this.$refs.postForm.validate((valid) => {
        if (!valid) return;
        this.$emit('submit', this.post);
      });
    },
  },
  components: {
    'vue-markdown': VueMarkdown,
  },
  name: 'PostForm',
};
</script>
