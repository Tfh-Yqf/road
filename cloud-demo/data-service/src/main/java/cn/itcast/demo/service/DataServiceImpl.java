package cn.itcast.demo.service;

import cn.itcast.demo.dao.DataMapper;
import cn.itcast.demo.pojo.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataServiceImpl implements DataService{

    @Autowired
    private DataMapper dataMapper;

    @Override
    public int insertData(Data data) {
        int count = dataMapper.selectCountData(data.getTaskid());
        data.setInfoid(++count);
        return dataMapper.insertData(data);
    }
}
