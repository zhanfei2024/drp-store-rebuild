<template>
  <div id="app">
    <router-view v-title="baseInfos.siteName"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {

  },
  components: {

  },
  computed: {
    baseInfos() {
      return this.$store.getters['getSiteInfo'];
    }
  },
  mounted () {

  },
}
</script>

<style>

</style>
