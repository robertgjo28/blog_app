<template>
  <div class="row wrap justify-center q-pt-lg">
    <q-btn
      outline
      color="primary"
      @click="changePages(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      <span class="material-icons"> arrow_back_ios </span>
    </q-btn>
    <q-btn
      outline
      color="primary"
      v-for="page in pageRange"
      :key="page"
      @click="changePages(page)"
      :disabled="page === currentPage"
    >
      {{ page }}
    </q-btn>
    <q-btn
      outline
      color="primary"
      @click="changePages(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      <span class="material-icons"> arrow_forward_ios </span>
    </q-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentPage = ref(1);
const maxPagesCount = 5;

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-changed']);

const totalPages = computed(() => {
  return props.totalPages;
});

const pageRange = computed(() => {
  const total = totalPages.value;

  if (total <= maxPagesCount) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const current = currentPage.value;
  const half = Math.floor(maxPagesCount / 2);

  let start = Math.max(1, current - half);
  const end = Math.min(total, start + maxPagesCount - 1);

  if (end - start + 1 < maxPagesCount) {
    start = Math.max(1, end - maxPagesCount + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const changePages = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit('page-changed', page);
  }
};
</script>
