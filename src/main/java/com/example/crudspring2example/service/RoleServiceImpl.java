package com.example.crudspring2example.service;
import com.example.crudspring2example.model.Role;
import com.example.crudspring2example.repository.RoleRepository;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {


    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getRoles(String[] roles) {
        return roleRepository.findAll(roles);
    }
}