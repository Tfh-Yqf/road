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

# 接口文档2.0

### 获取下拉用户列表

~~~
    GET: 8082:/task/get_userlist_name
    return{
        code:0,
        message:'',
        data:[{username:'admin',id:0},{username:'谭福华',id:2},{username:'齐辛格',id:3}]
    } 
~~~



### 发布任务
~~~
POST: 8082:/task/push_task

Example data:
{
    "form": {
        "task_id": "TA000012", 
        "person": "admin", 
        "is_finish": "false", 
        "beizhu": "及时检测", 
        "start_date": "2022-11-27", 
        "end_date": "2022-11-27"
    }, 
    "now_city": {
        "province": "山东省", 
        "city": "威海市", 
        "district": "环翠区"
    }, 
    "task": [
        {
            "cnt": 5, 
            "person": "admin", 
            "name": "Task1", 
            "beizhu": "山东省威海市环翠区", 
            "all_marker": [
                [
                    122.05566, 
                    37.533512
                ], 
                [
                    122.059394, 
                    37.532627
                ], 
                [
                    122.056862, 
                    37.530687
                ]
            ], 
            "all_line": [
                [
                    [
                        122.059394, 
                        37.532627
                    ], 
                    [
                        122.05566, 
                        37.533512
                    ]
                ], 
                [
                    [
                        122.056862, 
                        37.530687
                    ], 
                    [
                        122.059394, 
                        37.532627
                    ]
                ]
            ],
            "all_distance":[1.4,0.4,1.3]
        }
    ]
}

return{
    code:0,
    message:''
}
~~~

### 获取任务list

~~~
GET: 8082/task/get_task?skip=?

一次返回最多80个数据

return {
    code:0,
    message:'',
    data:[
{
    "form": {
        "task_id": "TA000012", 
        "person": "admin", 
        "is_finish": "false", 
        "beizhu": "及时检测", 
        "start_date": "2022-11-27", 
        "end_date": "2022-11-27"
    }, 
    "now_city": {
        "province": "山东省", 
        "city": "威海市", 
        "district": "环翠区"
    }, 
    "task": [
        {
            "cnt": 5, 
            "person": "admin", 
            "name": "Task1", 
            "beizhu": "山东省威海市环翠区",
            image:['','',''], // 用户拍摄的图片
            result_image:['','',''], // 最终算法检测的图片
            result:[false,false,true] //  最终算法检测的结果
            "all_marker": [
                [
                    122.05566, 
                    37.533512
                ], 
                [
                    122.059394, 
                    37.532627
                ], 
                [
                    122.056862, 
                    37.530687
                ]
            ], 
            "all_line": [
                [
                    [
                        122.059394, 
                        37.532627
                    ], 
                    [
                        122.05566, 
                        37.533512
                    ]
                ], 
                [
                    [
                        122.056862, 
                        37.530687
                    ], 
                    [
                        122.059394, 
                        37.532627
                    ]
                ]
            ],
            "all_distance":[1.4,0.4,1.3]
        }
    ]
},
{
    "form": {
        "task_id": "TA000012", 
        "person": "admin", 
        "is_finish": "false", 
        "beizhu": "及时检测", 
        "start_date": "2022-11-27", 
        "end_date": "2022-11-27"
    }, 
    "now_city": {
        "province": "山东省", 
        "city": "威海市", 
        "district": "环翠区"
    }, 
    "task": [
        {
            "cnt": 5, 
            "person": "admin", 
            "name": "Task1", 
            "beizhu": "山东省威海市环翠区", 
            image:['','',''], // 用户拍摄的图片
            result_image:['','',''], // 最终算法检测的图片
            result:[false,false,true] //  最终算法检测的结果
            "all_marker": [
                [
                    122.05566, 
                    37.533512
                ], 
                [
                    122.059394, 
                    37.532627
                ], 
                [
                    122.056862, 
                    37.530687
                ]
            ], 
            "all_line": [
                [
                    [
                        122.059394, 
                        37.532627
                    ], 
                    [
                        122.05566, 
                        37.533512
                    ]
                ], 
                [
                    [
                        122.056862, 
                        37.530687
                    ], 
                    [
                        122.059394, 
                        37.532627
                    ]
                ]
            ],
            "all_distance":[1.4,0.4,1.3]
        }
    ]
}
  ]
}
~~~

### 删除任务

~~~
GET: 8082/task/delete_task?task_id=?

return {
    code:0,
    message:''
}
~~~

### 任务更新

~~~
POST: 8082/task/update_task

example data:
{
    "form": {
        "task_id": "TA000012", 
        "person": "admin", 
        "is_finish": "false", 
        "beizhu": "及时检测", 
        "start_date": "2022-11-27", 
        "end_date": "2022-11-27"
    }, 
    "now_city": {
        "province": "山东省", 
        "city": "威海市", 
        "district": "环翠区"
    }, 
    "task": [
        {
            "cnt": 5, 
            "person": "admin", 
            "name": "Task1", 
            "beizhu": "山东省威海市环翠区",
            "all_marker": [
                [
                    122.05566, 
                    37.533512
                ], 
                [
                    122.059394, 
                    37.532627
                ], 
                [
                    122.056862, 
                    37.530687
                ]
            ], 
            "all_line": [
                [
                    [
                        122.059394, 
                        37.532627
                    ], 
                    [
                        122.05566, 
                        37.533512
                    ]
                ], 
                [
                    [
                        122.056862, 
                        37.530687
                    ], 
                    [
                        122.059394, 
                        37.532627
                    ]
                ]
            ],
            "all_distance":[1.4,0.4,1.3]
        }
    ]
}

return{
    code:0,
    message:''
}
~~~

### 任务数据可视化板块

~~~
GET: 8082/task/task_chart

return {
    code:0,
    message:'',
    data:{
        sum_task:3113, // 任务总数
        sum_track:8231, // 检测总数
        circle_echart_date:{
            { value: 1048, name: '正常' },
            { value: 735, name: '细微' },
            { value: 580, name: '中等' },
            { value: 484, name: '严重' },
            { value: 300, name: '完全损坏' }
        }, // 若数据暂时没有，return fake data 
        Week_Track_echart_data:[
            { 日期: '11月18日', 正常: 72, 裂缝: 53},
            { 日期: '11月19日', 正常: 60, 裂缝: 58},
            { 日期: '11月20日', 正常: 80, 裂缝: 70},
            { 日期: '11月21日', 正常: 43, 裂缝: 75},
            { 日期: '11月22日', 正常: 83, 裂缝: 90},
            { 日期: '11月23日', 正常: 86, 裂缝: 110},
            { 日期: '11月24日', 正常: 82, 裂缝: 120},
            { 日期: '11月25日', 正常: 100, 裂缝: 140},
            { 日期: '11月26日', 正常: 120, 裂缝: 130},
            { 日期: '11月27日', 正常: 92, 裂缝: 120},
        ], // 进10日检测情况
        YearChargeEcharts_data:{
            years:"2022", // 当年
            all_track:3113, // 总检测数
            have_tarck:2001, // 检测中判断为裂缝的
            no_track:1112 // 检测中判断为正常的
        }, // 年检测情况
        ThreeEcharts_data:[
            { value: 60, name: '真裂缝-真' }, // 真裂缝检测为真
            { value: 40, name: '真裂缝-假' }, // 真裂缝检测为假
            { value: 20, name: '假裂缝-真' }, // 假裂缝检测为真
            { value: 80, name: '假裂缝-假' }  // 假裂缝检测为假
        ] // 检测准确率图表
     }
}
~~~

### 首页板块

~~~
GET: 8082/task/get_home?province=?

return{
    code:0,
    message:'',
    data: [
      { name: "河北省", value: 10000 },
      { name: "山西省", value: 9000 },
      { name: "辽宁省", value: 4000 },
      { name: "吉林省", value: 5000 },
      { name: "黑龙江省", value: 6000 },
      { name: "江苏省", value: 2000 },
      { name: "浙江省", value: 8800 },
      { name: "安徽省", value: 7000 },
      { name: "福建省", value: 4600 },
      { name: "江西省", value: 5200 },
      { name: "山东省", value: 5000 },
      { name: "河南省", value: 5500 },
      { name: "湖北省", value: 5060 },
      { name: "湖南省", value: 3000 },
      { name: "广东省", value: 6900 },
      { name: "海南省", value: 6000 },
      { name: "四川省", value: 3120 },
      { name: "贵州省", value: 5350 },
      { name: "云南省", value: 4000 },
      { name: "陕西省", value: 8890 },
      { name: "甘肃省", value: 7740 },
      { name: "青海省", value: 4660 },
      { name: "台湾省", value: 4440 },
      { name: "内蒙古自治区", value: 3350 },
      { name: "广西壮族自治区", value: 3700 },
      { name: "西藏自治区", value: 2000 },
      { name: "宁夏回族自治区", value: 2000 },
      { name: "新疆维吾尔自治区", value: 2000 },
      { name: "北京市", value: 8000 },
      { name: "天津市", value: 9000 },
      { name: "上海市", value: 10000 },
      { name: "重庆市", value: 7000 },
      { name: "香港特别行政区", value: 9000 },
      { name: "澳门特别行政区", value: 6000 },
      { name: "南海诸岛", value: 3800 }
    ]; // if province == 'china'
    data:[
      {name: '漳州市', value: 10000},
      {name: '南平市', value: 9000},
      {name: '三明市', value: 8000},
      {name: '龙岩市', value: 7000},
      {name: '厦门市', value: 2000},
      {name: '莆田市', value: 4200},
      {name: '福州市', value: 5000},
      {name: '泉州市', value: 6900},
      {name: '宁德市', value: 7090},
    ] // if province == '福建省'
}
~~~

## 权限板块 
~~~
权限分为管理员权限（最高）,普通权限（简单的树）

// 注意：以下接口：以管理员开头的要验证管理员权限

权限树: 
// 简单来说就是每一个板块都有一个权限组，权限组里有[页面的权限]
// 管理员可以增加权限组，不可增加页面权限
// 以下为初始权限树
[
  {
    title: '系统管理',
    value: '0',
    key: 0,
    children: [
      {
        title: '角色管理',
        value: 'role',
        key: 1,
      },
      {
        title: '账号管理',
        value: 'account',
        key: 2,
      },
      {
        title: '系统配置',
        value: 'config',
        key: 3,
      }
    ],
  },
  {
    title: '首页',
    value: '4',
    key: 4,
    children: [
      {
        title: '首页',
        value: 'home',
        key: 5,
      }
    ],
  },
  {
    title: '数据报表',
    value: '6',
    key: 6,
    children: [
      {
        title: '任务报表',
        value: 'chart_task',
        key: 7,
      },
      {
        title: '员工报表',
        value: 'chart_user',
        key: 8,
      },
    ],
  },
  {
    title: '检测任务',
    value: '9',
    key: '9',
    children: [
      {
        title: '创建任务',
        value: 'task_create',
        key: 10,
      },
      {
        title: '任务列表',
        value: 'task_list',
        key: 11,
      },
      {
        title: '任务数据报表',
        value: 'task_chart',
        key: 12,
      },
    ],
  },
  {
    title: '算法识别',
    value: '13',
    key: 13,
    children: [
      {
        title: '算法记录',
        value: 'algorithm_log',
        key: 14,
      },
      {
        title: '算法报表',
        value: 'algorithm_chart',
        key: 15,
      },
    ],
  },
]
~~~

### 用户详细信息列表
~~~
GET: 8081/user/userlist?skip=?

return {
    code:0,
    message:'',
    data:[{name:'admin',telephone:'15753962023',email:'2813223276@qq.com',role_names:['manager'],},
          {name:'qxxqx',telephone:'13334334344',email:'2813223133@qq.com',role_names:['home','config'],},
          {name:'谭福华',telephone:'19819600510',email:'2813223283@qq.com',role_names:['chart_task','chart_track'],},
          {name:'齐辛格',telephone:'13334331231',email:'2832232123@qq.com',role_names:['account','role'],}
        ]
}
~~~


### 用户信息修改

~~~
POST :8081/user/userUpdate

exaple data:
{
    name:'admin',
    telephone:'15753962023',
    email:'2813223276@qq.com',
    role_names:['manager']
}

return {
    code:0,
    message:''
}
~~~

### 管理员增加用户
~~~
POST :8081/user/userCreat

exaple data:
{
    name:'admin',
    telephone:'15753962023',
    email:'2813223276@qq.com',
    role_names:['manager']
}
return {
    code:0,
    message:''
}
~~~

### 管理员重置密码

~~~
GET: 8081/user/${data}/reset_password/

data 为邮箱

return {
    code:0,
    message:''
}
~~~

### 管理员删除用户

~~~
delete : 8081/user/${data}/userDestory

data 为邮箱

return {
    code:0,
    message:''
}
~~~

### 获取系统角色组列表

~~~
GET: 8081/user/roles/get_role

return{
    code:0,
    message:'',
    data:[{name:'admin',telephone:'15753962023',email:'2813223276@qq.com',role_names:['系统管理员'],roles:[0]},
          {name:'qxxqx',telephone:'13334334344',email:'2813223133@qq.com',role_names:['首页',],roles:[4]},
          {name:'谭福华',telephone:'19819600510',email:'2813223283@qq.com',role_names:['数据报表'],roles:[9]},
          {name:'齐辛格',telephone:'13334331231',email:'2832232123@qq.com',role_names:['算法识别'],roles:[13]}
        ];
}
~~~

### 管理员增加角色组

~~~
POST :8081/user/roles/roleCreate

emxaple data:
{
    name:'',
    remark:'',
    permissions:[1,2,3] // 每一项为key
}

return {
    code:0,
    message:''
}
~~~

### 管理员更新角色组

~~~

POST: 8081/user/roles/${data.id}/roleUpdate

exmaple data:
{
    id:1,
    name:'',
    remark:'',
    permissions:[1,2,3] // 每一项为key
}

return {
    code:0,
    message:''
}
~~~

### 管理员删除角色组

~~~
delete : 8081/user/roles/${data.id}/roleDestroy

data.id 为角色组id

return {
    code:0,
    message:''
}
~~~

## 算法板块

### 获取所有子任务算法检测结果

~~~
GET: task/get_track_list?skip=?

return {
    code:0,
    message:'',
    data:[
    {
        "task_id": "TA000012", 
        "cnt": 5, 
        "person": "admin", 
        "name": "Task1", 
        "beizhu": "山东省威海市环翠区", 
        "all_marker": [
            [
                122.05566, 
                37.533512
            ], 
            [
                122.059394, 
                37.532627
            ], 
            [
                122.056862, 
                37.530687
            ]
        ], 
        "all_line": [
            [
                [
                    122.059394, 
                    37.532627
                ], 
                [
                    122.05566, 
                    37.533512
                ]
            ], 
            [
                [
                    122.056862, 
                    37.530687
                ], 
                [
                    122.059394, 
                    37.532627
                ]
            ]
        ], 
        "image": [
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png"
        ], 
        "result_image": [
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png"
        ], 
        "result": [
            true, 
            true, 
            true
        ]
    }, 
    {
        "task_id": "TA000014", 
        "cnt": 5, 
        "person": "谭福华", 
        "name": "Task2", 
        "beizhu": "山东省威海市环翠区", 
        "all_marker": [
            [
                122.054158, 
                37.533626
            ], 
            [
                122.051927, 
                37.529372
            ], 
            [
                122.053, 
                37.527296
            ], 
            [
                122.054888, 
                37.527092
            ], 
            [
                122.055489, 
                37.525663
            ]
        ], 
        "all_line": [
            [
                [
                    122.051927, 
                    37.529372
                ], 
                [
                    122.054158, 
                    37.533626
                ]
            ], 
            [
                [
                    122.053, 
                    37.527296
                ], 
                [
                    122.051927, 
                    37.529372
                ]
            ], 
            [
                [
                    122.054888, 
                    37.527092
                ], 
                [
                    122.053, 
                    37.527296
                ]
            ], 
            [
                [
                    122.055489, 
                    37.525663
                ], 
                [
                    122.054888, 
                    37.527092
                ]
            ]
        ], 
        "image": [
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png"
        ], 
        "result_image": [
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png"
        ], 
        "result": [
            true, 
            true, 
            true
        ]
    }, 
    {
        "task_id": "TA000015", 
        "cnt": "15", 
        "person": "admin", 
        "name": "Task1", 
        "beizhu": "山东省威海市环翠区", 
        "all_marker": [
            [
                122.065599, 
                37.530271
            ], 
            [
                122.066122, 
                37.526746
            ], 
            [
                122.07041, 
                37.5277
            ], 
            [
                122.071456, 
                37.524009
            ]
        ], 
        "all_line": [
            [
                [
                    122.066122, 
                    37.526746
                ], 
                [
                    122.065599, 
                    37.530271
                ]
            ], 
            [
                [
                    122.07041, 
                    37.5277
                ], 
                [
                    122.066122, 
                    37.526746
                ]
            ], 
            [
                [
                    122.071456, 
                    37.524009
                ], 
                [
                    122.07041, 
                    37.5277
                ]
            ]
        ], 
        "image": [
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png"
        ], 
        "result_image": [
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png", 
            "http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png"
        ], 
        "result": [
            true, 
            true, 
            true
        ]
    }
]
}
~~~

### 人工判断算法检测错误！

~~~
POST: 8083/task/update_track

example data :
{
    task_id:number,
    name:'', // 子任务名称
    index:number // 第几张图片
}

return {
    code:0,
    message:''
}
~~~