<template>
  <q-page>
    <h1>Registracija</h1>
    <q-input filled v-model="username" label="Korisničko ime" />
    <q-input filled v-model="password" label="Lozinka" type="password" />
    <q-input filled v-model="email" label="Email" />
    <q-btn color="primary" label="Potvrdi" @click="registerUser" />

    <h2>Rezervirane Knjige</h2>
    <ul>
      <li v-for="(rezervacija, index) in rezervacije" :key="index">
        {{ rezervacija.naziv }} - {{ rezervacija.autor }}
      </li>
    </ul>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const rezervacije = ref([]); // Reaktivni element

const loadRezervacije = async () => {
  try {
    const result = await axios.get('http://localhost:3000/api/rezervirane_knjige/');
    rezervacije.value = result.data.data; // Dodijelite podatke u reaktivni element
    console.log(rezervacije.value);
  } catch (error) {
    console.error(error);
  }
};

loadRezervacije(); // Poziv funkcije pri učitavanju
</script>



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
    async loadBooks() {
      await axios.get('http://localhost:3000/api/rezervirane_knjige/')
        .then(result => {
          console.log(result.data.data)
          this.books = result.data.data
          console.log(this.books[0].id)
        })
        .catch(error => {
          console.error(error)
        })
    },
  }
  };
  </script>
