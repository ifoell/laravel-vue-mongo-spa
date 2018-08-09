<template>
  <div class="post-list-container">
    <el-row class="list">
      <PostList :posts="posts"/>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        :page-size="perPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostList from '@/components/Admin/PostList.vue';

export default {
  data() {
    return {
      page: 1,
      perPage: 20,
    };
  },
  name: 'post-list',
  components: {
    PostList,
  },
  computed: mapState({
    posts: state => state.post.list,
    total: state => state.post.total,
  }),
  methods: {
    handleSizeChange(newSize) {
      this.perPage = newSize;
      this.handlePageChange();
    },
    handlePageChange(abc) {
      console.log(abc);
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
.post-list-container {
  max-width: 1000px;
  margin: 0 auto;
  .list{
    margin-bottom: 60px;
  }
}
</style>
