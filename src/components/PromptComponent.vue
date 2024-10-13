<template>
  <div class="fixed-input-container">
    <q-input rounded outlined v-model="text">
      <template v-slot:append>
        <q-btn flat dense round icon="send"/>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const text = ref('');

</script>

<style scoped lang="scss">
.fixed-input-container {
  flex: 1;
  max-width: 100%;
}
</style>
