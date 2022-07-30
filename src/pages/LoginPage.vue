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
          <button class="btn btn-primary" :disabled="isDisabled">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import GeneralInput from '../components/GeneralInput'

export default {
  components: {
    GeneralInput
  },

  data() {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    isDisabled() {
      return !(this.email && this.password)
    }
  },
}
</script>
