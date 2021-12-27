package com.example.crudspring2example.controller;

import com.example.crudspring2example.service.RoleService;
import com.example.crudspring2example.service.UserService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;


@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String currentUserRole(Model model, Principal principal) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        model.addAttribute("user", principal.getName());
        model.addAttribute("roles", authentication.getAuthorities());
        model.addAttribute("users", userService.getAllUsers());
        return "/user";
    }
}