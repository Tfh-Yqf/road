package cn.itcast.tasks.web;

import cn.itcast.tasks.R.R;
import cn.itcast.tasks.service.TasksService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/tasks")
public class TasksController {

    @Autowired
    TasksService tasksService;

    @GetMapping("/finish/{username}/{currentPage}")
    public R getFinishedTasks(@PathVariable String username, @PathVariable int currentPage){
        return new R(0, "查询成功", tasksService.getFinishedTasks(username, currentPage));
    }

    @GetMapping("not_finish/{username}/{currentPage}")
    public R getUnFinishedTasks(@PathVariable String username, @PathVariable int currentPage){
        return new R(0, "查询成功", tasksService.getUnFinishedTasks(username, currentPage));
    }
}
