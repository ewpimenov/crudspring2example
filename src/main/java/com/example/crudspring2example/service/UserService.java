package com.example.crudspring2example.service;

import com.example.crudspring2example.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User addUser(User user);

    void deleteUser(Integer id);

    User updateUser(User user);

    User getUser(Integer id);

    UserDetails getByUsername(String name);
}