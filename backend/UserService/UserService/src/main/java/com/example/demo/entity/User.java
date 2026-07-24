package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {
    
	@Id
	@Column
     int u_id;
	int role_id;
	String name;
	String email;
	String password;
	
	
}
