<template>
  <label class="file-select">
    <!-- We can't use a normal button element here, as it would become the target of the label. -->
    <div class="select-button">
      <!-- Display the filename if a file has been selected. -->
      <span v-if="value">Selected File: {{value.name}}</span>
      <span v-else>Select File</span>
    </div>
    <!-- Now, the file input that we hide. -->
    <input type="file" @change="handleFileChange"/>
  </label>
</template>

<script>
export default {
name:"FileSelect",
// props: {
//   // Using value here allows us to be v-model compatible.
//   value: FileList
// },
props:["value"],

methods: {
  handleFileChange(e) {
    // Whenever the file changes, emit the 'input' event with the file data.
    this.$emit('input', e.target.files)
  }
}
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}


</style>
