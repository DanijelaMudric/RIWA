<template>
    <q-page>
      <h1>Registracija</h1>
      <q-input filled v-model="username" label="Korisničko ime" />
      <q-input filled v-model="password" label="Lozinka" type="password" />
      <q-input filled v-model="email" label="Email" />
      <q-btn color="primary" label="Potvrdi" @click="registerUser" />
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        email: '',
      };
    },
    methods: {
      registerUser() {
        // Dodaj logiku za registraciju korisnika
        alert(`Korisnik ${this.username} uspješno registriran!`);
      },
    },
  };
  </script>
  