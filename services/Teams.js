import axios from 'axios'

const api = 'http://localhost:4200/teams'

const getTeams = ({ page, size }) => {
    let params = {}
    if(page !== null && size !== null){
        params = {size, page}
    }

    return axios.get(api, { params })
}

const createTeam = (payload) => axios.post(api, payload)

const deleteTeam = (name) => axios.delete(`${api}/${name}`)

const getTeamById = (id) => axios.get(`${api}/${id}`)

const updateTeam = (id, payload) => axios.put(`${api}/${id}`, payload)

export default{
    getTeams,
    createTeam,
    deleteTeam,
    getTeamById,
    updateTeam
}