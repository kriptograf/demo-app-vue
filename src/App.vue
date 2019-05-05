<template>
  <v-app>

    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile v-for="link of links" :key="link.title" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Ads</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="link of links" :key="link.title" :to="link.url">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <template v-if="error">
      <v-snackbar
              :multi-line="true"
              :top="true"
              :right="true"
              :timeout="6000"
              color="error"
              @input="closeSnackbar"
              :value="true"
      >
        {{ error }}
        <v-btn
                color="white"
                flat
                @click="closeSnackbar"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      drawer: false,
      links: [
        { title: 'Home', icon: 'home', url: '/' },
        { title: 'Post Ads', icon: 'add', url: '/post' },
        { title: 'My Ads', icon: 'toc', url: '/ads' },
        { title: 'Login', icon: 'lock', url: '/login' },
        { title: 'Register', icon: 'how_to_reg', url: '/register' }
      ]
    }
  },
  computed: {
    error(){
      //получить ошибку из стора
      return this.$store.getters.error;
    }
  },
  methods: {
    closeSnackbar(){
      //Диспатчим метод который очищает ошибки из store
      this.$store.dispatch('clearError');
    }
  }
}
</script>

<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>