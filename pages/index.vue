<template>
  <div>
    Siema {{ name }}, age: {{ age }}, pawel: {{ pawelAge }}
    <button @click="incrementAge">Postarzej</button>
    <button @click="incrementAgeBy(10)">Postarzej o 10</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Wojtek',
      age: 24
    }
  },
  created () {

  },
  methods: {
    incrementAge () {
      this.age++
    },
    incrementAgeBy (value) {
      this.age = this.age + value
    }
  },
  computed: {
    pawelAge () {
      return this.age + 4
    }
  }
}
</script>

<style lang="css" scoped>

</style>
