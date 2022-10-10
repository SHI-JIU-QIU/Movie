import { defineStore } from "pinia"
import { apiLogin, apiRegister ,apiGetUserById} from '@/api/user'


interface User {
    avatar: string
    email: string
    header?: string
    id: number
    password: string
    phone: string
    type: number
    username: string
}

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            user: {} as User
        }
    },

    getters: {

    },
    actions: {
        async reqLogin(data: any) {
            let result = await apiLogin(data)
            if (result.code == 200) {
                this.user = result.data
                return true
            }
            else {
                return false
            }
        },
        async reqRegister(data: any) {
            let result = await apiRegister(data)
            console.log(result);
            if (result.code == 200) {
                this.user = result.data
                return true
            }
            else {
                return false
            }
        },
        async reqGetUserById(data: any) {
            let result = await apiGetUserById(data)
            if (result.code == 200) {
                this.user = result.data
                return true
            }
            else {
                return false
            }
        }
    }
})
