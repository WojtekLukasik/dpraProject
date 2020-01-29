import axios from 'axios'

const api = 'http://localhost:4200/matches'

const getMatches = ({page, size}) =>{
    let params = {}
    if(page !== null && size !== null){
        params = {size, page}
    }

    return axios.get(api, {params})
}

const createMatch = (payload) => axios.post(api, payload)

const deleteMatch = (id) => axios.delete(`${api}/${id}`)

const updateMatch = (id, payload) => axios.put(`${api}/${id}`, payload)


export default{
    getMatches,
    createMatch,
    deleteMatch,
    updateMatch
}