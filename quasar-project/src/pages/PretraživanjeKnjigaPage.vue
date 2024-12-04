<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h4">Pretraži Knjige</div>
      </q-card-section>

      <q-card-section>
        <!-- Input polje za pretragu -->
        <q-input 
          v-model="searchQuery" 
          label="Unesite pojam za pretragu" 
          outlined 
          clearable 
        />

        <!-- Checkbox za odabir pretrage po autoru ili naslovu -->
        <div class="q-mt-md">
          <q-checkbox 
            v-model="searchByAuthor" 
            label="Pretraži po autoru" 
          />
          <q-checkbox 
            v-model="searchByTitle" 
            label="Pretraži po naslovu" 
          />
        </div>

        <!-- Gumb za pretragu -->
        <q-btn 
          label="Traži" 
          color="primary" 
          class="q-mt-md"
          @click="searchBooks" 
        />
      </q-card-section>

      <!-- Tabela za prikaz rezultata pretrage -->
      <q-card-section>
        <q-table
          :rows="filteredBooks"
          :columns="columns"
          row-key="id"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const searchQuery = ref('');
    const searchByAuthor = ref(false);
    const searchByTitle = ref(false);

    // Dummy podaci za knjige
    const books = ref([
      { id: 1, title: 'Fahrenheit 451', author: 'Ray Bradbury', year: 1953 },
      { id: 2, title: 'Knjiga 2', author: 'Autor 2' },
      { id: 3, title: 'Knjiga 3', author: 'Autor 1' },
    ]);

    const columns = [
      { name: 'title', label: 'Naslov', align: 'left', field: 'title' },
      { name: 'author', label: 'Autor', align: 'left', field: 'author' }
    ];

    // Inicijaliziramo filteredBooks sa svim knjigama
    const filteredBooks = ref(books.value);

    // Funkcija za pretraživanje knjiga
    function searchBooks() {
      filteredBooks.value = books.value.filter((book) => {
        const matchesAuthor = searchByAuthor.value && book.author.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesTitle = searchByTitle.value && book.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        // Ako nijedna od opcija nije označena, pretražuju se obje
        return (searchByAuthor.value || searchByTitle.value) && (matchesAuthor || matchesTitle);
      });
      console.log(filteredBooks.value); // Provjera rezultata u konzoli
    }

    return {
      searchQuery,
      searchByAuthor,
      searchByTitle,
      columns,
      filteredBooks,
      searchBooks
    };
  }
}
</script>

<style scoped>
/* Dodatni stilovi, ako su potrebni */
</style>
