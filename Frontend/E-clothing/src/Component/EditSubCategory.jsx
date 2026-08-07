import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./SubCategoryList.css";

import { getActiveCategories } from "../services/categoryService";

import {
    getSubCategoryById,
    updateSubCategory,
} from "../services/subCategoryService";

export default function EditSubCategory() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({

        categoryId: "",
        subCategoryName: ""

    });

    useEffect(() => {

        loadCategories();
        loadSubCategory();

    }, []);

    const loadCategories = async () => {

        try {

            const response = await getActiveCategories();

            setCategories(response.data);

        } catch (error) {

            console.error("Error Loading Categories", error);

        }

    };

    const loadSubCategory = async () => {

        try {

            const response = await getSubCategoryById(id);

            setFormData({

                categoryId: response.data.category.categoryId,

                subCategoryName: response.data.subCategoryName

            });

        } catch (error) {

            console.error("Error Loading SubCategory", error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.categoryId === "") {

            alert("Please Select Category");

            return;

        }

        if (formData.subCategoryName.trim() === "") {

            alert("Sub Category Name is required");

            return;

        }

        try {

            const response =
                await updateSubCategory(id, formData);

            alert(response.data);

            if (response.data === "SubCategory Updated Successfully") {

                navigate("/admin/subcategory");

            }

        } catch (error) {

            console.error(error);

            alert("Unable to Update Sub Category");

        }

    };

    return (

        <div className="product-page">

            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    {
                        label: "Sub Categories",
                        path: "/admin/subcategory",
                    },
                    {
                        label: "Edit Sub Category",
                    },
                ]}
            />

            <div className="product-card">

                <div className="table-header">

                    <h3>Edit Sub Category</h3>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Category</label>

                        <select
                            className="form-control"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category.categoryId}
                                    value={category.categoryId}
                                >
                                    {category.categoryName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Sub Category Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="subCategoryName"
                            value={formData.subCategoryName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="approve-btn"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                                navigate("/admin/subcategory")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}