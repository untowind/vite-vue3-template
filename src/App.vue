<script setup lang="ts">
import packageJson from "../package.json";
import { RouterLink, RouterView } from 'vue-router'
import { useLanguageStore } from './stores/language';

const languageStore = useLanguageStore()

const { localeContent } = toRefs(languageStore)

onBeforeMount(() => {
  languageStore.initLanguage()
})
</script>

<template>
  <el-config-provider :locale="localeContent">
    <RouterView />
  </el-config-provider>
  <div class="version">v{{ packageJson.version }}</div>
</template>

<style scoped>
.version {
  position: absolute;
  left: 10px;
  bottom: 5px;
  height: auto !important;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
}
</style>
