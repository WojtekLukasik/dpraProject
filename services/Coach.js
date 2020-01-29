import axios from 'axios'

const api = 'http://localhost:4200/coaches'

const getCoaches = ({page, size}) => {
    let params = {}
    if (page !== null && size !== null) {
        params = { size, page }
    }
    
    return axios.get(api, { params })
}

const createCoach = (payload) => axios.post(api, payload)

const deleteCoach = (id) => axios.delete(`${api}/${id}`)

const updateCoach = (id, payload) => axios.put(`${api}/${id}`, payload)

export default{
    getCoaches,
    createCoach,
    deleteCoach,
    updateCoach
}