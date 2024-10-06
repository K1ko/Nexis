<template>
  <div class="editor-wrapper q-pa-md q-gutter-sm">
    <q-form>
      <q-editor
        v-model="editor"
        flat
        content-class="white"
        toolbar-text-color="white"
        toolbar-bg="primary"
        :content-style="{ color: 'black' }"
        min-height="2rem"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          [{
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
          }, {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }]
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }"
      />
      <q-btn
        class="submit-button"
        color="transparent"
        icon="send"
        text-color="black"
        type="submit"
      />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const editor = ref('');

</script>

<style scoped lang="scss">
.editor-wrapper {
  position: relative;
  width: 90vw;
}

.q-editor {
  border-radius: 30px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-button {
  position: absolute;
  bottom: 5px;
  right: 20px;
  border: none;
}
</style>
