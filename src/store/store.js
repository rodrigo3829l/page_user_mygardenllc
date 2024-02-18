import { ref } from "vue"
import { defineStore } from 'pinia'
import { api } from "@/axios/axios";

export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const expireIn = ref (null);
    const name = ref (null);
    const email = ref (null);

    const login = async (email, pass) => {
        const datos = {
            email: email,
            password: pass 
        }
        try {
            const {data} = await api.post('/user/login', datos)
            console.log(data)
            console.log('desde el store')

            token.value = data.token;
            expireIn.value = data.expiresIn

            // name.value = data.name
            // email.value = data.email

            setTime();
            const resp = await api({
                method: 'GET',
                url : '/user/protected',
                headers: {
                    'Authorization' : 'Bearer ' + token.value,
                },
            })
            console.log(resp)
            localStorage.setItem('rol', resp.data.tipo)
            localStorage.setItem('token', token.value)
            return({exito : 'inicio se sesion exitoso'})
        } catch (error) {
            return({error: error.response.data.error})
        }
    }
    const logout = async () => {
        try {
            localStorage.removeItem('rol');
            localStorage.removeItem('token');
            await api.get('/user/logout')
        } catch (error) {
            console.log(error)
        } finally{
            // localStorage.clear();
            localStorage.removeItem('rol');
            localStorage.removeItem('token');
            resetStore();
        }
    }
    const resetStore = () =>{
        token.value = null;
        expireIn.value = null;
        name.value = null
        email.value = null
        // localStorage.clear();
        localStorage.removeItem('rol');
        localStorage.removeItem('token');
    }
    const setTime = () =>{
        setTimeout(() => {
            refreshToken();
        }, expireIn.value * 1000 - 6000)
    }
    
    const refreshToken = async () =>{
        try {
            const {data} = await api.get ('/user/refresh');
            token.value = data.token;
            expireIn.value = data.expiresIn;

            const resp = await api({
                method: 'GET',
                url : '/user/protected',
                headers: {
                    'Authorization' : 'Bearer ' + token.value,
                },
            })
            console.log(resp.data)
            localStorage.setItem('rol', resp.data.tipo)
            localStorage.setItem('token', token.value,);
            setTime();
        } catch (error) {
            console.log(error)
            // localStorage.removeItem('tipo')
        //     localStorage.removeItem('tipo');
        // localStorage.removeItem('venta');
        }
    }
    const initializeStore = () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken ) {
            token.value = storedToken;
            setTime();
        }
    };

    return {
        token,
        expireIn,
        login,
        logout,
        refreshToken,
        initializeStore
    }
  })