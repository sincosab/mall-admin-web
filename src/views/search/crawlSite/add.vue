<template> 
  <brand-detail :is-edit='false'></brand-detail>
</template>
<script>
  import CrawlSiteDetail from './components/CrawlSiteDetail'
  export default {
    name: 'addSite',
    components: { CrawlSiteDetail }
  }
</script>
<style>
</style>


