import axios from 'axios'

const api = 'http://localhost:4200/players'

const getPlayers = ({page, size}) => {
    let params = {}
    if (page !== null && size !== null) {
        params = { size, page }
    }
    
    return axios.get(api, { params })
}

const createPlayer = (payload) => axios.post(api, payload)

const deletePlayer = (id) => axios.delete(`${api}/${id}`)

const updatePlayer = (id, payload) => axios.put(`${api}/${id}`, payload)


export default{
    getPlayers,
    createPlayer,
    deletePlayer,
    updatePlayer
}