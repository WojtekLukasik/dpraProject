<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="firstName"
      :rules="nameRules"
      label="First Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      :rules="nameRules"
      label="Last Name"
      required
    ></v-text-field>

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateOfBirth"
          label="Birthday date"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="dateOfBirth"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>

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
    name: 'referee-form',
    props: {
      originalReferee:{
        default:null,
        type: Object
      }
    },
    data: () => ({
      valid: true,
      firstName: '',
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      dateOfBirth: null,
      menu: false,
    }),
    created(){
      if(this.originalReferee){
        const {first_name, last_name, date_of_birth} = this.originalReferee
        this.firstName = first_name
        this.lastName = last_name
        this.dateOfBirth = new Date(date_of_birth).toISOString().substr(0, 10)
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          const payload = {
            firstName: this.firstName,
            lastName: this.lastName,
            dateOfBirth: this.dateOfBirth
          }

          this.$emit('refereeFormSubmitted', payload)
          this.reset()

          // axios.post('http://localhost:4200/referees', payload).then(response => {
          //   const referee = response.data
          //   this.$emit('refereeCreated', referee)
          //   this.reset()
          // })
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      save (date) {
        this.$refs.menu.save(date)
      },
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    }
  }
</script>
