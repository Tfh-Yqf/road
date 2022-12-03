package cn.itcast.user.web;

import cn.itcast.user.R.R;
import cn.itcast.user.pojo.User;
import cn.itcast.user.service.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestController
@RequestMapping("/user")
// @RefreshScope
public class UserController {

    @Autowired
    private UserServiceImpl userService;


    @GetMapping("/{username}/{password}")
    public R queryById(@PathVariable("username") String username, @PathVariable("password") String password) {
        if (password.equals(userService.getPassByUserName(username)) || password.equals(userService.getPassByEmail(username))) return new R(0);
        else return new R(1, "password wrong!");
    }

    @PostMapping("/{code}")
    public R insertUser(User user, @PathVariable String code){
        if (!userService.checkEmail(user.getEmail(), code)) return new R(1, "验证码错误！！！");
        if (userService.insertUser(user) != 1) return new R(1, "用户名已存在，请换一个！");
        return new R(0);
    }

    @PutMapping("")
    public R updateUser(User user){
        if (userService.updateUser(user) == 1) return new R(0);
        else return new R(1, "update error!");
    }


    @GetMapping("/{email}")
    public R sendEmail(@PathVariable String email){
        if (userService.existsEmail(email) == true) {
            userService.sendEmail(email);
            return new R(0);
        }
        else return new R(1, "email exist");

    }

    @GetMapping("/haha/{name}")
    public User getUser(@PathVariable String name){
        return userService.getUserByName(name);
    }




}
