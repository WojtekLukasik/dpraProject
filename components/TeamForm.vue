<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Team Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="city"
      :rules="nameRules"
      label="City"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="submit"
    >
      Submit
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'team-form',
    props: {
      originalTeam: {
        default: null,
        type: Object
      }
    },
    data: () => ({
      valid: true,
      name: '',
      city: '',
      nameRules: [
        v => !!v || 'Name is required'
      ]
    }),
    created(){
      if(this.originalTeam){
        const {name, city} = this.originalTeam
        this.name = name
        this.city = city
      }
    },
    methods: {
      submit (){
        if(this.$refs.form.validate()) {
          const payload = {
            name: this.name,
            city: this.city
          }

          this.$emit('teamFormSubmitted', payload)
          this.reset()

          // axios.post('http://localhost:4200/teams', payload).then(response =>{
          //   const team = response.data
          //   this.$emit('teamCreated', team)
          //   this.reset()
          // });
        }
      },
      reset(){
        this.$refs.form.reset();
      }
    }

}
</script>