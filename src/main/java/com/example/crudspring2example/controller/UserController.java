package com.example.crudspring2example.controller;

import com.example.crudspring2example.model.User;
import com.example.crudspring2example.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> users() {
        return userService.getAllUsers();
    }
}