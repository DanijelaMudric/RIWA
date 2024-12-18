<template>
  <q-page padding>
    <q-table
      :rows="rezervacije"
      :columns="columns"
      row-key="naslov"
    />
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "RezervacijaPage",
  setup() {
    const rezervacije = ref([]);
    const columns = [
  { name: 'naslov', align: 'left', label: 'Naslov', field: 'naslov' },
  { name: 'autor', align: 'left', label: 'Autor', field: 'autor' },
  {
    name: 'korisnik',
    align: 'left',
    label: 'Korisnik',
    field: row => `${row.ime} ${row.prezime}` // Spajamo ime i prezime
  },
  { name: 'datum_rez', align: 'left', label: 'Datum rezervacije', field: 'datum_rez' }
];

const fetchRezervacije = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/rezervirane_knjige");
    console.log("Podaci iz API-ja:", response.data); // Ispisivanje podataka koje vraća API
    rezervacije.value = response.data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja rezervacija:", error);
  }
};



    onMounted(() => {
      fetchRezervacije();
    });

    return {
      rezervacije,
      columns
    };
  }
};
</script>
