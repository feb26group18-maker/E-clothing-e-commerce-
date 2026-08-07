import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

import {
    getCategoryById,
    updateCategory
} from "../services/categoryService";

export default function EditCategory() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {

        loadCategory();

    }, []);

    const loadCategory = async () => {

        try {

            const response = await getCategoryById(id);

            setCategoryName(response.data.categoryName);

        } catch (error) {

            console.error("Error Loading Category", error);

        }

    };
        const handleSubmit = async (e) => {

        e.preventDefault();

        if (categoryName.trim() === "") {

            alert("Category Name is required");

            return;

        }

        try {

            const category = {

                categoryName: categoryName

            };

            await updateCategory(id, category);

            alert("Category Updated Successfully");

            navigate("/admin/category");

        } catch (error) {

            console.error("Error Updating Category", error);

            alert("Failed to Update Category");

        }

    };
        return (

        <div className="product-page">

            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    { label: "Categories", path: "/admin/category" },
                    { label: "Edit Category" }
                ]}
            />

            <div className="product-card">

                <h3>Edit Category</h3>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Category Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                            placeholder="Enter Category Name"
                        />

                    </div>

                    <button
                        type="submit"
                        className="approve-btn"
                    >
                        Update Category
                    </button>

                    <button
                        type="button"
                        className="delete-btn ms-2"
                        onClick={() => navigate("/admin/category")}
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>

    );

}