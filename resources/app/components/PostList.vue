<template>
  <div class="post-card-container">
    <post-card
      v-for="post in posts"
      :key="post._id"
      :post="post"
      class="post-card"
    />
  </div>
</template>

<script>
import PostCard from './PostCard.vue';

export default {
  name: 'PostList',
  components: {
    'post-card': PostCard,
  },
  props: {
    posts: Array,
  },
};
</script>
