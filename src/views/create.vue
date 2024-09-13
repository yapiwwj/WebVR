<script setup>
import { onBeforeMount, onBeforeUnmount } from "vue";

onBeforeMount(() => {
  const hasRefreshed = localStorage.getItem("hasRefreshed");
  if (!hasRefreshed) {
    window.location.reload();
    localStorage.setItem("hasRefreshed", true);
  }
});

onBeforeUnmount(() => {
  localStorage.removeItem("hasRefreshed");
});
</script>

<template>create</template>

<style scoped lang="scss"></style>
