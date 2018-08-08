<template>
  <div class="home">
    <el-row>
      <PostList :posts="posts"/>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        layout="prev, pager, next"
        :page-size="perPage"
        @current-change="handlePageChange"
        :current-page.sync="page"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostList from '@/components/PostList.vue';

export default {
  data() {
    return {
      page: 1,
      perPage: 5,
    };
  },
  name: 'home',
  components: {
    PostList,
  },
  computed: mapState({
    posts: state => state.post.list,
    total: state => state.post.total,
  }),
  methods: {
    handlePageChange() {
      const { perPage, page } = this;
      this.$store.dispatch('post/getPosts', { perPage, page });
    },
  },
  created() {
    this.handlePageChange();
  },
};
</script>

<style scoped lang="less">
.home {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
