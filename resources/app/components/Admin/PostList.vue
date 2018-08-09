<template>
  <el-table
    :data="posts"
    style="width: 100%"
  >
    <el-table-column type="index" />
    <el-table-column
      sortable
      label="Created at"
      prop="created_at"
      width="180"
      :formatter="formatDate"
     />
    <el-table-column
      label="Author"
      prop="author.name"
      width="180" />
    <el-table-column
      label="Title"
      prop="title"/>
    <el-table-column
      label="Actions"
      fixed="right"
      width="180"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row._id)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import moment from 'moment';

export default {
  name: 'PostList',
  components: {
    'vue-markdown': VueMarkdown,
  },
  props: {
    posts: Array,
  },
  methods: {
    formatDate(row){
      return moment(String(row.created_at)).format('DD/MM/YYYY hh:mm')
    },
    handleEdit(postId) {
      this.$router.push(`/admin/posts/${postId}`);
    },
    handleDelete(postId) {
      this.$confirm('Are you sure you want to delete this post?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('post/deletePost', postId).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        });
      }).catch(() => {});
    }
  }
};
</script>
