<template>
  <div>
    <b-list-group v-if="pod != null">
      <b-list-group-item v-for="f in pod.friends" :key="f.webid" button>
        {{ f.webId }}
        <FriendDetail :friend="f" />
      </b-list-group-item>

    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "SolidFriends",
  components: {
      'FriendDetail': ()=>import('@/components/FriendDetail'),
  },
  computed: {
    pod() {
      return this.$store.state.solid.pod
    }
  }
}
</script>

<style>

</style>
