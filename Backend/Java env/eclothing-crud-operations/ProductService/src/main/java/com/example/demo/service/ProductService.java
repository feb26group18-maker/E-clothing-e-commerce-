package com.example.demo.service;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ProductImageRequest;
import com.example.demo.dto.ProductRequest;
import com.example.demo.dto.ProductResponse;
import com.example.demo.dto.UpdateProductRequest;
import com.example.demo.entities.ApprovalStatus;
import com.example.demo.entities.Product;
import com.example.demo.entities.ProductImage;
import com.example.demo.entities.ProductSize;
import com.example.demo.entities.SubCategory;
import com.example.demo.repository.ProductImageRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.SubCategoryRepository;
import com.example.demo.specification.ProductSpecification;
import org.springframework.data.jpa.domain.Specification;
import com.example.demo.specification.ProductSpecification;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;
    
    @Autowired
    private ProductImageRepository productImageRepository;
    
    @Autowired
    private ProductImageService productImageService;

    //previous//
//    public String addProduct(ProductRequest request)
//    {
//
//        // Check SubCategory
//        SubCategory subCategory = subCategoryRepository
//                .findById(request.getSubCategoryId())
//                .orElse(null);
//
//        if (subCategory == null) {
//            return "SubCategory Not Found";
//        }
//
//        Product product = new Product();
//
//        // Seller Id
//        product.setSellerId(request.getSellerId());
//
//        // SubCategory
//        product.setSubCategory(subCategory);
//
//        // Product Details
//        product.setProductName(request.getProductName());
//        product.setDescription(request.getDescription());
//        product.setSize(request.getSize());
//        product.setPrice(request.getPrice());
//
//        // Default Values
//        product.setApprovalStatus(ApprovalStatus.Pending);
//        product.setIsDeleted(0);
//
//        productRepository.save(product);
//
//        return "Product Added Successfully";
//    }
    
//    public List<ProductResponse> getAllProducts(){
//
//        List<Product> products =
//                productRepository.findByIsDeleted(0);
//
//
//        List<ProductResponse> responseList = new ArrayList<>();
//
//
//        for(Product product : products){
//
//            ProductResponse response = new ProductResponse();
//
//
//            response.setProductId(product.getProductId());
//
//            response.setProductName(product.getProductName());
//
//            response.setDescription(product.getDescription());
//
//            response.setSize(product.getSize().toString());
//
//            response.setPrice(product.getPrice());
//
//            response.setApprovalStatus(
//                    product.getApprovalStatus().toString()
//            );
//
//
//            response.setSubCategoryName(
//                    product.getSubCategory().getSubCategoryName()
//            );
//
//
//            response.setCategoryName(
//                    product.getSubCategory()
//                    .getCategory()
//                    .getCategoryName()
//            );
//
//
//            // temporary because UserService API not connected yet
//            response.setSellerName(
//                    "Seller ID : " + product.getSellerId()
//            );
//
//            responseList.add(response);
//
//        }
//
//        return responseList;
//    }
    
    public String addProduct(ProductRequest request,
            MultipartFile[] images) {

		// 1. Check SubCategory
		SubCategory subCategory =
		subCategoryRepository
		.findById(request.getSubCategoryId())
		.orElse(null);
		
		if (subCategory == null) {
		return "SubCategory Not Found";
		}
		
		// 2. Create Product
		Product product = new Product();
		
		product.setSellerId(request.getSellerId());
		product.setSubCategory(subCategory);
		product.setProductName(request.getProductName());
		product.setDescription(request.getDescription());
		product.setSize(request.getSize());
		product.setPrice(request.getPrice());
		
		product.setApprovalStatus(ApprovalStatus.Pending);
		product.setIsDeleted(0);
		
		// 3. Save Product FIRST
		product = productRepository.save(product);
		
		// 4. Save Images
		for(MultipartFile file : images){
		
		if(file.isEmpty()){
		continue;
		}
		
		String fileName =
		   UUID.randomUUID()
		   + "_"
		   + file.getOriginalFilename();
		
		File folder = new File("C:/uploads");
		
		if(!folder.exists()){
		folder.mkdirs();
		}
		
		File destination =
		   new File(folder,fileName);
		
		try{
		
		file.transferTo(destination);
		
		ProductImage image =
		       new ProductImage();
		
		image.setProduct(product);
		
		image.setImageUrl(fileName);
		
		productImageRepository.save(image);
		
		}
		catch(IOException e){
		e.printStackTrace();
		}
		
		}

	return "Product Added Successfully";
	}
    
    public List<ProductResponse> getAllProducts() {

        List<Product> products = productRepository.findByIsDeleted(0);

        List<ProductResponse> responseList = new ArrayList<>();

        for (Product product : products) {

            ProductResponse response = new ProductResponse();

            response.setProductId(product.getProductId());
            response.setProductName(product.getProductName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setSize(product.getSize().name());
            response.setApprovalStatus(product.getApprovalStatus().name());

            // Category & Subcategory
            response.setCategoryName(product.getSubCategory().getCategory().getCategoryName());
            response.setSubCategoryName(product.getSubCategory().getSubCategoryName());

            // Seller Name (We'll implement later after connecting User Service)
            response.setSellerName(null);

            // Product Images
            List<ProductImage> images =
                    productImageRepository.findByProductProductId(product.getProductId());

            List<String> imageUrls = new ArrayList<>();

            for (ProductImage image : images) {

                imageUrls.add(
                    "http://localhost:8082/uploads/" + image.getImageUrl()
                );
            }

            response.setImageUrls(imageUrls);

            responseList.add(response);
        }

        return responseList;
    }
    
//    public ProductResponse getProductById(Integer id) {
//
//        Product product = productRepository.findById(id).orElse(null);
//
//        if (product == null || product.getIsDeleted() == 1) {
//            return null;
//        }
//
//        ProductResponse response = new ProductResponse();
//
//        response.setProductId(product.getProductId());
//        response.setProductName(product.getProductName());
//        response.setDescription(product.getDescription());
//        response.setSize(product.getSize().toString());
//        response.setPrice(product.getPrice());
//        response.setApprovalStatus(product.getApprovalStatus().toString());
//
//        response.setSubCategoryName(product.getSubCategory().getSubCategoryName());
//        response.setCategoryName(product.getSubCategory().getCategory().getCategoryName());
//
//        // Temporary until UserService integration
//        response.setSellerName("Seller ID : " + product.getSellerId());
//
//        return response;
//    }
    
    public ProductResponse getProductById(Integer productId) {

        Product product = productRepository.findById(productId).orElse(null);

        if (product == null || product.getIsDeleted() == 1) {
            return null;
        }

        ProductResponse response = new ProductResponse();

        response.setProductId(product.getProductId());
        response.setProductName(product.getProductName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setSize(product.getSize().name());
        response.setApprovalStatus(product.getApprovalStatus().name());

        response.setCategoryName(
                product.getSubCategory().getCategory().getCategoryName());

        response.setSubCategoryName(
                product.getSubCategory().getSubCategoryName());

        // Seller name will be implemented later
        response.setSellerName(null);

        // Product Images
        List<ProductImage> images =
                productImageRepository.findByProductProductId(productId);

        List<String> imageUrls = new ArrayList<>();

        for (ProductImage image : images) {
            imageUrls.add("http://localhost:8082/uploads/" + image.getImageUrl());
        }

        response.setImageUrls(imageUrls);

        return response;
    }
    
//    public String updateProduct(Integer id, ProductRequest request) {
//
//        Product product = productRepository.findById(id).orElse(null);
//
//        if (product == null || product.getIsDeleted() == 1) {
//            return "Product Not Found";
//        }
//
//        SubCategory subCategory = subCategoryRepository
//                .findById(request.getSubCategoryId())
//                .orElse(null);
//
//        if (subCategory == null) {
//            return "SubCategory Not Found";
//        }
//
//        product.setSellerId(request.getSellerId());
//        product.setSubCategory(subCategory);
//        product.setProductName(request.getProductName());
//        product.setDescription(request.getDescription());
//        product.setSize(request.getSize());
//        product.setPrice(request.getPrice());
//
//        // Keep existing approval status
//        productRepository.save(product);
//
//        return "Product Updated Successfully";
//    }
    
//    public String updateProduct(Integer productId, UpdateProductRequest request)
    @Transactional

    public String updateProduct(Integer id,
        UpdateProductRequest request,
        MultipartFile[] images)
{

    Product product = productRepository.findById(id).orElse(null);


    if(product == null || product.getIsDeleted()==1)
    {
        return "Product Not Found";
    }


    SubCategory subCategory =
            subCategoryRepository
            .findById(request.getSubCategoryId())
            .orElse(null);

    if(subCategory == null)
    {
        return "SubCategory Not Found";
    }

    product.setSubCategory(subCategory);

    product.setProductName(request.getProductName());

    product.setDescription(request.getDescription());

    product.setSize(ProductSize.valueOf(request.getSize()));

    product.setPrice(request.getPrice());


    // again send for admin approval
    product.setApprovalStatus(ApprovalStatus.Pending);

    productRepository.save(product);
    // Image update
    System.out.println("Images array = " + images);
    System.out.println("Images length = " + (images == null ? "null" : images.length));

    if(images != null && images.length > 0)
    {
        System.out.println("Inside image update block");


        productImageService.deleteProductImages(product);

        productImageService.saveImages(product, images);

    }

    return "Product Updated Successfully";

}
    
    public String deleteProduct(Integer id) {

        Product product = productRepository.findById(id).orElse(null);

        if (product == null || product.getIsDeleted() == 1) {
            return "Product Not Found";
        }

        product.setIsDeleted(1);

        productRepository.save(product);

        return "Product Deleted Successfully";
    }
    
    public List<ProductResponse> getProductsBySeller(Integer sellerId) {

        List<Product> products =
                productRepository.findBySellerIdAndIsDeleted(sellerId, 0);

        List<ProductResponse> responseList = new ArrayList<>();

        for (Product product : products) {

            ProductResponse response = new ProductResponse();

            response.setProductId(product.getProductId());
            response.setProductName(product.getProductName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setSize(product.getSize().name());
            response.setApprovalStatus(product.getApprovalStatus().name());

            // Category
            response.setCategoryName(
                    product.getSubCategory()
                           .getCategory()
                           .getCategoryName()
            );

            // SubCategory
            response.setSubCategoryName(
                    product.getSubCategory()
                           .getSubCategoryName()
            );

            // Seller name later from User Service
            response.setSellerName(null);


            // Fetch images
            List<ProductImage> images =
                    productImageRepository
                    .findByProductProductId(product.getProductId());


            List<String> imageUrls = new ArrayList<>();

            for(ProductImage image : images) {

                imageUrls.add(
                    "http://localhost:8082/uploads/"
                    + image.getImageUrl()
                );
            }

            response.setImageUrls(imageUrls);


            responseList.add(response);
        }

        return responseList;
    }
    
    public List<ProductResponse> getPendingProducts() {

        List<Product> products =
                productRepository.findByApprovalStatus(ApprovalStatus.Pending);

        List<ProductResponse> responseList = new ArrayList<>();

        for (Product product : products) {

            if (product.getIsDeleted() == 1) {
                continue;
            }

            ProductResponse response = new ProductResponse();

            response.setProductId(product.getProductId());
            response.setProductName(product.getProductName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setSize(product.getSize().toString());
            response.setApprovalStatus(product.getApprovalStatus().toString());

            response.setSubCategoryName(
                    product.getSubCategory().getSubCategoryName());

            response.setCategoryName(
                    product.getSubCategory()
                           .getCategory()
                           .getCategoryName());

            response.setSellerName("Seller ID : " + product.getSellerId());

            responseList.add(response);
        }

        return responseList;
    }
    
    public String approveProduct(Integer productId) {

        Product product = productRepository.findById(productId).orElse(null);

        if (product == null || product.getIsDeleted() == 1) {
            return "Product Not Found";
        }

        product.setApprovalStatus(ApprovalStatus.Approved);
        productRepository.save(product);
        return "Product Approved Successfully";
    }
    public String rejectProduct(Integer productId) {

        Product product = productRepository.findById(productId).orElse(null);
        if (product == null || product.getIsDeleted() == 1) {
            return "Product Not Found";
        }

        product.setApprovalStatus(ApprovalStatus.Rejected);
        productRepository.save(product);
        return "Product Rejected Successfully";
    }
    
    public String addProductImage(ProductImageRequest request) {

        Product product =
                productRepository.findById(request.getProductId()).orElse(null);

        if (product == null) {
            return "Product Not Found";
        }

        ProductImage image = new ProductImage();

        image.setProduct(product);
        image.setImageUrl(request.getImageUrl());

        productImageRepository.save(image);

        return "Image Added Successfully";
    }
    
    public List<ProductResponse> getApprovedProducts() {
        List<Product> products =
                productRepository.findByApprovalStatusAndIsDeleted(
                        ApprovalStatus.Approved,
                        0
                );

        List<ProductResponse> responseList = new ArrayList<>();

        for(Product product : products) {

            ProductResponse response = new ProductResponse();

            response.setProductId(product.getProductId());
            response.setProductName(product.getProductName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());

            response.setSize(product.getSize().name());

            response.setApprovalStatus(
                    product.getApprovalStatus().name()
            );

            response.setCategoryName(
                    product.getSubCategory()
                    .getCategory()
                    .getCategoryName()
            );

            response.setSubCategoryName(
                    product.getSubCategory()
                    .getSubCategoryName()
            );

            List<ProductImage> images =
                    productImageRepository
                    .findByProductProductId(product.getProductId());

            List<String> imageUrls = new ArrayList<>();

            for(ProductImage image : images) {

                imageUrls.add(
                    "http://localhost:8082/uploads/"
                    + image.getImageUrl()
                );
            }
            response.setImageUrls(imageUrls);
            responseList.add(response);
        }
        return responseList;
    }
    
    public List<ProductResponse> getProductsByCategory(Integer categoryId) {
        List<Product> products =
                productRepository
                .findBySubCategoryCategoryCategoryIdAndApprovalStatusAndIsDeleted(
                        categoryId,
                        ApprovalStatus.Approved,
                        0
                );
        List<ProductResponse> responseList = new ArrayList<>();
        for(Product product : products) {
            ProductResponse response = new ProductResponse();
            response.setProductId(product.getProductId());

            response.setProductName(
                    product.getProductName()
            );

            response.setDescription(
                    product.getDescription()
            );

            response.setPrice(
                    product.getPrice()
            );

            response.setSize(
                    product.getSize().name()
            );

            response.setApprovalStatus(
                    product.getApprovalStatus().name()
            );

            response.setCategoryName(
                    product.getSubCategory()
                    .getCategory()
                    .getCategoryName()
            );
            response.setSubCategoryName(
                    product.getSubCategory()
                    .getSubCategoryName()
            );

            List<ProductImage> images =
                    productImageRepository
                    .findByProductProductId(
                            product.getProductId()
                    );

            List<String> imageUrls = new ArrayList<>();

            for(ProductImage image : images) {
                imageUrls.add(
                    "http://localhost:8082/uploads/"
                    + image.getImageUrl()
                );
            }
            response.setImageUrls(imageUrls);
            responseList.add(response);

        }
        return responseList;
    }
    
    
    public List<ProductResponse> getProductsBySubCategory(Integer subCategoryId) {
        List<Product> products =
                productRepository
                .findBySubCategorySubCategoryIdAndApprovalStatusAndIsDeleted(
                        subCategoryId,
                        ApprovalStatus.Approved,
                        0
                );

        List<ProductResponse> responseList = new ArrayList<>();
        for(Product product : products) {
            ProductResponse response = new ProductResponse();
            response.setProductId(product.getProductId());

            response.setProductName(
                    product.getProductName()
            );

            response.setDescription(
                    product.getDescription()
            );

            response.setPrice(
                    product.getPrice()
            );

            response.setSize(
                    product.getSize().name()
            );

            response.setApprovalStatus(
                    product.getApprovalStatus().name()
            );

            response.setCategoryName(
                    product.getSubCategory()
                    .getCategory()
                    .getCategoryName()
            );

            response.setSubCategoryName(
                    product.getSubCategory()
                    .getSubCategoryName()
            );

            List<ProductImage> images =
                    productImageRepository
                    .findByProductProductId(
                            product.getProductId()
                    );

            List<String> imageUrls = new ArrayList<>();

            for(ProductImage image : images){

                imageUrls.add(
                        "http://localhost:8082/uploads/"
                        + image.getImageUrl()
                );
            }
            response.setImageUrls(imageUrls);
            responseList.add(response);

        }
        return responseList;
    }
    
    public List<ProductResponse> searchProducts(String keyword) {

        List<Product> products =
                productRepository.searchProducts(
                        keyword,
                        ApprovalStatus.Approved
                );

        List<ProductResponse> responseList = new ArrayList<>();

        for(Product product : products) {

            ProductResponse response = new ProductResponse();

            response.setProductId(product.getProductId());

            response.setProductName(
                    product.getProductName()
            );

            response.setDescription(
                    product.getDescription()
            );

            response.setPrice(
                    product.getPrice()
            );

            response.setSize(
                    product.getSize().name()
            );

            response.setApprovalStatus(
                    product.getApprovalStatus().name()
            );

            response.setCategoryName(
                    product.getSubCategory()
                    .getCategory()
                    .getCategoryName()
            );

            response.setSubCategoryName(
                    product.getSubCategory()
                    .getSubCategoryName()
            );

            List<ProductImage> images =
                    productImageRepository
                    .findByProductProductId(
                            product.getProductId()
                    );

            List<String> imageUrls = new ArrayList<>();
            for(ProductImage image : images){

                imageUrls.add(
                    "http://localhost:8082/uploads/"
                    + image.getImageUrl()
                );
            }

            response.setImageUrls(imageUrls);
            responseList.add(response);

        }
        return responseList;
    }
    
    public List<ProductResponse> filterProducts(
            String size,
            BigDecimal minPrice,
            BigDecimal maxPrice) {

        List<Product> products =
                productRepository
                .findBySizeAndPriceBetweenAndApprovalStatusAndIsDeleted(
                        ProductSize.valueOf(size),
                        minPrice,
                        maxPrice,
                        ApprovalStatus.Approved,
                        0
                );

        List<ProductResponse> responseList = new ArrayList<>();

        for (Product product : products) {

            ProductResponse response = new ProductResponse();

            response.setProductId(product.getProductId());
            response.setProductName(product.getProductName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setSize(product.getSize().name());
            response.setApprovalStatus(product.getApprovalStatus().name());

            response.setCategoryName(
                    product.getSubCategory()
                            .getCategory()
                            .getCategoryName());

            response.setSubCategoryName(
                    product.getSubCategory()
                            .getSubCategoryName());

            List<ProductImage> images =
                    productImageRepository.findByProductProductId(
                            product.getProductId());

            List<String> imageUrls = new ArrayList<>();

            for (ProductImage image : images) {

                imageUrls.add(
                        "http://localhost:8082/uploads/"
                                + image.getImageUrl());
            }

            response.setImageUrls(imageUrls);

            responseList.add(response);
        }

        return responseList;
    }
    
    public Long getProductCountBySeller(Integer sellerId) {

        return productRepository.countBySellerIdAndIsDeleted(sellerId, 0);

    }
    
    public List<ProductResponse> searchAndFilterProducts(

            String keyword,
            Integer categoryId,
            Integer subCategoryId,
            String size,
            BigDecimal minPrice,
            BigDecimal maxPrice) {

        ProductSize productSize = null;

        if (size != null && !size.isBlank()) {
            productSize = ProductSize.valueOf(size);
        }

        Specification<Product> specification =
                ProductSpecification.searchProducts(
                        keyword,
                        categoryId,
                        subCategoryId,
                        productSize,
                        minPrice,
                        maxPrice
                );

        List<Product> products =
                productRepository.findAll(specification);

        List<ProductResponse> responseList =
                new ArrayList<>();

        for (Product product : products) {

            ProductResponse response =
                    new ProductResponse();

            response.setProductId(
                    product.getProductId());

            response.setProductName(
                    product.getProductName());

            response.setDescription(
                    product.getDescription());

            response.setPrice(
                    product.getPrice());

            response.setSize(
                    product.getSize().name());

            response.setApprovalStatus(
                    product.getApprovalStatus().name());

            response.setCategoryName(
                    product.getSubCategory()
                            .getCategory()
                            .getCategoryName());

            response.setSubCategoryName(
                    product.getSubCategory()
                            .getSubCategoryName());

            List<ProductImage> images =
                    productImageRepository
                            .findByProductProductId(
                                    product.getProductId());

            List<String> imageUrls =
                    new ArrayList<>();

            for (ProductImage image : images) {

                imageUrls.add(
                        "http://localhost:8082/uploads/"
                                + image.getImageUrl());
            }

            response.setImageUrls(imageUrls);

            responseList.add(response);
        }

        return responseList;
    }
    
    
}