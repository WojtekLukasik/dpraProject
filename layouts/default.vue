<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
    <nuxt-link class="link" to="/players">Players</nuxt-link>
    <nuxt-link class="link" to="/teams">Teams</nuxt-link>
    <nuxt-link class="link" to="/coaches">Coaches</nuxt-link>
    <nuxt-link class="link" to="/referees">Referees</nuxt-link>
    <nuxt-link class="link" to="/matches">Matches</nuxt-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
    }
  }
}
</script>
<style>
  .link{
    margin-right:20px;
    text-decoration: none;
  }
  a.link {
    color:white !important;
  }
  .link:hover{
    color: gray !important;
  }
</style>