<template>
  <b-navbar id="navbar" toggleable="lg" type="dark" variant="info">
    <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
<SpinnerComp />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="newNeurone">new</b-nav-item>
        <b-nav-item @click="showBrainLoader">brains</b-nav-item>
        <b-nav-item @click="saveBrainToSolid">save</b-nav-item>
        <!-- <b-nav-item href="#">Link</b-nav-item> -->
        <!-- <b-nav-item @click="newNeurone">new</b-nav-item> -->
        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="graph" right>
          <b-dropdown-item @click="clear">clear</b-dropdown-item>
          <b-dropdown-item disabled>Reset camera</b-dropdown-item>
          <b-dropdown-item @click="show_node_name = !show_node_name" disabled>show node name {{ show_node_name}}</b-dropdown-item>
          <b-dropdown-item @click="show_link_label = !show_link_label" disabled>show link label {{show_link_label}}</b-dropdown-item>
      </b-nav-item-dropdown>


        <!-- <ToolbarView /> -->
        <!-- <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown text="Lang" right>
      <b-dropdown-item href="#">EN</b-dropdown-item>
      <b-dropdown-item href="#">ES</b-dropdown-item>
      <b-dropdown-item href="#">RU</b-dropdown-item>
      <b-dropdown-item href="#">FA</b-dropdown-item>
    </b-nav-item-dropdown> -->

    <!-- <b-nav-item-dropdown right>

    <template #button-content>
    <em>User</em>
  </template>
  <b-dropdown-item href="#">Profile</b-dropdown-item>
  <b-dropdown-item href="#">Sign Out</b-dropdown-item>
</b-nav-item-dropdown> -->
<SolidLogin />
</b-navbar-nav>
</b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  components: {
    // 'ToolbarView': ()=>import('@/views/ToolbarView'),
    'SolidLogin': ()=>import('@/components/SolidLogin'),
    'SpinnerComp': ()=>import('@/components/SpinnerComp'),
  },
  data(){
    return{
      show_node_name: true,
      show_link_label: true
    }
  },
  methods:{
    newNeurone(){
      this.$store.dispatch('core/newNode')
    },
    saveBrainToSolid(){
      this.$saveBrainToSolid()
    },
    showBrainLoader(){
      this.$store.commit('core/setShowBrainLoader', true)
    },
    // newAutomerge(){
    //   this.$store.dispatch('automerge/newDoc')
    // },
    // addItem(){
    //   let text = "blah"
    //   this.$store.dispatch('automerge/addItem', text)
    // },
    clear(){
      if (confirm('Are you sure you want to remove all nodes?')) {
        this.$store.dispatch('core/removeAllNodes')
        this.$store.commit('core/setCurrentNode', null)
      }
    },
  }
}
</script>

<style>
#navbar{
  z-index: 10;
  position: absolute;
  left: 0px;
  width: 100%;
  top: 0px;
}
</style>
