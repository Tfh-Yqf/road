package cn.itcast.tasks.dao;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestTasksMapper {

    @Autowired
    TasksMapper tasksMapper;

    @Test
    public void TestGetFinished(){
        tasksMapper.getFinishedTasks("qxg", 10);
    }
}
