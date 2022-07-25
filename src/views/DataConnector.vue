<template>
  <div>
<!-- size="sm" variant="light" -->
    <b-dropdown-item   v-b-modal.modal-connectors>
      Data Connectors
      <!-- <b-icon-share variant="primary" ></b-icon-share> -->
    </b-dropdown-item>

    <b-modal id="modal-connectors" title="Data Connector - Load / save brains & synchronize" size="lg">
      <!-- <p class="my-4">Load / save brains & synchronize</p> -->
      <b-container>
        <LocalConnector />
        <!-- <RemoteConnector /> -->
        <!-- <SocialConnector /> -->
        <SolidConnector />
        <!-- <IpfsConnector /> -->
        <GunConnector />
      </b-container>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: "DataConnector",
  components: {
    // 'ToolbarView': ()=>import('@/views/ToolbarView'),
    'LocalConnector': ()=>import('@/views/connectors/LocalConnector'),
    // 'RemoteConnector': ()=>import('@/views/connectors/RemoteConnector'),
    // 'SocialConnector': ()=>import('@/views/connectors/SocialConnector'),
    'SolidConnector': ()=>import('@/views/connectors/SolidConnector'),
    'GunConnector': ()=>import('@/views/connectors/GunConnector'),
    // 'IpfsConnector': ()=>import('@/views/connectors/IpfsConnector'),
  }
}
</script>

<style>

</style>
