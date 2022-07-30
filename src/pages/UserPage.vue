<template>
  <div data-testid="user-page">
    <ProfileCard :user="user" v-if="!pendingApiCall && !failResponse" />
    <div class="alert alert-secondary text-center" v-if="pendingApiCall">
      <LoadingSpinner size="normal" />
    </div>
    <div v-if="failResponse" class="alert alert-danger text-center">
      {{ failResponse }}
    </div>
  </div>
</template>

<script>
import { getUserById } from '../api/apiCalls'
import ProfileCard from '../components/ProfileCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default {
  name: 'UserPage',

  components: {
    ProfileCard,
    LoadingSpinner
  },

  data() {
    return {
      user: {},
      pendingApiCall: true,
      failResponse: undefined
    }
  },

  async mounted() {
    try {
      const response = await getUserById(this.$route.params.id)

      this.user = response.data
    } catch (error) {
      this.failResponse = error.response.data.message
    }

    this.pendingApiCall = false
  },
}
</script>
