<template>
  <div class="post-card-container">
    <el-card class="post-card" v-for="post in posts" :key="post._id" >
      <div slot="header" class="header">
        <h1>{{post.title}}</h1>
        <div class="metadata">
          <span class="time"><i class="el-icon-date"></i> {{post.created_at | formatDate}}</span>
          <span class="time">by {{post.author.name}}</span>
        </div>
      </div>
      <div class="body">
        <vue-markdown>{{post.content}}</vue-markdown>
      </div>
    </el-card>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  components: {
    'vue-markdown': VueMarkdown,
  },
  name: 'PostList',
  props: {
    posts: Array,
  },
};
</script>

<style scoped lang="less">
.post-card{
  margin-bottom: 30px;

  .body{
      font-size: 14px;
  }
  .header{
    h1 {
      font-size: 18px;
    }
    .metadata {
      width: 100%;
    }
  }
}
</style>
