<template>
  <div class="shadow-sm bg-light mb-3">
    <nav class="navbar navbar-expand navbar-light container">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/" title="Home">
          <img src="../assets/hoaxify.png" width="60" alt="Hoaxify Logo" />
          Hoaxify
        </router-link>
        <ul class="navbar-nav ml-auto">
          <router-link class="nav-link" to="/signup" v-if="!$store.state.isLoggedIn">{{ $t('signUp') }}</router-link>
          <router-link class="nav-link" to="/login" v-if="!$store.state.isLoggedIn">Login</router-link>
          <router-link class="nav-link" :to="`/user/${$store.state.id}`" v-if="$store.state.isLoggedIn">My Profile</router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>
