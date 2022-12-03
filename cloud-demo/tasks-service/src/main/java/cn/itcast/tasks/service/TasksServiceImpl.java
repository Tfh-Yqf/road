package cn.itcast.tasks.service;

import cn.itcast.tasks.dao.TasksMapper;
import cn.itcast.tasks.pojo.Tasks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasksServiceImpl implements TasksService{

    @Autowired
    TasksMapper tasksMapper;

    public List<Tasks> getFinishedTasks(String username, int currentPage){
        return tasksMapper.getFinishedTasks(username, currentPage);
    }

    @Override
    public List<Tasks> getUnFinishedTasks(String username, int currentPage) {
        return tasksMapper.getUnFinishedTasks(username, currentPage);
    }
}
