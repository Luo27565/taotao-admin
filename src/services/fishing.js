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