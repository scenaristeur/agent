<template>
  <!-- <div> Spinner -->
  <span>
    <span v-if="spinner.length > 0">
      <!-- Loading, {{spinner}} -->
      <b-button variant="warning" disabled>
        <b-spinner small type="grow"></b-spinner>
        <b-badge v-b-modal.modal-tasks variant="primary">{{spinner.length}}</b-badge>
      </b-button>


    </span>
    <b-modal id="modal-tasks" title="Tasks">
      {{spinner.length}} tasks pending <b-button @click="reset" variant="outline-warning" size="sm">reset</b-button>
      <ul>
        <li v-for="w in spinner" :key="w.id"> {{w.id}}</li>
      </ul>
    </b-modal>
  </span>
</template>

<script>
export default {
  name: "SpinnerComp",
  methods: {
    reset(){
      this.$store.commit('core/resetSpinner')
    }
  },
  computed: {
    spinner() {
      return this.$store.state.core.spinner
    },
  }
}
</script>

<style>

</style>
