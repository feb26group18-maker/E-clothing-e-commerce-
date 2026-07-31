package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;

import com.example.demo.entities.User;

public interface UserRepository extends JpaRepository<User,Integer> {
	Optional<User> findByEmail(String email);

    Optional<User> findByMobile(String mobile);

//    @Query("SELECT u.userId FROM User u WHERE u.email = :email")
    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);
    
 // Get only non-deleted users
    List<User> findByIsDeleted(Integer isDeleted);

    // Get user by id only if not deleted
    Optional<User> findByUserIdAndIsDeleted(Integer userId, Integer isDeleted);
    
    
}
