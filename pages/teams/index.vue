<template>
    <div>       
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Team Name</th>
                <th class="text-left">City</th>
                <th class="text-left">Edit</th>
                <th class="text-left">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(team, index) in teams" :key="index">
                <td>{{ team.name }}</td>
                <td>{{ team.city }}</td>
                <td>
                    <button @click="openOverlay(team)">Edit</button>
                </td>
                <td>
                    <button @click="removeTeam(team, index)">Remove</button>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-pagination
            v-model="page"
            :length="paginationLength"
        ></v-pagination>
        <div class="numberOfTeams">Number of teams: {{ total }}</div>
        <team-form @teamFormSubmitted="createTeam($event)">
        </team-form>
        <v-overlay :value="overlay" :opacity="0.9">
            <v-btn
                icon
                @click="overlay = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <team-form
            :originalTeam="editTeam" 
            @teamFormSubmitted="updateTeam($event)">
            </team-form>
        </v-overlay>
    </div>
</template>

<script>
import axios from 'axios'
import TeamForm from '~/components/TeamForm'
import Teams from '~/services/Teams'

export default {
    data () {
        return {
            teams: [],
            total: 0,
            overlay: false,
            editTeam: null,
            page: 1,
            size: 3
        }
    },
    created () {
        this.getTeams();
    },
    components:{
        TeamForm
    },
    computed:{
        paginationLength(){
          return Math.ceil(this.total / this.size)
        } 
    },
    methods:{
        removeTeam(team, index){
            const name = team.name;
            Teams.deleteTeam(name).then(this.getTeams)
        },
        getTeams(){
            const params = {size: this.size, page: this.page}
            Teams.getTeams(params).then(res => {
                const { teams, total } = res.data
                this.teams = teams
                this.total = total
            })
        },
        createTeam(team){
            Teams.createTeam(team).then(this.getTeams);
        },
        openOverlay(team){
            this.editTeam = team
            this.overlay = true
        },
        updateTeam(team){
            const { id } = this.editTeam
            Teams.updateTeam(id, team).then(res=>{
                this.getTeams()
                this.overlay = false
                this.editTeam = null
            })
        }

    },
    watch:{
        page(){
            this.getTeams()
        }
    }
}
</script>
<style>
    .numberOfTeams{
        width:100%;
        text-align: center;
        margin-top: 10px;
    }
</style>