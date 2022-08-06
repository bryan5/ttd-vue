<template>
  <NavBar />

  <div class="container">
    <router-view />
    <LanguageSelector />
  </div>
</template>

<script>
import LanguageSelector from './components/LanguageSelector'
import NavBar from './components/NavBar'

export default {
  name: 'App',

  components: {
    LanguageSelector,
    NavBar
  },

  data() {
    return {
      path: window.location.pathname
    }
  },

  methods: {
  },
}
</script>
