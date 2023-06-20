<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated>
      <div class="header__img"></div>
    </q-header>

    <q-page-container>
      <transition name="scale" mode="out-in">
        <div class="q-py-xl main_container__height" :key="$route.fullPath">
          <router-view />
        </div>
      </transition>
    </q-page-container>

    <div class="q-pt-xl">
      <q-footer>
        <div class="text-center font-x-large q-py-md">
          Robert Gjorgjioski © {{ currentYear }}
        </div>
      </q-footer>
    </div>
  </q-layout>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
