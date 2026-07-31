package com.example.demo.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ProductImageRequest;
import com.example.demo.entities.Product;
import com.example.demo.entities.ProductImage;
import com.example.demo.repository.ProductImageRepository;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductImageService {
//	private final String UPLOAD_DIR = "uploads/";
	private static final String UPLOAD_DIR = "C:/uploads/";
	
	@Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    public String addProductImage(ProductImageRequest request) {

        Product product = productRepository.findById(request.getProductId()).orElse(null);

        if (product == null) {
            return "Product Not Found";
        }

        ProductImage image = new ProductImage();

        image.setProduct(product);
        image.setImageUrl(request.getImageUrl());

        productImageRepository.save(image);

        return "Image Added Successfully";
    }
    
    public String uploadImage(Integer productId, MultipartFile file) {

    Product product = productRepository.findById(productId).orElse(null);

    if (product == null) {
        return "Product Not Found";
    }

    if (file == null || file.isEmpty()) {
        return "Please Select an Image";
    }

    try {

        // Upload directory
        String uploadDir = "C:/uploads/";

        // Create upload folder if it doesn't exist
        File uploadFolder = new File(uploadDir);

        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        // Generate unique file name
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Destination file
        File destinationFile = new File(uploadFolder, fileName);

        // Debugging
        System.out.println("Upload Folder : " + uploadFolder.getAbsolutePath());
        System.out.println("Destination : " + destinationFile.getAbsolutePath());

        // Save image
        file.transferTo(destinationFile);

        // Save image details in database
        ProductImage image = new ProductImage();
        image.setProduct(product);
        image.setImageUrl(fileName);

        productImageRepository.save(image);

        return "Image Uploaded Successfully";

    } catch (IOException e) {
        e.printStackTrace();
        return "Image Upload Failed : " + e.getMessage();
    }
}
    
    public void saveImages(Product product, MultipartFile[] images) {

        if (images == null || images.length == 0) {
            return;
        }

        File folder = new File("C:/uploads");

        if (!folder.exists()) {
            folder.mkdirs();
        }

        for (MultipartFile file : images) {

            if (file.isEmpty()) {
                continue;
            }

            try {

                String fileName =
                        UUID.randomUUID() + "_" + file.getOriginalFilename();

                File destination =
                        new File(folder, fileName);

                file.transferTo(destination);

                ProductImage image = new ProductImage();

                image.setProduct(product);
                image.setImageUrl(fileName);

                productImageRepository.save(image);

            }
            catch (IOException e) {
                e.printStackTrace();
            }

        }

    }
    
    public void deleteProductImages(Product product) {

        productImageRepository.deleteByProduct(product);

    }
}
