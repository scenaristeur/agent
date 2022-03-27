<template>
  <span class="login">

    <div v-if="session == null || session.isLoggedIn == false" class="d-flex align-items-center">
      <b-form-group>

        <!-- <b-dropdown id="dropdown-login"
        text="Login"
        class="m-md-2"
        size="sm"
        variant="success">
        <b-dropdown-item v-for="issuer in issuers" :key="issuer.value" @click="login(issuer.value)">
        {{issuer.text}}
      </b-dropdown-item>
    </b-dropdown> -->


    <b-form-select autofocus size="sm" v-model="issuer"
    :options="issuers" @change="login">
    <template #first>
      <b-form-select-option :value="null" disabled>-- Login / Connexion --</b-form-select-option>
    </template>

  </b-form-select>

  <div v-if="issuer == 'other'">
    <b-form-group
    id="fieldset-1"
    description= "ex: `https://solidcommunity.net`"
    label="Entrez l'url de votre fournissuer de POD"
    label-for="input-1"
    valid-feedback="Merci!"
    :invalid-feedback="invalidFeedback"
    :state="state"
    >
    <!-- <b-form-input v-model="other" placeholder="Indiquez votre provider" @input="onInput" ></b-form-input> -->

    <b-form-input id="input-1" v-model="other" :state="state" @change="onChange" trim></b-form-input>
  </b-form-group>

  <b-button size="sm" variant="info">Login / connexion</b-button>
</div>
<!-- <b-button  @click="login" :disabled="issuer == null" variant="success" size="sm">Login</b-button> -->
<!-- <b-form-checkbox
id="checkbox-1"
v-model="restore"
name="checkbox-1"
>
restore session
</b-form-checkbox> -->
</b-form-group>
</div>

<div v-else class="d-flex align-items-center">
  <b-button @click="logout" variant="outline-danger" size="sm">Logout</b-button>

</div>

</span>
</template>

<script>
export default {
  name: "SolidLogin",
  data() {
    return {
      issuers: [
        // { value: null, text: 'Login / Connexion', disabled: true},
        { value: "https://broker.pod.inrupt.com", text: 'Broker Pod Inrupt (Entreprise Solid Server)' },
        { value: "https://inrupt.net", text: 'Inrupt.net' },
        { value: "https://dev.inrupt.net", text: 'dev.inrupt.net' },
        { value: "https://solidcommunity.net", text: 'SolidCommunity.net' },
        { value: "https://solidweb.org", text: 'Solidweb.org' },
        { value: "https://trinpod.us/", text: 'Trinpod.us'},
        { value: "other", text: 'Autre / Other' },
      ],
      issuer: null,
      restore: true,
      other: ""
    }
  },
  methods:{
    onInput(){
      console.log("input", this.other)
    },
    onChange(){
      console.log("change", this.other)
      if (this.other != undefined && this.other.length != undefined)  {
        this.issuer = this.other
        this.login(this.issuer)
      }
    },
    login(issuer){
      console.log(issuer)
      this.issuer = issuer
      if (this.issuer != null && this.issuer != "other"){
        console.log(this.issuer)
        this.$login(this.issuer)
      }
    },
    logout(){
      this.$logout()
    }
  },
  computed:{
    session:{
      get () { return this.$store.state.solid.session },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    state() {
      return this.other.startsWith('http')
    },
    invalidFeedback() {
      if (this.other.length> 0 && !this.other.startsWith('http')) {
        return "L'url de ton fournisseur devrait commencer par `http`"
      }
      return "l'url de ton fournisseur/provider, pas celle de ton webId"
    }
  }
}
</script>

<style>
.login{
  float: left
}
</style>
