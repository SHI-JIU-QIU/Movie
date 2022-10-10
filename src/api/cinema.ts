import serve from './index'

export const apiGetCinemaList = () => {
    return serve({
        url: '/selectAllCinemas',
        method: 'GET',
    })
}

export const apiSelectCinemaByScore = () => {
    return serve({
        url: '/selectCinemaByScore',
        method: 'GET',
    })
}

export const apiSelectCinemaById = (data: any) => {
    return serve({
        url: '/seleceCinemaById',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}


export const apiGetCinemaByMovieId = (data: any) => {
    return serve({
        url: '/selectDetailCinema',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}

export const apiGetMovieByCinemaId = (data: any) => {
    return serve({
        url: '/selectMovieByCinemaId',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}


export const apiGetHallList = (data: any) => {
    return serve({
        url: '/selectfromCinema',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}


export const apiselectfromHall = (data: any) => {
    return serve({
        url: '/selectfromHall',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}

export const apiselectAllHall = (data: any) => {
    return serve({
        url: '/selectAllHall',
        method: 'GET',
    })
}


export const apiselectOrdersByScheduleId = (data: any) => {
    return serve({
        url: '/selectOrdersByScheduleId',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}