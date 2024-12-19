<template>
  <q-page padding>
    <q-form class="q-gutter-md">
      <q-input filled v-model="naslov" label="Naslov knjige"  />
      <q-input filled v-model="autor" label="Autor" />
      <q-input filled v-model="opis" label="Opis" />
      <q-input filled v-model="slika" label="URL slike" />
      <q-input filled v-model="stanje" label="Broj knjiga" />


      



      <div>
        <q-btn label="Submit" type="submit" color="primary" @click="insertBook()" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script>

import { ref } from 'vue'
import axios from "axios";
export default {
  setup() {


    const naslov = ref(null)
    const autor = ref(null)
    const opis = ref(null)
    const slika = ref(null)
    const stanje = ref(null)

    return {
      naslov,
      autor,
      opis,
      slika,
      stanje


    }
  },
  methods: {
    async insertBook() {
      const formData = {
        naslov: this.naslov,
        autor: this.autor,
        opis: this.opis,
        slika: this.slika,
        stanje: this.stanje,
      };
      await axios
        .post("http://localhost:3000/api/unos_knjige/", formData)
        .then((result) => {
          console.log(result.data);
          // console.log(this.books[0].id)
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};

</script>