package cn.itcast.tasks.service;


import cn.itcast.tasks.pojo.Tasks;

import java.util.List;

public interface TasksService {
    List<Tasks> getFinishedTasks(String username, int currentPage);

    List<Tasks> getUnFinishedTasks(String username, int currentPage);
}
