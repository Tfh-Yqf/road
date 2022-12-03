# 接口文档

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
//Get : /user/sendemail

{
    email:''
}
~~~

### 注册

~~~
//Post : /user/register 放在body里

{
    username:'',
    email:'',
    password:'',
    code:''
}
~~~

### 上传拍摄的裂纹数据
~~~
// Post : /app/upload_crack  放在body里
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
    address:''	        //地址信息,省市区+详细地
    road_name:'', //道路名
    image:'', //image_link
}
~~~

### 拍照上传

~~~
// Post : /app/upload_image 放在body里
{
    name	String	否	multipart 提交时，表单的项目名，默认为 file
    file	File	否	要上传的文件对象，仅H5（2.6.15+）支持
    uri	String	是	文件的本地地址
}
~~~

### 没有完成的检测任务

~~~
// Get : /app/not_finish
{
    username : ''
}
~~~

### 已完成的检测任务

~~~
// Get : /app/finish
{
    username : ''
}
~~~