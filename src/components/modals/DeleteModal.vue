<template>
  <q-dialog persistent>
    <q-card class="modal__post">
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="primary" text-color="white"></q-avatar>
        <span class="q-ml-sm">Are you sure you want to delete this post?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="handleDelete(props.id)"
          color="primary post__button"
          v-close-popup
        >
          <span class="text-white">Delete</span></q-btn
        >
        <q-btn
          outline
          label="Cancel"
          color="primary post__edit"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { usePostsStore } from '../../stores/postsStore';

const props = defineProps({
  id: Number,
});

const postsStore = usePostsStore();

// now delete the post and close the modal
const handleDelete = (id) => {
  // delete the post
  postsStore.deletePost(id);
};
</script>
