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

    <v-select
        v-model="teamId"
        :item-value="team => team.id"
        :item-text="team => team.name"
        :items="teams"
        label="Team"
    ></v-select>

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
  import Teams from '~/services/Teams'
  export default {
    name: 'coach-form',
    props: {
      originalCoach: {
        default: null,
        type: Object
      }
    },
    data: () => ({
      firstName: '',
      lastName: '',
      teamId: '',
      dateOfBirth: null,
      valid: true,
      teams: [],
      teamSize: 10,
      teamPage: 1,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      menu: false,
    }),
    created(){
      this.getTeams()
      if (this.originalCoach) {
        const {first_name,  last_name, team_id, date_of_birth } = this.originalCoach
        this.firstName = first_name
        this.lastName = last_name
        this.teamId = team_id
        this.dateOfBirth = new Date(date_of_birth).toISOString().substr(0, 10)
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          const payload = {
            firstName: this.firstName,
            lastName: this.lastName,
            teamId: this.teamId,
            dateOfBirth: this.dateOfBirth
          }
          this.$emit('coachFormSubmitted', payload)
          this.reset() 
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      save (date) {
        this.$refs.menu.save(date)
      },
      getTeams(){
             const params = {size: this.teamSize, page: this.teamPage}
             Teams.getTeams(params).then((res)=>{
             const {teams, total } = res.data
             this.teams = teams
          });
      }

    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    }
  }
</script>
