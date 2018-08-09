<template>
  <el-card
    class="post-card"
  >
    <div
      slot="header"
      class="header"
    >
      <h1>{{ post.title }}</h1>
      <div class="metadata">
        <span class="time"><i class="el-icon-date" /> {{ post.created_at | formatDate }}</span>
        <span class="time">by {{ post.author.name }}</span>
      </div>
    </div>
    <el-row
      :gutter="16"
      class="body"
    >
      <el-col
        :span="8"
        class="imageCover"
      >
        <img :src="post.image_url">
      </el-col>
      <el-col :span="16">
        <vue-markdown :source="displayContent()" />
      </el-col>
    </el-row>
    <el-row
      v-if="hasMore"
      :gutter="16"
      type="flex"
      justify="center"
    >
      <el-button @click="toggleReadMore">{{ readMore ? 'Read less' : 'Read more' }}</el-button>
    </el-row>
  </el-card>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'PostCard',
  components: {
    'vue-markdown': VueMarkdown,
  },
  props: {
    post: Object,
  },
  data() {
    // split content in markdown paragraph
    const contentPieces = this.post.content.split(/(.+)\n(=+)/);
    const hasMore = contentPieces.length > 4;
    return {
      hasMore,
      readMore: false,
      displayContent: () => {
        // display full content or first paragraph
        return this.readMore ? this.post.content : contentPieces.slice(0,4).join('\n');
      },
    };
  },
  methods: {
    toggleReadMore() {
      this.readMore = !this.readMore;
    },
  },
};
</script>

<style scoped lang="less">
.post-card{
  margin-bottom: 30px;

  .body{
      font-size: 14px;
      .imageCover{
        img {
          width: 100%;
        }
      }
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
