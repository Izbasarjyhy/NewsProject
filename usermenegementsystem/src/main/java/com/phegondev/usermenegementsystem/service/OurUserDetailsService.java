package com.phegondev.usermenegementsystem.service;

import com.phegondev.usermenegementsystem.entity.OurUsers;
import com.phegondev.usermenegementsystem.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class OurUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepo usersRepo;
    @Override
    public OurUsers loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepo.findByEmail(username).orElseThrow();
    }
}