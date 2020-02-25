import service from "@/utils/request"

export function getCategory(){
    return service.request({
        method:'get',
        url:'/ShowCategory'
    })
}

export function updateCategory(data){
    return service.request({
        method:'post',
        url:'/CategoryUpdate',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data
    })
}

export function insertCategory(data){
    return service.request({
        method:'post',
        url:'/AddCategory',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        data
    })
}