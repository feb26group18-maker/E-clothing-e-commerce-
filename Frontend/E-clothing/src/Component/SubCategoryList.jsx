import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./SubCategoryList.css";

import {
    getSubCategories,
    deleteSubCategory,
} from "../services/subCategoryService";

export default function SubCategoryList() {

    const navigate = useNavigate();

    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {

        loadSubCategories();

    }, []);

    const loadSubCategories = async () => {

        try {

            const response = await getSubCategories();

            setSubCategories(response.data);

        } catch (error) {

            console.error("Error Loading SubCategories", error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this subcategory?"
        );

        if (!confirmDelete) return;

        try {

            await deleteSubCategory(id);

            loadSubCategories();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="product-page">

            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    { label: "Sub Categories" },
                ]}
            />

            <div className="product-card">

                <div className="table-header">

                    <h3>Sub Category Management</h3>

                    <button
                        className="add-btn"
                        onClick={() => navigate("/admin/subcategory/add")}
                    >
                        + Add Sub Category
                    </button>

                </div>

                <table className="product-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {subCategories.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{ textAlign: "center" }}
                                >
                                    No Sub Categories Found
                                </td>

                            </tr>

                        ) : (

                            subCategories.map((subCategory) => (

                                <tr key={subCategory.subCategoryId}>

                                    <td>
                                        #{subCategory.subCategoryId}
                                    </td>

                                    <td>
                                        {subCategory.category.categoryName}
                                    </td>

                                    <td>

                                        <div className="name-cell">

                                            <div className="avatar">

                                                {subCategory.subCategoryName.charAt(0)}

                                            </div>

                                            {subCategory.subCategoryName}

                                        </div>

                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${
                                                subCategory.isDeleted === 0
                                                    ? "active"
                                                    : "inactive"
                                            }`}
                                        >
                                            {subCategory.isDeleted === 0
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="approve-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/subcategory/edit/${subCategory.subCategoryId}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(subCategory.subCategoryId)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}