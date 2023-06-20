<template>
  <q-page>
    <div class="row justify-evenly">
      <q-card class="post col-md-6">
        <post-header :post="post" />
        <post-body :post="post" />
        <q-card-actions class="q-mt-md postview__footer q-mb-lg">
          <q-btn
            outline
            color="primary"
            align="center"
            class="post__create"
            @click="toggleEditModal"
          >
            Edit Post
          </q-btn>
        </q-card-actions>
        <template v-if="comments.length">
          <q-separator spaced inset dark />

          <q-card-section v-if="comments.length">
            <h5 class="q-py-md">Comments section ({{ comments.length }})</h5>
            <ul>
              <li v-for="comment in comments" :key="comment.id" class="q-mb-md">
                <div>
                  <span class="text-white font-x-large">
                    {{ comment.email }} - {{ comment.name }}</span
                  >
                </div>
                <div class="font-large">
                  {{ comment.body }}
                </div>
              </li>
            </ul>
          </q-card-section>
        </template>
      </q-card>
    </div>
  </q-page>

  <edit-post-modal :post="post" v-model="showEditModal" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '../stores/postsStore';
import EditPostModal from '../components/modals/EditPostModal.vue';
import PostHeader from '../components/post-view/PostHeader.vue';
import PostBody from '../components/post-view/PostBody.vue';

defineOptions({
  name: 'PostView',
  inheritAttrs: false,
});

const postsStore = usePostsStore();
const route = useRoute();

const comments = ref([]);
const showEditModal = ref(false);

onMounted(async () => {
  try {
    const res = await postsStore.fetchComments(route.params.id);
    comments.value = res;
  } catch (err) {
    console.log(err);
  }
});

const post = computed(() => {
  return postsStore.getPostById(Number(route.params.id));
});

const toggleEditModal = () => {
  showEditModal.value = true;
};
</script>
