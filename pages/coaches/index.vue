<template>
    <div>       
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">First Name</th>
                <th class="text-left">Last Name</th>
                <th class="text-left">Date of birth</th>
                <th class="text-left">Team</th>
                <th class="text-left">Edit</th>
                <th class="text-left">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(coach, index) in coaches" :key="index">
                <td>{{ coach.first_name }}</td>
                <td>{{ coach.last_name }}</td>
                <td>{{ formatDate(coach.date_of_birth) }}</td>
                <td>{{ getTeamById(coach.team_id) }}</td>
                <td>
                    <button @click="openOverlay(coach)">Edit</button>
                </td>
                <td>
                    <button @click="removeCoach(coach.id)">Remove</button>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-pagination
            v-model="page"
            :length="paginationLength"
        ></v-pagination>
        <div class="numberOfCoaches">Number of Coaches: {{ total }}</div>
        <coach-form @coachFormSubmitted="createCoach($event)">
        </coach-form>
        <v-overlay :value="overlay" :opacity="0.9">
            <v-btn
                icon
                @click="overlay = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <coach-form
            :originalCoach="editCoach" 
            @coachFormSubmitted="updateCoach($event)">
            </coach-form>
        </v-overlay>
    </div>
</template>
<script>
import axios from 'axios'
import CoachForm from '~/components/CoachForm.vue'
import Coach from '~/services/Coach'
import Teams from '~/services/Teams'

export default {
    data(){
        return{
            coaches: [],
            teams: [],
            total: 0,
            overlay: false,
            editCoach: null,
            page: 1,
            size: 3,
            teamSize: 10,
            teamPage: 1
        }
    },
    created(){
        this.getAllCoaches();
        this.getTeams();
    },
    components:{
        CoachForm
    },
    computed:{
        paginationLength(){
          return Math.ceil(this.total / this.size)
        }  
    },
    methods:{
        createCoach(coach){
            Coach.createCoach(coach).then(this.getAllCoaches);       
        },
        removeCoach(id){
            Coach.deleteCoach(id).then(response => {
                this.getAllCoaches();
            })       
        },
        getTeams(){
            const params = {size: this.teamSize, page: this.teamPage}
            Teams.getTeams(params).then((res)=>{
                console.log(res.data)
                const {teams, total } = res.data
                this.teams = teams
            });
        },
        getAllCoaches(){
            const params = { size: this.size, page: this.page }
            Coach.getCoaches(params).then(res =>{
            const { coaches, total } = res.data
            this.coaches = coaches
            this.total = total
            console.log(this.coaches)
            })
        },
        openOverlay(coach){
            this.editCoach = coach
            this.overlay = true
            console.log(this.editCoach)
        },
        updateCoach(coach){
            const { id } = this.editCoach
            Coach.updateCoach(id, coach).then(res=>{
                this.getAllCoaches();
                this.overlay = false;
                this.editCoach = null;
            });
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
        }
    },
    watch:{
        page(){
            this.getAllCoaches()
        }
    }
}
</script>
<style>
    .numberOfCoaches{
        width:100%;
        text-align: center;
        margin-top: 10px;
    }
</style>