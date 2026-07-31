package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="roles")
public class Role {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "role_id")
	 private Integer roleId;
	 
	 @Enumerated(EnumType.STRING)
	 @Column(name = "role_name", nullable = false, unique = true)
	 private RoleName roleName;

	 public Role() {
	 }

	 public Role(Integer roleId, RoleName roleName) {
		super();
		this.roleId = roleId;
		this.roleName = roleName;
	 }

	 public Integer getRoleId() {
		 return roleId;
	 }

	 public void setRoleId(Integer roleId) {
		 this.roleId = roleId;
	 }

	 public RoleName getRoleName() {
		 return roleName;
	 }

	 public void setRoleName(RoleName roleName) {
		 this.roleName = roleName;
	 }

	 @Override
	 public String toString() {
		return "Role [roleId=" + roleId + ", roleName=" + roleName + "]";
	 }
}
