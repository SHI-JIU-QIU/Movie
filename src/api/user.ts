import serve from './index'


export const apiLogin = (data: any) => {
    return serve({
        url: '/login',
        method: 'POST',
        params: data
    })
}

export const apiRegister = (data: any) => {
    return serve({
        url: '/register',
        method: 'POST',
        params: data
    })
}

export const apiGetUserById = (data: any) => {
    return serve({
        url: '/selectUserById',
        method: 'GET',
        params: { id: data }
    })
}


export const apiUpdateUser = (data: any) => {
    return serve({
        url: '/updateUser',
        method: 'POST',
        params: {
            username: data.username,
            email: data.email,
            phone: data.phone,
          
        }
    })
}




export const apimodifyUserPwd = (data: any) => {
    return serve({
        url: '/modifyUserPwd',
        method: 'POST',
        params: {
            oldPwd: data.oldPwd,
            newPwd: data.newPwd
        }
    })
}

export const apilogout = () => {
    return serve({
        url: '/logout',
        method: 'GET',
    })
}


export const apiselectMyBalance = () => {
    return serve({
        url: '/selectMyBalance',
        method: 'GET',
    })
}