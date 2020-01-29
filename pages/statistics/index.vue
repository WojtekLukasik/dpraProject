<template>
  <div>{{ playersCount }}</div>
</template>

<script>
import Player from '~/services/Player'

export default {
    data(){
        return{
            playersCount: 0
        }
    },
    created () {
        this.getAllPlayers()
    },
    methods:{
        getAllPlayers(){
            const params = {}
            Player.getPlayers(params).then(({data})=>{
                this.playersCount = data.total
            })
        }

    }
}
</script>
