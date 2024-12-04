<template>
  <q-page padding>
    
    <h5>Popis knjiga</h5>
    <p>Ovdje se nalazi popis knjiga</p>

   
    <q-table :rows="books" :columns="columns" row-key="id" class="q-mt-md" />
  </q-page>
</template>
<script>
export default {
  name: "BookListPage",

  data() {
    return {
        columns: [
          { name: 'title', label: 'Naslov', align: 'left', field: row => row.title },
          { name: 'author', label: 'Autor', align: 'left', field: row => row.author },
          { name: 'year', label: 'Godina', align: 'center', field: row => row.year },
        ],
        books: [
          { id: 1, title: 'Fahrenheit 451', author: 'Ray Bradbury', year: 1953 },
          { id: 2, title: 'Knjiga 2', author: 'Autor 2', year: 2024 },
          { id: 3, title: 'Knjiga 3', author: 'Autor 3', year: 2010 },
        ],
      };
    },
  };
  </script>
  