package cn.itcast.user.service;

import cn.itcast.user.pojo.User;

import java.util.List;

public interface UserService {
    User queryById(Long id);
    String getPassByUserName(String username);

    String getPassByEmail(String email);

    int insertUser(User user);

    int updateUser(User user);

    boolean existsEmail(String email);

    int sendEmail(String to);

    boolean checkEmail(String email, String code);
}
