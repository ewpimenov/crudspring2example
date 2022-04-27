package com.example.crudspring2example.service;

import com.example.crudspring2example.model.Role;

import java.util.List;

public interface RoleService {

    List<Role> getAllRoles();

    List<Role> getRoles(String[] role);

}