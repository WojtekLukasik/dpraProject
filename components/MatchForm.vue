<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-select
        v-model="homeTeamId"
        :item-value="team => team.id"
        :item-text="team => team.name"
        :items="teams"
        label="Home Team"
    ></v-select>

    <v-select
        v-model="awayTeamId"
        :item-value="team => team.id"
        :item-text="team => team.name"
        :items="teams"
        label="Away Team"
    ></v-select>

    <v-select
        v-model="refereeId"
        :item-value="referee => referee.id"
        :item-text="referee => referee.first_name + ' ' + referee.last_name"
        :items="referees"
        label="Referee"
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
          v-model="date"
          label="Date"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="date"
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
import Match from '~/services/Match'
import Teams from '~/services/Teams'
import Referee from '~/services/Referee'

export default {
    name: 'match-form',
    props:{
        originalMatch:{
            default: null,
            type: Object
        }
    },
    data: () => ({
        teams: [],
        referees: [],
        homeTeamId: '',
        awayTeamId: '',
        refereeId: '',
        date: null,
        teamSize: 1000,
        teamPage: 1,
        refereesSize: 1000,
        refereesPage:1,
        valid: true,
        nameRules: [
        v => !!v || 'Name is required'
      ],
      menu: false
    }),
    created(){
        this.getTeams()
        this.getAllReferees()
        if(this.originalMatch){
            const{home_team_id, away_team_id, referee_id, date} = this.originalMatch
            this.homeTeamId = home_team_id
            this.awayTeamId = away_team_id
            this.refereeId = referee_id
            this.date = new Date(date).toISOString().substr(0, 10)
        }
    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                const payload = {
                    homeTeamId: this.homeTeamId,
                    awayTeamId: this.awayTeamId,
                    refereeId: this.refereeId,
                    date: this.date
                }
                this.$emit('matchFormSubmitted', payload)
                this.reset()
            }
        },
        getTeams(){
            const params = {size: this.teamSize, page: this.teamPage}
            Teams.getTeams(params).then((res)=>{
                const {teams, total } = res.data
                this.teams = teams
            });
        },
        getAllReferees(){
            const params = {size: this.refereeSize, page: this.refereePage}
            Referee.getReferees(params).then((res) =>{
                const {referees, total} = res.data
                this.referees = referees
            })
        },
        reset () {
            this.$refs.form.reset()
        },
        save (date) {
            this.$refs.menu.save(date)
        }  
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    }
}
</script>