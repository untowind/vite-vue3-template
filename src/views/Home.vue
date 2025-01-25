<script setup lang="ts">
import { ElMessage } from 'element-plus';
import i18n from "../i18n"
import { useLanguageStore } from '@/stores/language';
import { useCounterStore } from '@/stores/counter';
import { useWindowSize } from '@/mixins/windowSize';

const languageStore = useLanguageStore()
const counterStore = useCounterStore()
const { bodyWidth, bodyHeight } = useWindowSize()

const $t = i18n.global.t;
const { language } = toRefs(languageStore)
const currentLanguage = ref(language.value)

const { count, increment } = toRefs(counterStore)

watch(currentLanguage, (val, oldVal) => {
  console.log(val)
  // if (val == 'fr') {
  //   currentLanguage.value = oldVal
  // }
})

/**
 * 修改语言
 * @param lang 
 */
const handleChangeLanguage = (lang: any) => {
  let result = languageStore.changeLanguage(lang)
  if (!result) {
    ElMessage.error($t('errorMsg.languageInvalid'))
  }
}
/**
 * 清空store的数据
 */
const resetPiniaState = () => {
  languageStore.$resetFields();
  counterStore.$resetFields();
};
</script>

<template>
  <el-container align="center">
    <el-main>
      <h1>{{ $t('welcome') }}</h1>
      <el-radio-group v-model="currentLanguage" @change="handleChangeLanguage">
        <el-radio value="zh-cn">中文</el-radio>
        <el-radio value="en">英文</el-radio>
        <el-radio value="fr">法语</el-radio>
      </el-radio-group>
      <div>
        <div>bodyWidth：{{ bodyWidth }}</div>
        <div>bodyHeight：{{ bodyHeight }}</div>
      </div>
      <el-button type="primary" @click="resetPiniaState">resetPiniaState</el-button>
      <el-button type="primary" @click="increment">count:{{ count }}</el-button>
    </el-main>
  </el-container>
</template>
