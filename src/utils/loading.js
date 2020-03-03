import {Loading} from 'element-ui'

let loading;

export function setLoading(data){
    loading = Loading.service(data)
}

export function closeLoading(){
    loading.close();
}