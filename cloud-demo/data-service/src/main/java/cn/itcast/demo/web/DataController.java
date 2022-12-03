package cn.itcast.demo.web;

import cn.itcast.demo.R.R;
import cn.itcast.demo.pojo.Data;
import cn.itcast.demo.service.DataService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/data")
public class DataController {

    @Autowired
    DataService dataService;

    @PostMapping
    public R insertData(Data data){
        if (dataService.insertData(data) == 1) return new R(0, "success");
        else return new R(1, "error insert!");
    }

}
