<template>
  <div class="row justify-evenly q-pb-lg q-mb-lg">
    <div class="col-10">
      <div class="row justify-evenly">
        <q-card class="post col-md-11">
          <q-card-section>
            <h6 class="font-xx-large">Hello Guest!</h6>
          </q-card-section>

          <q-card-section class="font-large">
            Welcome to our blog, where we curate and craft insightful posts on a
            diverse range of topics. As the creators of this platform, we have
            the privilege of not only adding high-quality content but also the
            flexibility to fine-tune and enhance our posts as we see fit. Our
            commitment to professionalism drives us to continually refine and
            expand our blog's content, ensuring that our readers receive a
            comprehensive and engaging experience. Join us on this journey of
            knowledge and discovery as we delve into thought-provoking subjects,
            share valuable insights, and provide expert analysis. Stay tuned for
            captivating articles that will broaden your horizons and leave you
            with a deeper understanding of the world around us.
          </q-card-section>

          <q-card-actions class="q-mt-md">
            <q-btn
              split
              color="primary"
              push
              outline
              no-caps
              icon="add"
              label="Create Post"
              class="post__create"
              @click="toggleCreateModal"
            >
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>

  <create-post-modal v-model="showCreateModal"></create-post-modal>
</template>

<script setup>
import { ref } from 'vue';
import createPostModal from '../modals/createPostModal.vue';

const showCreateModal = ref(false);

const toggleCreateModal = () => {
  showCreateModal.value = true;
};
</script>
