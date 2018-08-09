<template>
  <div class="post-form">
    <el-row>
      <PostForm :post="postData" v-on:submit="handleSubmit"/>
    </el-row>
  </div>
</template>

<script>
import { state } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import PostForm from '@/components/Admin/PostForm.vue';
import * as types from '@/store/mutation-types';

export default {
  name: 'post-form',
  components: {
    PostForm,
  },
  methods: {
    handleSubmit(params){
      this.$store.dispatch('post/savePost', params).then(() => {
        this.$message.success({
          message: `Post ${params._id ? 'updated': 'created'} successfully.`,
          center: true,
        });
      });
    },
    async fetchPost(postId) {
      if (postId) {
        try{
          await this.$store.dispatch('post/fetchPost', postId);
        } catch(e) {
          // display user message and redirect if post doesnt exist
          this.$message.error({
            message: 'This post doesn\'t exist anymore.',
            center: true,
            onClose: () => this.$router.push('/admin/posts'),
          });
        }
      } else {
        this.$store.commit(`post/${types.SET_POST}`, {});
      }
    }
  },
  data(){
    return {
      postData: {},
    }
  },
  watch: {
    // watch for post data changes to update form
    '$store.state.post.current': function (newData) {
      const { _id, title, content } = newData;
      this.postData = { _id, title, content };
    },
    // watch for postId changes in the url and refetch post data.
    '$route.params.postId': function (postId) {
      this.fetchPost(postId);
    },
  },
  created() {
    // fetch post data by id after refresh page (created)
    const { postId } = this.$route.params;
    this.fetchPost(postId);
  },
};
</script>

<style scoped lang="less">
.post-form {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
