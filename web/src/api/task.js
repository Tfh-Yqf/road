import request from '@/utils/request';


// user
export function userlist_name(params) {
    return request({ url: `/api_task/get_userlist_name`, method: 'get', params })
}

export function get_task(params) {
    return request({ url: `/api_task/get_task?skip=`+params, method: 'get' })
}


export function delete_task(params) {
    return request({ url: `/api_task/delete_task?task_id=`+params, method: 'get' })
}

export function push_task(params) {
    return request({ url: `/api_task/push_task`, method: 'post',params })
}

export function update_task(params) {
    return request({ url: `/api_task/update_task`, method: 'post',params })
}

export function task_chart(params) {
    return request({ url: `/api_task/task_chart`, method: 'get' })
}
