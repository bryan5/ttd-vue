<template>
<div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2" data-testid="signup-page">
  <form v-if="!signUpSuccess" class="mt-5" data-testid="form-sign-up">
    <GeneralCard>
      <template v-slot:header>
        <h1>{{ $t('signUp') }}</h1>
      </template>
      <template v-slot:body>
        <GeneralInput
          id="username"
          :label="$t('username')"
          :help="errors.username"
          v-model="username"
        />

        <GeneralInput
          id="e-mail"
          :label="$t('email')"
          :help="errors.email"
          v-model="email"
        />

        <GeneralInput
          id="password"
          :label="$t('password')"
          :help="errors.password"
          v-model="password"
          type="password"
        />

        <GeneralInput
          id="password-repeat"
          :label="$t('passwordRepeat')"
          :help="hasPasswordMismatch ? $t('passwordMismatchValidation') : ''"
          v-model="passwordRepeat"
          type="password"
        />

        <div class="text-center">
          <ButtonWithProgress
            :apiProgress="apiProgress"
            :disabled="isDisabled"
            @click-custom-button="submit"
          >
            {{ $t('signUp') }}
          </ButtonWithProgress>
        </div>
      </template>
    </GeneralCard>
  </form>

  <div v-else class="alert alert-success mt-3">{{ $t('accountActivationNotification') }}</div>

</div>
</template>

<script>
import { signUp } from '../api/apiCalls'

import GeneralInput from '../components/GeneralInput'
import ButtonWithProgress from '../components/ButtonWithProgress'
import GeneralCard from '../components/GeneralCard'

export default {
  name: 'SignUpPage',

  components: {
    GeneralInput,
    ButtonWithProgress,
    GeneralCard
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      apiProgress: false,
      signUpSuccess: false,
      errors: {},
    }
  },

  methods: {
    async submit() {
      this.apiProgress = true

      try {
        await signUp({
          username: this.username,
          email: this.email,
          password: this.password,
        })

        this.signUpSuccess = true
      } catch (error) {
        if (error.response.status === 400) {
          this.errors = error.response.data.validationErrors || {}
        }

        this.apiProgress = false
      }
    },
  },

  computed: {
    isDisabled() {
      return (this.password && this.passwordRepeat)
        ? this.password !== this.passwordRepeat
        : true
    },

    hasPasswordMismatch() {
      return this.password !== this.passwordRepeat
    },
  },

  watch: {
    username() {
      delete this.errors.username
    },

    email() {
      delete this.errors.email
    },

    password() {
      delete this.errors.password
    },
  },
}
</script>
