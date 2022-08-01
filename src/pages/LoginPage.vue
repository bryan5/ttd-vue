<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2" data-testid="login-page">
    <form class="card mt-5">
      <div class="card-header">
        <h1 class="text-center">Login</h1>
      </div>

      <div class="card-body">
        <GeneralInput
          id="e-mail"
          label="E-mail"
          v-model="email"
        />

        <GeneralInput
          id="password"
          label="Password"
          v-model="password"
          type="password"
        />

        <div class="text-center">
          <button class="btn btn-primary" :disabled="isDisabled || apiProgress" @click.prevent="submit">
            <LoadingSpinner v-if="apiProgress" />
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import GeneralInput from '../components/GeneralInput'
import LoadingSpinner from '../components/LoadingSpinner'
import { login } from '../api/apiCalls'

export default {
  components: {
    GeneralInput,
    LoadingSpinner
  },

  data() {
    return {
      email: '',
      password: '',
      apiProgress: false,

      error: null
    }
  },

  computed: {
    isDisabled() {
      return !(this.email && this.password)
    }
  },

  methods: {
    async submit() {
      this.apiProgress = true

      try {
        await login({
          email: this.email,
          password: this.password
        });
      } catch (error) {
        this.error = error
      }

      this.apiProgress = false
    }
  },
}
</script>
