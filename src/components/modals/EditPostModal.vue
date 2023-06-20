<template>
  <q-dialog persistent>
    <q-card class="modal__create__post">
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Create the post with the desired informations</span
        >
        <span class="font-small q-mt-sm">
          Please ensure that the post is well-structured, engaging, and provides
          valuable insights to the readers. Additionally, make sure to proofread
          the post for any grammatical or spelling errors before publishing it.
          Thank you for your attention to detail and dedication in delivering
          high-quality content to our readers.
        </span>
      </q-card-section>

      <q-card-section class="row justify-center">
        <div class="col-md-12">
          <q-input
            v-model="title"
            type="text"
            label="Title"
            :rules="titleRules"
          />
        </div>
        <div class="col-md-12">
          <q-input
            v-model="textField"
            type="textarea"
            label="Information about post"
            :rules="textFieldRules"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary post__button" @click="updatePost" v-close-popup>
          <span class="text-white">Update Post</span></q-btn
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
import { ref, computed, onBeforeMount } from 'vue';
import { usePostsStore } from '../../stores/postsStore';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const postsStore = usePostsStore();
const title = ref('');
const textField = ref('');

onBeforeMount(() => {
  title.value = props.post.title;
  textField.value = props.post.body;
});

const titleRules = computed(() => [
  (v) => !!v || 'Title is required',
  (v) => (v && v.length <= 100) || 'Title must be less than 50 characters',
]);

const textFieldRules = computed(() => [
  (v) => !!v || 'Information is required',
  (v) =>
    (v && v.length <= 200) || 'Information must be less than 200 characters',
]);

// make updatePost function
const updatePost = () => {
  const { user, ...updatedPost } = {
    title: title.value,
    body: textField.value,
    userId: props.post.userId,
    id: props.post.id,
  };

  postsStore.updatePost(updatedPost);
};
</script>
