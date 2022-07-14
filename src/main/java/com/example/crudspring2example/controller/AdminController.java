package com.example.crudspring2example.controller;

import com.example.crudspring2example.model.Role;
import com.example.crudspring2example.model.User;
import com.example.crudspring2example.service.RoleService;
import com.example.crudspring2example.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/admin")
@Transactional
public class AdminController {

    private final PasswordEncoder passwordEncoder;

    private final UserService userService;

    private final RoleService roleService;

    public AdminController(PasswordEncoder passwordEncoder, UserService userService, RoleService roleService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> users() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<User> get(@PathVariable(name = "id") Integer id) {
        try {
            User userDb = userService.getUser(id);
            return new ResponseEntity<>(userDb, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("allRoles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @PostMapping
    public ResponseEntity<User> addUser(@Valid @RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PutMapping(value = "{id}")
    public User update(@PathVariable Integer id, @RequestBody User user) {

        User userFromDB = userService.getUser(id);
        String oldPassword = userFromDB.getPassword();
        if (!user.getPassword().equals(oldPassword)) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userService.updateUser(user);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/adminNameRole")
    public UserDetails getCurrentUserAndRoles(Authentication authentication) throws UsernameNotFoundException {
        return userService.getByUsername(authentication.getName());
    }
}

