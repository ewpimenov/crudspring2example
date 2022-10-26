package com.example.crudspring2example.controller;
import com.example.crudspring2example.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/user")
@Transactional
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/userNameRole")
    public UserDetails getCurrentUserAndRoles(Authentication authentication) throws UsernameNotFoundException {
        return userService.getByUsername(authentication.getName());
    }
}