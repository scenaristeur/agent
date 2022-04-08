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

    <div v-if="p=='base64'">

      <img v-if="v.startsWith('data:image')" :src="v"  width="100%"/>
      <!-- <div v-if="v.startsWith('data:audio')"> -->
      <!-- <b-button @click="play(v)">Play audio</b-button> -->
      <audio v-else-if="v.startsWith('data:audio')" controls :src="v" />
      <video v-else-if="v.startsWith('data:video')" controls>
        <source :src="v" />
        <!-- <source type="video/webm" src="data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8......jVOrhB9DtnVTrIMQTPc="> -->
        <!-- <source type="video/mp4" src="data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29....../l/L+X8v5AAAAMgfDg=="> -->
      </video>
      <!-- </div> -->
      <div v-else>
        <b> {{p}}</b> {{v.split(',')[0]}}
      </div>
    </div>
    <div v-else>
      




      <b> {{p}}</b> ({{ typeof v}}) :
      {{v}}
    </div>
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
    },
    // play(audio){
    //   var snd = new Audio(audio);
    //   console.log(snd)
    //   snd.play();
    // }
  }
}
</script>

<style>

</style>
