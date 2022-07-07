<template>
  <span title="Türkçe" class="first" @click="$i18n.locale = 'tr'">TR</span>
  <span title="English" @click="$i18n.locale = 'en'">EN</span>
</template>

<style scoped>
span {
  cursor: pointer;
}

.first {
  margin-right: 10px;
}
</style>
