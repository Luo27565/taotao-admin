import service from "@/utils/request"

export function getCategory(){
    return service.request({
        method:'get',
        url:'/ShowCategory'
    })
}