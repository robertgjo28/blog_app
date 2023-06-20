<template>
  <q-card class="post col-md-5">
    <div @click="goToPost(post.id)" class="cursor-pointer">
      <q-card-section class="min__height__postheader">
        <h6 class="font-xx-large">{{ props.post.title }}</h6>
        <div class="subtitle font-large">by {{ props.post.user.name }}</div>
      </q-card-section>

      <q-card-section class="font-large min__height__postbody">
        {{ props.post.body }}
      </q-card-section>

      <q-separator dark></q-separator>
    </div>
    <q-card-actions class="q-mt-md">
      <q-btn
        color="primary"
        align="right"
        :to="{ name: 'Post', params: { id: props.post.id } }"
        class="post__edit"
        ><span class="text-white q-pr-sm">View Post</span>
        <span class="material-icons text-white"> arrow_right_alt </span></q-btn
      >
      <q-btn
        outline
        color="primary"
        align="left"
        @click="toggleDeleteModal(props.post.id)"
        class="post__button"
      >
        Delete
        <span class="material-icons q-pl-sm"> delete </span>
      </q-btn>
    </q-card-actions>
  </q-card>

  <delete-modal :id="deletePostId" v-model="showDeleteModal"></delete-modal>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import deleteModal from '../modals/DeleteModal.vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const deletePostId = ref(null);
const showDeleteModal = ref(false);

const router = useRouter();

const toggleDeleteModal = (id) => {
  deletePostId.value = +id;
  showDeleteModal.value = true;
};

const goToPost = (postId) => {
  router.push({ name: 'Post', params: { id: postId } });
};
</script>
