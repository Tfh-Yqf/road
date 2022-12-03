export const ChinaEcharts = (data)=>{
    return {
        title: {
            text: '中国道路裂纹检测系统',
            subtext: 'Data from www.road.tanfuhua.com',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
        },
        visualMap: {
            left: 'right',
            min: 4000,
            max: 10000,
            inRange: {
                color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            },
            text: ['High', 'Low'],
            calculable: true,
            bottom:'center'
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'CHINA',
                type: 'map',
                roam: true,
                map: 'CHINA',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: data
            }
        ]
    };
}