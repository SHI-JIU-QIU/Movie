import serve from './index'

export const apiGetHotNews = () => {
    return serve({
        url: '/selectAllConsult',
        method: 'GET',
    })
}

export const apiGetNewsById = (data:any) => {
    return serve({
        url: '/selectConsultById',
        method: 'GET',
        params:{
            id:data.id
        }
    })
}