<template>
    <q-page>
      <h1>Prijava</h1>
      <q-input filled v-model="username" label="Korisničko ime" />
      <q-input filled v-model="password" label="Lozinka" type="password" />
      <q-btn color="primary" label="Potvrdi" @click="loginUser" />
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      loginUser() {
        // Dodaj logiku za prijavu korisnika
        alert(`Prijava uspješna za korisnika ${this.username}`);
      },
    },
  };
  </script>
  