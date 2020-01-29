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
                <tr v-for="(player, index) in players" :key="index">
                <td>{{ player.first_name }}</td>
                <td>{{ player.last_name }}</td>
                <td>{{ formatDate(player.date_of_birth) }}</td>
                <td>{{ getTeamById(player.team_id) }}</td>
                <td>
                    <button @click="openOverlay(player)">Edit</button>
                </td>
                <td>
                    <button @click="removePlayer(player.id)">Remove</button>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <v-pagination
            v-model="page"
            :length="paginationLength"
        ></v-pagination>
        <div class="numberOfPlayers">Number of players: {{ total }}</div>
        <player-form @playerFormSubmitted="createPlayer($event)">
        </player-form>
        <v-overlay :value="overlay" :opacity="0.9">
            <v-btn
                icon
                @click="overlay = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <player-form
            :originalPlayer="editPlayer" 
            @playerFormSubmitted="updatePlayer($event)">
            </player-form>
        </v-overlay>
    </div>
</template>
<script>
import axios from 'axios'
import PlayerForm from '~/components/PlayerForm.vue'
import Player from '~/services/Player'
import Teams from '~/services/Teams'

export default {
    data(){
        return{
            players: [],
            teams: [],
            total: 0,
            overlay: false,
            editPlayer: null,
            page: 1,
            size: 3,
            teamSize: 10,
            teamPage: 1
        }
    },
    created(){
        this.getAllPlayers();
        this.getTeams();
    },
    components:{
        PlayerForm
    },
    computed:{
        paginationLength(){
          return Math.ceil(this.total / this.size)
        }  
    },
    methods:{
        createPlayer(player){
            Player.createPlayer(player).then(this.getAllPlayers);       
        },
        removePlayer(id){
            Player.deletePlayer(id).then(response => {
                this.getAllPlayers();
            })       
        },
        getTeams(){
            const params = {size: this.teamSize, page: this.teamPage}
            Teams.getTeams(params).then((res)=>{
                const {teams, total } = res.data
                this.teams = teams
            });
        },
        getAllPlayers(){
            const params = { size: this.size, page: this.page }
            Player.getPlayers(params).then(res =>{
                const { players, total } = res.data
                this.players = players
                this.total = total
            })
        },
        openOverlay(player){
            this.editPlayer = player
            this.overlay = true
            
        },
        updatePlayer(player){
            const { id } = this.editPlayer
            Player.updatePlayer(id, player).then(res=>{
                this.getAllPlayers();
                this.overlay = false;
                this.editPlayer = null;
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
            this.getAllPlayers()
        }
    }
}
</script>
<style>
    .numberOfPlayers{
        width:100%;
        text-align: center;
        margin-top: 10px;
    }
</style>