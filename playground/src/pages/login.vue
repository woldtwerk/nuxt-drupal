<script setup lang="ts">


const { status, data, signIn, signOut } = useAuth()
</script>

<template>
  <div>
    <h1>Login</h1>
    <!-- <p v-if="status.value === 'authenticated'">
      You are logged in as {{ data.value?.current_user.name }}
    </p>
    <p v-else-if="status.value === 'anonymous'">
      You are not logged in
    </p>
    <p v-else-if="status.value === 'loading'">
      Loading...
    </p>
    <p v-else-if="status.value === 'error'">
      {{ data.value?.message }}
    </p>
    <button
      v-if="status.value === 'anonymous'"
      @click="signIn"
    >
      Sign in
    </button>
    <button
      v-if="status.value === 'authenticated'"
      @click="signOut"
    >
      Sign out
    </button> -->
  </div>
</template>
