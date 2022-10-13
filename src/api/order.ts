import serve from './index'


export const apiBuyTickets = (data: any) => {

    return serve({
        url: '/buyTickets',
        method: 'POST',
        params: {
            scheduleId: data.scheduleId,
            position: data.position,
            price: data.price
        }
    })
}

export const apiselectOrderByUserName = (data: any) => {

    return serve({
        url: '/selectOrderByUserName',
        method: 'GET',
        params: {
            username: data.username
        }
    })
}



export const apiapplyForRefund = (data: any) => {

    return serve({
        url: '/applyForRefund',
        method: 'POST',
        params: {
            orderId: data.orderId
        }
    })
}

export const apipayOrder = (data: any) => {

    return serve({
        url: '/payOrder',
        method: 'POST',
        params: {
            orderId: data.orderId,
            userId: data.userId
        }
    })
}
