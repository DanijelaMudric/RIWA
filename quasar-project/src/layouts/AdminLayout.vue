<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Knjižnica
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Izbornik
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          tag="router-link"
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- This is where you end the q-layout -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout> <!-- This closing tag was missing -->
</template>

<script setup>
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'AdminLayout'
})

let title = computed(() => {
  return "Knjižnica admin"
})

const linksList = [
  {
    title: 'Početna',
    caption: 'Početna stranica',
    icon: 'home',
    to: '/admin'
  },
  {
    title: 'Popis svih knjiga',
    caption: 'Pogledajte sve knjige',
    icon: 'library_books',
    to: '/admin/popisKnjiga'
  },
  {
    title: 'PretraživanjeKnjiga',
    caption: 'Pretraži knjige',
    icon: 'search',
    to: '/admin/pretrazivanje'
  },
  {
    title: 'Popis korisnika',
    caption: 'Informacije o korisnicima',
    icon: 'info',
    to: '/admin/popis_korisnika'
  },
  {
    title: 'Unos knjiga',
    caption: 'Unos nove knjige',
    icon: 'local_library',
    to: '/admin/unos_knjiga'
  },
  {
    title: 'Logout',
    caption: 'Prijavite se',
    icon: 'login',
    to: '/admin/logout'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
