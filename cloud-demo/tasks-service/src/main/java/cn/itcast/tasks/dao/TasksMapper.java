package cn.itcast.tasks.dao;

import cn.itcast.tasks.pojo.Tasks;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TasksMapper {

    @Select("select * from task where rname = #{username} and is_finish = 1 order by btime limit #{currentPage}, 10")
    List<Tasks> getFinishedTasks(String username, int currentPage);

    @Select("select * from task where rname = #{username} and is_finish = 0 order by btime limit #{currentPage}, 10")
    List<Tasks> getUnFinishedTasks(String username, int currentPage);
}
