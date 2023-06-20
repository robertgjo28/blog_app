<template>
  <q-card-section class="font-large postview__body">
    {{ post.body }}
    <div class="postview__body__company">
      Welcome to {{ user.company.name }}, where we redefine the future of
      business solutions. Our mission is to {{ user.company.bs }}, enabling
      companies to unlock their full potential and maximize efficiency. Our moto
      is {{ user.company.catchPhrase }}
    </div>
  </q-card-section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  post: Object,
});

const user = computed(() => {
  const { user } = props.post;
  return user;
});
</script>
