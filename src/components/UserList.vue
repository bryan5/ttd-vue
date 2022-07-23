<template>
  <div class="card">
    <div class="card-header text-center">
      <h3>{{ $t('users') }}</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item list-group-item-action"
        v-for="user in page.content"
        :key="user.id"
        @click="$router.push(`/user/${user.id}`)"
      >
        <UserListItem :user="user" />
      </li>
    </ul>
    <div class="card-footer text-center">
      <button v-show="page.page !== 0 && !pendingApiCall" class="btn btn-outline-secondary btn-sm float-start" @click="loadData(page.page - 1)">
        {{ $t('previousPage') }}
      </button>
      <button v-show="page.totalPages > page.page + 1 && !pendingApiCall" class="btn btn-outline-secondary btn-sm float-end" @click="loadData(page.page + 1)">
        {{ $t('nextPage') }}
      </button>
      <LoadingSpinner v-show="pendingApiCall" size="normal" />
    </div>
  </div>
</template>

<script>
import { loadUsers } from '../api/apiCalls'
import UserListItem from './UserListItem'
import LoadingSpinner from './LoadingSpinner'

export default {
  components: {
    UserListItem,
    LoadingSpinner,
  },

  data() {
    return {
      page: {
        content: [],
        page: 0,
        size: 0,
        totalPages: 0,
      },
      pendingApiCall: true
    }
  },

  async mounted() {
    this.loadData()
  },

  methods: {
    async loadData(pageIndex) {
      this.pendingApiCall = true

      const response = await loadUsers(pageIndex)

      this.page = response.data
      this.pendingApiCall = false
    },
  },
}
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>
