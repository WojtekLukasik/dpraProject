<template>
    <div>       
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">First Name</th>
                <th class="text-left">Last Name</th>
                <th class="text-left">Date of birth</th>
                <th class="text-left">Edit</th>
                <th class="text-left">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(referee, index) in referees" :key="index">
                <td>{{ referee.first_name }}</td>
                <td>{{ referee.last_name }}</td>
                <td>{{ formatDate(referee.date_of_birth) }}</td>
                <td>
                    <button @click="openOverlay(referee)">Edit</button>
                </td>
                <td>
                    <button @click="removeReferee(referee.id)">Remove</button>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <div class="numberOfReferees">Number of referees: {{ total }}</div>
        <referee-form @refereeFormSubmitted="createReferee($event)">
        </referee-form>
        <v-overlay :value="overlay" :opacity="0.9">
            <v-btn
                icon
                @click="overlay = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <referee-form
            :originalReferee="editReferee" 
            @refereeFormSubmitted="updateReferee($event)">
            </referee-form>
        </v-overlay>
    </div>
</template>

<script>
import axios from 'axios'
import RefereeForm from '~/components/RefereeForm.vue'
import Referee from '~/services/Referee'

export default {
    data () {
        return {
            referees: [],
            total: 0,
            overlay: false,
            editReferee: null,
            page: 1,
            size: 3
        }
    },
    created () {
        this.getAllReferees();
    },
    components:{
        RefereeForm
    },
    methods:{
        getAllReferees(){
            const params = {size: this.size, page: this.page}
            Referee.getReferees(params).then(res =>{
                const {referees, total} = res.data
                this.referees = referees,
                this.total = total
            })
        },
        removeReferee(id){
            Referee.deleteReferee(id).then(response=>{
                this.getAllReferees()
            })
        },
        onRefereeCreated(referee){
            this.referees.push(referee);
        },
        createReferee(referee){
            Referee.createReferee(referee).then(this.getAllReferees)
        },
        openOverlay(referee){
            this.editReferee = referee
            this.overlay = true
        },
        formatDate(date){
            return new Date(date).toISOString().substr(0, 10)
        },
        updateReferee(referee){
            const { id } = this.editReferee
            Referee.updateReferee(id, referee).then(res=>{
                this.getAllReferees()
                this.overlay = false
                this.editPlayer = null;
            })
        }
    }
}
</script>
<style>
    .numberOfReferees{
        width:100%;
        text-align: center;
        margin-top: 10px;
    }
</style>