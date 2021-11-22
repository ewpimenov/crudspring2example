package com.example.crudspring2example.controller;


import com.example.crudspring2example.model.User;
import com.example.crudspring2example.service.RoleService;
import com.example.crudspring2example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/admin")
@Transactional
public class AdminController {

    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserService userService;

    public AdminController(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;

    }

    @GetMapping
    public String adminPage() {
        return "/admin.html";
    }

    @GetMapping("/addUser")
    public String getUserAddForm(@ModelAttribute("user") User user) {
        return "/addUser.html";
    }

    @PostMapping("/addUser")
    public String create(@ModelAttribute("user") User user) {
        user.setRoles(roleService.getAllRolesByName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.addUser(user);
        return "redirect:/";
    }

    @GetMapping("/listUsers")
    public String listAllUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "/listUsers.html";
    }

    @GetMapping("/updateUser")
    public String updateForm(@RequestParam int id, Model model) {
        model.addAttribute("user", userService.getUser(id));
        model.addAttribute("roles", roleService.getAllRolesByName());
        return "/updateUser.html";
    }

    @PostMapping("/updateUser")
    public String update(@ModelAttribute("user") User user, @RequestParam("role") String[] role) {

        user.setRoles(roleService.getRolesByName(role));
        User userFromDB = userService.getUser(user.getId());
        String oldPassword = userFromDB.getPassword();
        if (!user.getPassword().equals(oldPassword)) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.updateUser(user);
        }
        userService.updateUser(user);
        return "redirect:/";
    }

    @GetMapping("/deleteUser")
    public String deleteUser(@RequestParam int id, Model model) {
        model.addAttribute("user", userService.getUser(id));
        return "/deleteUser.html";
    }

    @PostMapping("/deleteUser")
    public String delete(@ModelAttribute("id") int id) {
        userService.deleteUser(id);
        return "redirect:/";
    }
}
