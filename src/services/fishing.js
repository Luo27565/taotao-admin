import service from "@/utils/request"

export function getFishing(params){
    return service.request({
        method:'get',
        url:'/ShowFishing',
        params
    })
}

export function countFishing(){
    return service.request({
        method:'get',
        url:'/CountFishing'
    })
}

export function openOnSale(data){
    return service.request({
        method:'post',
        url:'/Startspecial',
        data
    })
}

export function closeOnSale(data){
    return service.request({
        method:'post',
        url:'/Stopspecial',
        data
    })
}