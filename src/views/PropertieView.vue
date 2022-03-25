<template>

  <div>
    <!-- p: {{p}}<br>

    v: {{v}}
    <hr> -->
    <div v-if="typeof v == 'object'">

      <b> {{p}}</b> :
      <span v-if="Array.isArray(v)">
        <!-- <ul>
        <li v-for="(v, i) in v" :key="i"> -->
        <span v-for="(val, i) in v" :key="i">
          <b-button v-if="val.id != undefined" size="sm" @click="switchTo(val.id)" variant="outline-primary">{{val.name || val.id}}</b-button>
          <span v-else> <b-badge variant="light">{{val}}</b-badge></span>
        </span>

        <!-- </li>
      </ul> -->

    </span>
    <span v-else>

      <b-button v-if="v.id != undefined" size="sm" @click="switchTo(v.id)" variant="outline-primary">{{v.name || v.id}}</b-button>
      <span v-else>
        {{v}}
      </span>
    </span>

  </div>
  <div v-else>
    <b> {{p}}</b> ({{ typeof v}}) :
    {{v}}
  </div>

  <!-- <b-button @click="addValue(p)" variant="outline-primary" size="sm">+</b-button> -->
</div>



</template>

<script>
export default {
  name: "PropertieView",
  props: ['p', 'v'],
  methods: {
    switchTo(id){
      this.$store.dispatch('core/switchTo',id)
    }
  }
}
</script>

<style>

</style>
