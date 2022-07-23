<template>
  <div data-testid="user-page">
    <ProfileCard :user="user" />
  </div>
</template>

<script>
import { getUserById } from '../api/apiCalls'
import ProfileCard from '../components/ProfileCard'

export default {
  name: 'UserPage',

  components: {
    ProfileCard,
  },

  data() {
    return {
      user: {},
    }
  },

  async mounted() {
    try {
      const response = await getUserById(this.$route.params.id)
      this.user = response.data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
