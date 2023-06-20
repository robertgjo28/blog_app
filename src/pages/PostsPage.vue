<template>
  <create-post />
  <div class="row justify-center">
    <div class="col-10">
      <div class="row justify-evenly q-pb-xl">
        <div class="col-10 q-pb-md">
          <span class="float-left font-x-large"> Filter </span>
          <span class="float-right font-medium"> {{ postsRead }} posts </span>
        </div>
        <div class="col-10">
          <q-input
            filled
            v-model="filterEntry"
            placeholder="Search..."
            :dense="true"
          ></q-input>
        </div>
      </div>
      <div class="row justify-evenly">
        <template v-if="!filteredPosts.length">
          <no-posts-found />
        </template>
        <template v-else>
          <list-posts
            v-for="post in paginatedPosts"
            :key="post.id"
            :post="post"
          />
        </template>
      </div>
      <template v-if="filteredPosts.length">
        <paginate-posts
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-changed="changePages"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePostsStore } from '../stores/postsStore';
import createPost from '../components/posts/CreatePost.vue';
import noPostsFound from '../components/posts/NoPostsFound.vue';
import listPosts from '../components/posts/ListPosts.vue';
import paginatePosts from '../components/posts/PaginatedPosts.vue';

const postsStore = usePostsStore();
const currentPage = ref(1);
const postsPerPage = 6;
const filterEntry = ref('');

const filteredPosts = computed(() => {
  if (filterEntry.value) {
    // filter them by every possible property that is used in the template
    return postsStore.posts.filter((post) => {
      const postTitle = post.title.toLowerCase();
      const postBody = post.body.toLowerCase();
      const postUserName = post.user.name.toLowerCase();
      const filterEntryValue = filterEntry.value.toLowerCase();
      return (
        postTitle.includes(filterEntryValue) ||
        postBody.includes(filterEntryValue) ||
        postUserName.includes(filterEntryValue)
      );
    });
  }
  return postsStore.posts;
});

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return filteredPosts.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  const filteredPostsLength = filteredPosts.value.length;
  return Math.ceil(filteredPostsLength / postsPerPage);
});

const postsRead = computed(() => {
  const filteredPostsLength = filteredPosts.value.length;
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, filteredPostsLength);
  return `${endIndex} / ${filteredPostsLength}`;
});

const changePages = (page) => {
  currentPage.value = page;
};
</script>
