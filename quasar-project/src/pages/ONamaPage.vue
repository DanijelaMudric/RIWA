<template>
  <q-page padding>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        
        <img alt="Slika Biljke" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS6N0w5qjMP-dxQhbenm_ErfIhGxpzzTq9eg&s">
          <div class="text-h3 text-weight-bolder absolute-bottom text-center">
            O nama
          </div>
        <img>
      </q-card-section>
      <q-card-section class="text-h4 text-justify">
        {{ o_nama }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      o_nama: 'Gradska knjižnica Rijeka središnja je narodna knjižnica grada Rijeke i matična knjižnica za narodne i školske knjižnice Primorsko-goranske županije. Ona je informacijsko, obrazovno, kulturno, komunikacijsko i socijalno središte Rijeke i okolice usmjereno prema novom stvaralaštvu, održivom razvoju i kvaliteti razvoja zajednice i čitateljske kulture.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>

