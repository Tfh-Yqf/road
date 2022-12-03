package cn.itcast.user.mapper;

import cn.itcast.user.pojo.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UserMapper {

    @Select("select * from user")
    List<User> findAll();

    @Select("select * from user where id = #{id}")
    User queryById(Long id);

    @Select("select * from user where id = #{id}")
    User findById(@Param("id") Long id);

    @Select("select * from user where name = #{username}")
    User getUserByName(String username);

    @Select("select password from user where name = #{username}")
    String getPassByUserName(@Param("username") String username);

    @Select("select password from user where email = #{email}")
    String getPassByEmail(@Param("email") String email);
    @Insert("insert into user values(#{id}, #{name}, #{password}, #{telephone}, #{is_admin}, #{email})")
    int insertUser(User user);

    @Update("update user (name, password, telephone, is_admin, email) values (#{name}, #{password}, #{telephone}, #{is_admin}, #{email}) where id = #{id}")
    int updateUser(User user);


}