<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  async setup() {
    const store = useStore();
    await store.dispatch('initData');

    return {};
  },
});
</script>
