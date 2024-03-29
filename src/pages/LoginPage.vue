<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2" data-testid="login-page">
    <form class="mt-5">
      <GeneralCard>
        <template v-slot:header>
          <h1>{{ $t('login') }}</h1>
        </template>
        <template v-slot:body>
          <GeneralInput
            id="e-mail"
            :label="$t('email')"
            v-model="email"
          />

          <GeneralInput
            id="password"
            :label="$t('password')"
            v-model="password"
            type="password"
          />

          <div v-if="failMessage" class="alert alert-danger text-center">
            {{ failMessage }}
          </div>

          <div class="text-center">
            <ButtonWithProgress
              :apiProgress="apiProgress"
              :disabled="isDisabled"
              @click-custom-button="submit"
            >
              {{ $t('login') }}
            </ButtonWithProgress>
          </div>
        </template>
      </GeneralCard>
    </form>
  </div>
</template>

<script>
import ButtonWithProgress from '../components/ButtonWithProgress'
import GeneralCard from '../components/GeneralCard'
import GeneralInput from '../components/GeneralInput'
import { login } from '../api/apiCalls'

export default {
  components: {
    GeneralInput,
    ButtonWithProgress,
    GeneralCard
  },

  data() {
    return {
      email: '',
      password: '',
      apiProgress: false,
      failMessage: undefined
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
        const response = await login({ email: this.email, password: this.password })

        this.$router.push('/')

        const data = {
          ...response.data,
          header: `Bearer ${response.data.token}`
        }

        this.$store.commit('loginSuccess', data)
      } catch (error) {
        this.failMessage = error.response.data.message
      }

      this.apiProgress = false
    }
  },

  watch: {
    email() {
      this.failMessage = undefined
    },

    password() {
      this.failMessage = undefined
    }
  },
}
</script>
