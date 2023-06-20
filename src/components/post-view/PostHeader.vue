<template>
  <q-card-section class="postview__header">
    <div class="postview__header__buttons row">
      <div class="col-6">
        <router-link :to="{ name: 'Posts' }" class="text-primary float-left"
          ><span class="material-icons"> arrow_back_ios </span>
          Back</router-link
        >
      </div>
      <div class="col-6">
        <a
          :href="`https://${user.website}`"
          target="_blank"
          class="text-primary float-right"
          >View my website
          <span class="material-icons q-ml-sm"> open_in_new </span></a
        >
      </div>
    </div>
    <div class="postview__header__title row justify-center q-py-lg">
      <h6 class="font-xx-large">{{ post.title }}</h6>
    </div>
    <div class="postview__header__subtitle row justify-evenly">
      <div class="subtitle font-large">
        <span class="material-icons"> perm_identity </span>
        {{ user.name }} ({{ user.username }})
      </div>
      <div class="subtitle font-large">
        <span class="material-icons q-mr-sm"> email </span>
        <a :href="`mailto:${user.email}`" class="subtitle">{{ user.email }}</a>
      </div>
      <div class="subtitle font-large">
        <span class="material-icons q-mr-sm"> phone </span>
        <a :href="`tel:${user.phone}`" class="subtitle">{{ user.phone }}</a>
      </div>
      <div class="subtitle font-large">
        <span class="material-icons"> business </span>
        {{ user.company.name }}
      </div>
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
