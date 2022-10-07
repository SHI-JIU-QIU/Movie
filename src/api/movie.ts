import serve from './index'

export const apiHotPlayMovie = (data: any) => {
    return serve({
        url: '/sortAllMovie',
        method: 'GET',
        params: { name: data }
    })
}

export const apiToBePlayMovie = () => {
    return serve({
        url: '/afterMovie',
        method: 'POST',
    })
}

export const apiGetMovieById = (data: any) => {
    return serve({
        url: '/selectMovieById',
        method: 'GET',
        params: { id: data }
    })
}

export const apiGetCarouselImg = () => {
    return serve({
        url: '/selectMovieByCarousel',
        method: 'GET',
    })
}