<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Home Team</th>
                <th class="text-left">Away Team</th>
                <th class="text-left">Referee</th>
                <th class="text-left">Date</th>
                <th class="text-left">Edit</th>
                <th class="text-left">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(match, index) in matches" :key="index">
                <td>{{ getTeamById(match.home_team_id)}}</td>
                <td>{{ getTeamById(match.away_team_id) }}</td>
                <td>{{ getRefereeById(match.referee_id) }}</td>
                <td>{{ formatDate(match.date) }}</td>
                <td>
                    <button @click="openOverlay(match)">Edit</button>
                </td>
                <td>
                    <button @click="removeMatch(match.id)">Remove</button>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-pagination
            v-model="page"
            :length="paginationLength"
        ></v-pagination>
        <div class="numberOfMatches">Number of matches: {{ total }}</div>
        <match-form @matchFormSubmitted="createMatch($event)">
        </match-form>
        <v-overlay :value="overlay" :opacity="0.9">
            <v-btn
                icon
                @click="overlay = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <match-form
            :originalMatch="editMatch" 
            @matchFormSubmitted="updateMatch($event)">
            </match-form>
        </v-overlay>
    </div>
</template>
<script>
import Match from '~/services/Match'
import Teams from '~/services/Teams'
import Referee from '~/services/Referee'
import MatchForm from '~/components/MatchForm.vue'


export default {
    data(){
        return{
            matches: [],
            teams: [],
            referees: [],
            total: 0,
            page: 1,
            size: 3,
            teamSize: 1000,
            teamPage: 1,
            refereeSize: 1000,
            refereePage: 1,
            editMatch: null,
            overlay: false
        }
    },
    created(){
        this.getAllMatches()
        this.getTeams()
        this.getAllReferees()
    },
    components:{
        MatchForm
    },
    computed:{
        paginationLength(){
          return Math.ceil(this.total / this.size)
        }
    },
    methods:{
        getAllMatches(){
            const params = {size: this.size, page:this.page}
            Match.getMatches(params).then(res =>{
                const{matches, total} = res.data
                this.matches = matches
                this.total = total
            })
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
        formatDate(date){
            return new Date(date).toISOString().substr(0, 10)
        },
        getTeamById(id){
            let teamName = ''
            this.teams.forEach(element =>{
                if (element.id === id){
                    teamName = element.name
                }
            })
            return teamName
        },
        getRefereeById(id){
            let refereeFullName = ''
            this.referees.forEach(element =>{
                if(element.id === id){
                    refereeFullName = element.first_name + ' ' + element.last_name
                }
            })
            return refereeFullName
        },
        createMatch(match){
            Match.createMatch(match).then(this.getAllMatches);
        },
        removeMatch(id){
            Match.deleteMatch(id).then(this.getAllMatches)
        },
        updateMatch(match){
            const { id } = this.editMatch
            Match.updateMatch(id, match).then(res =>{
                this.getAllMatches();
                this.overlay = false;
                this.editMatch = null;
            })
        },
        openOverlay(match){
            this.editMatch = match
            this.overlay = true            
        }
    },
    watch:{
        page(){
            this.getAllMatches()
        }
    }
}
</script>
<style>
    .numberOfMatches{
        width:100%;
        text-align: center;
        margin-top: 10px;
    }
</style>