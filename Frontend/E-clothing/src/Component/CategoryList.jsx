import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./CategoryList.css";

import {
    getCategories,
    deleteCategory,
} from "../services/categoryService";

export default function CategoryList() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        } catch (error) {

            console.error("Error Loading Categories", error);

        }

    };
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCategory(id);

            loadCategories();

        } catch (error) {

            console.error(error);

        }

    };
    return (

        <div className="product-page">

            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    { label: "Categories" },
                ]}
            />

            <div className="product-card">

                <div className="table-header">

                    <h3>Category Management</h3>

                    <button
                        className="add-btn"
                        onClick={() => navigate("/admin/category/add")}
                    >
                        + Add Category
                    </button>

                </div>

                <table className="product-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {categories.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    style={{ textAlign: "center" }}
                                >
                                    No Categories Found
                                </td>

                            </tr>

                        ) : (

                            categories.map((category) => (

                                <tr key={category.categoryId}>
                                    <td>#{category.categoryId}</td>

                                    <td>

                                        <div className="name-cell">

                                            <div className="avatar">

                                                {category.categoryName.charAt(0)}

                                            </div>

                                            {category.categoryName}

                                        </div>

                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${category.isDeleted === 0
                                                    ? "active"
                                                    : "inactive"
                                                }`}
                                        >
                                            {category.isDeleted === 0
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
                                                        `/admin/category/edit/${category.categoryId}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(category.categoryId)
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