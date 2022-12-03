package cn.itcast.user.service;

import cn.itcast.user.util.SendEmail;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest

public class UserTest {
    @Autowired
    UserServiceImpl userService;

    @Autowired
    SendEmail sendEmail;

    @Test
    public void testGetAll(){
        userService.sendEmail("939453990@qq.com");
    }
}
