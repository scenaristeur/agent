<template>
  <vue-fab
  :mainBtnColor="mainBtnColor">
  <fab-item
  v-for="(item, idx) in menu"
  :key="idx"
  :idx="idx"
  :title="item.title"
  :color="item.color"
  :icon="item.icon"
  @clickItem="clickItem" />
</vue-fab>
</template>

<script>
export default {
  name: "FabMenu",
  data(){
    return {
      menu: [
        {
          icon: 'done',
          title: 'good job!',
          color: '#ff9900'
        },
        {
          icon: 'toc',
          title: '',
          color: '#999'
        }
      ],
      mainBtnColor: '#3eaf7c'
    }
  },
  methods:{
    clickItem: function (item) {
      window.alert(item.idx)
    },
  }
}
</script>

<style>

</style>
