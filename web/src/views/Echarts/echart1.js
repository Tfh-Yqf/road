export const CircleEcharts = (data) =>{
    return {
        title:{
            text:'道路损坏程度占比',
            bottom:0,
            left:'40%'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };
}

export const Week_Track_echart = (data) =>{
    return  {
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['日期', '正常', '裂缝'],
            source: data
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' },]
    }
}

export const YearChargeEcharts = (data) =>{

    return {
        grid: {
            containLabel: true,
            left:20
        },
        title: {
            text: data.year+'年收费数据（千元）',
            textStyle:{
                color:'#ffffff',
                fontSize:16
            },
            left:'center',
            top:10
        },
        color:['#00a9f1','#00bdcb','#dd425a'],
        xAxis: {
            show:false
        },
        yAxis: {
            color:['#00a9f1','#00bdcb','#dd425a'],
            type: 'category',
            data: [
                {
                    value:'总任务数',
                    textStyle: {
                        fontSize: 15,
                        color: '#00a9f1'
                    }
                },{
                    value:'已完成数',
                    textStyle: {
                        fontSize: 15,
                        color: '#00bdcb'
                    }
                },{
                    value:'未完成数',
                    textStyle: {
                        fontSize: 15,
                        color: '#f14762'
                    }
                }],
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            textStyle:{
                color:'#ffffff',
                fontSize:16
            },
            axisTick:{
                show:false,//不显示坐标轴刻度线
            },
            axisLine: {show:false},

        },
        series: [
            {
                realtimeSort: true,
                name: 'X',
                type: 'bar',
                data:[data.all_track,data.have_tarck,data.no_track],
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true
                },
                itemStyle:{
                    normal:{
                        color: function(params) {
                            var colorList = ['#00a9f1','#00bdcb','#dd425a'];
                            return colorList[params.dataIndex];
                        }
                    }
                },
                colorBy:'data',
                barMaxWidth:27,
            }
        ],
    }
}

export const ThreeEcharts = (data) =>{
    return {
        title:{
            text:'识别结果占比',
            bottom:0,
            left:'40%'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            data: ['真裂缝-真', '真裂缝-假', '假裂缝-真', '假裂缝-假']
        },
        series: [
            {
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: data
            }
        ]
    };
}