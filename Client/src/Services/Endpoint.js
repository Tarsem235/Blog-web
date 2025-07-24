import axios from 'axios'
export const BaseUrl = 'http://localhost:5000'
const instanse = axios.create({
    BaseUrl,
    withCredentials:true
})

export const get = (url,params)=>instanse.get(url,(params))
export const post = (url ,data)=> instanse.post(url,data)
export const patch = (url , data)=> instanse.post(url,data)
export const dele = (url)=>instanse.delete(url)