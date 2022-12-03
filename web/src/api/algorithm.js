import request from "@/utils/request";

// get_track_list
export function get_track_list(data){
    return request({url:'/api_task/get_track_list',method:'get'})
}
// update_track
export function update_track(data){
    return request({url:'/api_task/update_track',method:'post'})
}