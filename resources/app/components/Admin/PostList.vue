<template>
  <el-table
    :data="posts"
    style="width: 100%"
  >
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      sortable
      label="Created at"
      prop="created_at"
      width="180"
      :formatter="formatDate"
    >
    </el-table-column>
    <el-table-column
      label="Author"
      prop="author.name"
      width="180">
    </el-table-column>
    <el-table-column
      label="Title"
      prop="title">
    </el-table-column>
    <el-table-column label="Actions" fixed="right" width="180">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row._id)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import moment from 'moment';

export default {
  components: {
    'vue-markdown': VueMarkdown,
  },
  name: 'PostList',
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
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
