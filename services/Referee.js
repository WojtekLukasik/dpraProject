import axios from 'axios'

const api = 'http://localhost:4200/referees'

const getReferees = ({page, size}) => {
    let params = {}
    if (page !== null && size !== null) {
        params = { size, page }
    }
    
    return axios.get(api, { params })
}

const createReferee = (payload) => axios.post(api, payload)

const deleteReferee = (id) => axios.delete(`${api}/${id}`)

const updateReferee = (id, payload) => axios.put(`${api}/${id}`, payload)

export default{
    getReferees,
    createReferee,
    deleteReferee,
    updateReferee
}