<template>
  <div class="VersionsSelector">
    <DocuteSelect
      @change="handleChange"
      :value="currentVersionLink"
      v-slot="{value}"
    >
      <option disabled>Choose Version</option>
      <option
        v-for="(version, key) in $store.getters.config.versions"
        :key="key"
        :value="getLink(version)"
        :selected="value === getLink(version)"
      >
        {{ key }}
      </option>
    </DocuteSelect>
  </div>
</template>

<script>
import {isExternalLink} from '../../utils'

export default {
  methods: {
    handleChange(link) {
      if (isExternalLink(link)) {
        location.href = link
      } else {
        this.$router.push(link)
      }
    },

    getLink(version) {
      if (version.link) {
        return version.link
      }

      if (version.override !== '') {
        return '/' + version.override + '/-/'
      }

      return '/'
    }
  },

  computed: {
    currentVersionLink() {
      const {versions} = this.$store.getters.config
      const currentVersion = this.$store.state.currentOverride

      for (const versionName of Object.keys(versions)) {
        const version = versions[versionName]
        if (version.override === currentVersion) {
          return this.getLink(version)
        }
      }
      return '/'
    }
  }
}
</script>

<style scoped>
.VersionsSelector {
  padding: 0 20px;
  margin-top: 10px;
}
</style>
