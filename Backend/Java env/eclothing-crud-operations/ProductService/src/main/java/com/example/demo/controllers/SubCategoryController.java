package com.example.demo.controllers;

	import java.util.List;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.*;

	import com.example.demo.dto.SubCategoryRequest;
	import com.example.demo.dto.UpdateSubCategoryRequest;
	import com.example.demo.entities.SubCategory;
	import com.example.demo.service.SubCategoryService;

	@RestController
	@RequestMapping("/subcategories")
	@CrossOrigin(origins = "http://localhost:5173")
	public class SubCategoryController {

	    @Autowired
	    private SubCategoryService subCategoryService;

	    // ================= ADD =================

	    @PostMapping
	    public String addSubCategory(
	            @RequestBody SubCategoryRequest request){

	        return subCategoryService.addSubCategory(request);

	    }

	    // ================= EXISTING GET =================

	    @GetMapping
	    public List<SubCategory> getAllSubCategories(){

	        return subCategoryService.getAllSubCategories();

	    }

	    // ================= ACTIVE GET =================

	    @GetMapping("/active")
	    public List<SubCategory> getActiveSubCategories(){

	        return subCategoryService.getActiveSubCategories();

	    }

	    // ================= EXISTING GET BY ID =================

	    @GetMapping("/{id}")
	    public SubCategory getSubCategoryById(
	            @PathVariable Integer id){

	        return subCategoryService.getSubCategoryById(id);

	    }

	    // ================= ACTIVE GET BY ID =================

	    @GetMapping("/active/{id}")
	    public SubCategory getActiveSubCategoryById(
	            @PathVariable Integer id){

	        return subCategoryService.getActiveSubCategoryById(id);

	    }

	    // ================= UPDATE =================

	    @PutMapping("/{id}")
	    public String updateSubCategory(
	            @PathVariable Integer id,
	            @RequestBody UpdateSubCategoryRequest request){

	        return subCategoryService.updateSubCategory(id,request);

	    }

	    // ================= SOFT DELETE =================

	    @DeleteMapping("/{id}")
	    public String softDeleteSubCategory(
	            @PathVariable Integer id){

	        return subCategoryService.softDeleteSubCategory(id);
	    }
	    
	    @GetMapping("/category/{categoryId}")
	    public List<SubCategory> getSubCategoryByCategoryId(
	            @PathVariable Integer categoryId) {

	        return subCategoryService.getSubCategoryByCategoryId(categoryId);
	    }

}
