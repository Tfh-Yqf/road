package cn.itcast.user.service;

import cn.itcast.user.util.RedisUtil;
import cn.itcast.user.util.SendEmail;
import cn.itcast.user.mapper.UserMapper;
import cn.itcast.user.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private SendEmail sendEmail;

    @Autowired
    private RedisUtil redisUtil;

    public User queryById(Long id) {
        return userMapper.findById(id);
    }

    public String getPassByUserName(String username) {return userMapper.getPassByUserName(username);}

    @Override
    public String getPassByEmail(String email) {
        return userMapper.getPassByEmail(email);
    }

    @Override
    public int insertUser(User user) {
        long count = 1;
        for (User user1 : userMapper.findAll()){
            if (user.getName().equals(user1.getName()))
                return 0;
            count++;
        }
        user.setId(count);
        return userMapper.insertUser(user);
    }

    @Override
    public int updateUser(User user) {
        return userMapper.updateUser(user);
    }

    @Override
    public boolean existsEmail(String email) {
        for (User user : userMapper.findAll()){
            if (email.equals(user.getEmail()))
                return false;
        }
        return true;
    }

    @Override
    public int sendEmail(String to) {
        int random = (int)((Math.random()*9+1)*100000);
        sendEmail.sendSimpleMail("2569729045@qq.com", to ,"道路裂纹检测系统 您的验证码为(五分钟有效):", Integer.toString(random));
        redisUtil.set(to, random, 300);
        return random;
    }

    @Override
    public boolean checkEmail(String email, String code) {
        if (redisUtil.get(email).toString().equals(code)) return true;
        else return false;
    }

    public User getUserByName(String username){
        return userMapper.getUserByName(username);
    }


}