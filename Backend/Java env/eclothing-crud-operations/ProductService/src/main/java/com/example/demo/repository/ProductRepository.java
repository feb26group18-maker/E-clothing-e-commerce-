package com.example.demo.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.ApprovalStatus;
import com.example.demo.entities.Product;
import com.example.demo.entities.ProductSize;

//public interface ProductRepository extends JpaSpecificationExecutor<Product, Integer> {
public interface ProductRepository extends JpaRepository<Product,Integer>,JpaSpecificationExecutor<Product> {
	List<Product> findByIsDeleted(Integer isDeleted);

    List<Product> findByApprovalStatus(ApprovalStatus approvalStatus);
    
    List<Product> findBySellerIdAndIsDeleted(Integer sellerId, Integer isDeleted);
    
    List<Product> findByApprovalStatusAndIsDeleted(ApprovalStatus approvalStatus,Integer isDeleted);
    
    List<Product> findBySubCategoryCategoryCategoryIdAndApprovalStatusAndIsDeleted(
            Integer categoryId,
            ApprovalStatus approvalStatus,
            Integer isDeleted
    );
    
    List<Product> findBySubCategorySubCategoryIdAndApprovalStatusAndIsDeleted(
            Integer subCategoryId,
            ApprovalStatus approvalStatus,
            Integer isDeleted
    );
    
    @Query("""
    	       SELECT p FROM Product p
    	       WHERE 
    	       (LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%'))
    	       OR 
    	       LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))
    	       AND p.approvalStatus = :status
    	       AND p.isDeleted = 0
    	       """)
    	List<Product> searchProducts(@Param("keyword") String keyword,@Param("status") ApprovalStatus status);
    
    List<Product> findBySizeAndPriceBetweenAndApprovalStatusAndIsDeleted(
            ProductSize size,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            ApprovalStatus approvalStatus,
            Integer isDeleted
    );
    


    Long countBySellerIdAndIsDeleted(Integer sellerId, Integer isDeleted);

    

}
