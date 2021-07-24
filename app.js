import axios from 'axios'


const url = 'https://api.mangadex.org'

const res = await axios.get(`${url}/manga`)
    .then(data => {
        return data.data
    })

console.log(res)