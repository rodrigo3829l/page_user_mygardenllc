import { ref } from "vue"
import { defineStore } from 'pinia'
import { api } from "@/axios/axios.js"

export const useUserStore = defineStore('user', () =>{
    const token = ref(null);
    const expireIn = ref (null);
    const tipo = ref(null)

    const login = async (user, pass) =>{
        const datos = {
            userName: user,
            password: pass 
        }
        try {
            const {data} = await api.post('/user/login', datos)
            token.value = data.token;
            expireIn.value = data.expiresIn
            // setTime();
            const resp = await api({
                method: 'GET',
                url : '/auth/protected',
                headers: {
                    'Authorization' : 'Bearer ' + token.value,
                },
            })
            // console.log(resp.data)
            localStorage.setItem('tipo', resp.data.tipo)
            const ventas = []
            localStorage.setItem('venta', JSON.stringify(ventas))
            return({exito : 'inicio se sesion exitoso'})
        } catch (error) {
            console.log(error.response.data.error);
            // alert(error.response.data.error)
            return({error: error.response.data.error})
        }
    }
})