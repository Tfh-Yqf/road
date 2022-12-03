
//	计算两点之间直线距离
const algorithm = (point1, point2)=> {
    let [x1, y1] = point1;
    let [x2, y2] = point2;
    let Lat1 = rad(x1); // 纬度
    let Lat2 = rad(x2);
    let a = Lat1 - Lat2;//	两点纬度之差
    let b = rad(y1) - rad(y2); //	经度之差
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(b / 2), 2)));
    //	计算两点距离的公式
    s = s * 6378137.0;//	弧长等于弧度乘地球半径（半径为米）
    s = Math.round(s * 10000) / 10000;//	精确距离的数值
    return s;

}

//	角度转换成弧度
const rad =(d) =>{
    return d * Math.PI / 180.00;
};


export function GetDistance(data){
    console.log(data);
    var path1 = [data[0].lng,data[0].lat];
    var path2 = [data[1].lng,data[1].lat];
    return (algorithm(path1,path2)/1000).toFixed(4);
}
