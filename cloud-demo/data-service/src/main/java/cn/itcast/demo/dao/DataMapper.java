package cn.itcast.demo.dao;

import cn.itcast.demo.pojo.Data;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DataMapper {
    @Insert("insert into taskdetails values(#{infoid}, #{taskid}, #{latitude}, #{longitude}, #{speed}, #{accuracy}, #{altitude}, #{verticalAccuracy}, #{horizontalAccuracy}, #{address}, #{road_name}, #{image})")
    public int insertData(Data data);

    @Select("select count(*) from taskdetails where taskid = #{taskid}")
    public int selectCountData(int taskid);
}
