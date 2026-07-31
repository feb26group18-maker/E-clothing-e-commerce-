package com.example.demo.controllers;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.dto.ProductRequest;
import com.example.demo.dto.ProductResponse;
import com.example.demo.dto.UpdateProductRequest;
import com.example.demo.service.ProductImageService;
import com.example.demo.service.ProductService;

import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
	@Autowired
    private ProductService productService;
	
	@Autowired
    private ProductImageService productImageService;
//
//    @PostMapping
//    public String addProduct(@RequestBody ProductRequest request) {
//
//        return productService.addProduct(request);
//
//    }
    
	//previous add product//
//    @PostMapping
//    public ResponseEntity<String> addProduct(@RequestBody ProductRequest request) {
//        String response = productService.addProduct(request);
//        return ResponseEntity.ok(response);
//    }
//	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//	public ResponseEntity<String> addProduct(
//	        @RequestPart("product") ProductRequest request,
//	        @RequestPart("images") MultipartFile[] images) {
//
//	    String response = productService.addProduct(request, images);
//	    return ResponseEntity.ok(response);
//	}
	
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> addProduct(
	        @RequestPart("product") String product,
	        @RequestPart("images") MultipartFile[] images) {

	    try {

	        ObjectMapper mapper = new ObjectMapper();

	        ProductRequest request =
	                mapper.readValue(product, ProductRequest.class);

	        String response =
	                productService.addProduct(request, images);

	        return ResponseEntity.ok(response);

	    } catch (Exception e) {

	        e.printStackTrace();

	        return ResponseEntity.badRequest()
	                .body("Invalid Product Data");

	    }
	}
    
//    @GetMapping
//    public List<ProductResponse> getAllProducts(){
//        return productService.getAllProducts();
//    }
    
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
    
//    @GetMapping("/{id}")
//    public ProductResponse getProductById(@PathVariable Integer id) {
//        return productService.getProductById(id);
//    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Integer id) {

        ProductResponse response = productService.getProductById(id);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Product Not Found");
        }

        return ResponseEntity.ok(response);
    }
    
    //previous code//
//    @PutMapping("/{id}")
//    public ResponseEntity<String> updateProduct(@PathVariable Integer id,@RequestBody UpdateProductRequest request) {
//        return ResponseEntity.ok(productService.updateProduct(id, request));
//    }
    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProduct(
            @PathVariable Integer id,
            @RequestPart("product") String product,
            @RequestPart(value = "images", required = false) MultipartFile[] images) {

        try {

            ObjectMapper mapper = new ObjectMapper();
            
            System.out.println("Controller Images = " + images);

            if (images != null) {
                System.out.println("Length = " + images.length);
            }

            UpdateProductRequest request =
                    mapper.readValue(product, UpdateProductRequest.class);

            String response =
                    productService.updateProduct(id, request, images);

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid Product Data");

        }
    }
    
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.deleteProduct(id));
    }
    
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ProductResponse>> getProductsBySeller(@PathVariable Integer sellerId) {
        return ResponseEntity.ok(productService.getProductsBySeller(sellerId));
    }
    
    @GetMapping("/pending")
    public List<ProductResponse> getPendingProducts() {
        return productService.getPendingProducts();
    }
    
    @PutMapping("/{id}/approve")
    public ResponseEntity<String> approveProduct(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.approveProduct(id));
    }
    
    @PutMapping("/{id}/reject")
    public ResponseEntity<String> rejectProduct(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.rejectProduct(id));
    }
    
    //previous//image code
//    @PostMapping("/images")
//    public String uploadProductImage(@RequestParam Integer productId,@RequestParam MultipartFile file) {
//        return productImageService.uploadImage(productId, file);
//    }
    
    @GetMapping("/approved")
    public ResponseEntity<List<ProductResponse>> getApprovedProducts(){
        return ResponseEntity.ok(productService.getApprovedProducts());
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }
    
    @GetMapping("/subcategory/{subCategoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsBySubCategory(@PathVariable Integer subCategoryId) {
        return ResponseEntity.ok(productService.getProductsBySubCategory(subCategoryId));
    }
    
//    @GetMapping("/search")
//    public ResponseEntity<List<ProductResponse>> searchProducts(@RequestParam String keyword) {
//    	return ResponseEntity.ok(productService.searchProducts(keyword));
//    }
//    
//    @GetMapping("/filter")
//    public ResponseEntity<List<ProductResponse>> filterProducts(@RequestParam String size,@RequestParam BigDecimal minPrice,@RequestParam BigDecimal maxPrice) {
//    	return ResponseEntity.ok(productService.filterProducts(size,minPrice,maxPrice));
//    }
    
    @GetMapping("/count/seller/{sellerId}")
    public ResponseEntity<Long> getProductCountBySeller(@PathVariable Integer sellerId) {
        return ResponseEntity.ok(productService.getProductCountBySeller(sellerId));
    }
    
    @GetMapping("/search-filter")
    public ResponseEntity<List<ProductResponse>> searchAndFilterProducts(

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) Integer categoryId,

            @RequestParam(required = false) Integer subCategoryId,

            @RequestParam(required = false) String size,

            @RequestParam(required = false) BigDecimal minPrice,

            @RequestParam(required = false) BigDecimal maxPrice

    ) {

        return ResponseEntity.ok(

                productService.searchAndFilterProducts(

                        keyword,
                        categoryId,
                        subCategoryId,
                        size,
                        minPrice,
                        maxPrice
                )
        );
    }
}
