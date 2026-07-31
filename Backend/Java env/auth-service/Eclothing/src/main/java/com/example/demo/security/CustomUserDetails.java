package com.example.demo.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.entities.User;

public class CustomUserDetails implements UserDetails {

    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(
                new SimpleGrantedAuthority(
                        "ROLE_" + user.getRole().getRoleName().name()
                )
        );
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // We are using email as username
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public Integer getUserId() {
        return user.getUserId();
    }

    public String getName() {
        return user.getName();
    }

    public Integer getStatus() {
        return user.getStatus();
    }

    public Integer getIsDeleted() {
        return user.getIsDeleted();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getStatus() == 1 && user.getIsDeleted() == 0;
    }
}