# 接口文档

## 124.71.68.240:8081

### 用户名密码登录
~~~
// Get : /user/{username}/{password}

{
    username :'',
    password :''
}
~~~

### 发送邮箱验证码

~~~
//Get : /user/{email}

{
    email:''
}
~~~

### 注册

~~~
//Post : /user/{code}  

下面的 放在body里

{
    name:'',
    email:'',
    is_admin:'', 默认传给我个0；
    password:'',
    telephone(先让用户随便填一个就行，不绑定）
}
~~~


## 124.71.68.240:8083

### 上传拍摄的裂纹数据
~~~
// Post : /data 放在body里
{
    detail:'', //详情
    title:'',  //标题
  
      latitude:0.00       //	纬度，浮点数，范围为-90~90，负数表示南纬
        longitude:0.00      //	经度，浮点数，范围为-180~180，负数表示西经
        speed:0.00          //  速度，浮点数，单位m/s
        accuracy:0.00       //	位置的精确度
        altitude:0.00	    //  高度，单位 m
        verticalAccuracy:0.00 //垂直精度，单位 m（Android 无法获取，返回 0）
        horizontalAccuracy:0.00	 // 水平精度，单位 m
        address:''	        //地址信息,省市区+详细地址
   
    road_name:'', //道路名
    image:'', //image_link
}
~~~

### 拍照上传

~~~
    使用图床
~~~

## 124.71.68.240:8082

### 没有完成的检测任务

~~~
// Get : /tasks/not_finish/{username}/{currentPage}
我返回任务 
~~~

### 已完成的检测任务

~~~
 Get : /tasks/finish/{username}/{currentPage}
我返回任务
~~~


