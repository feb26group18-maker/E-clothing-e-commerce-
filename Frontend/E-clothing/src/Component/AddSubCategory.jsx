import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

import { getActiveCategories } from "../services/categoryService";
import { addSubCategory } from "../services/subCategoryService";

import "./SubCategoryList.css";

export default function AddSubCategory() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        categoryId: "",
        subCategoryName: ""
    });

    useEffect(() => {
        loadCategories();
    }, []);

    // const loadCategories = async () => {

    //     try {

    //         const response = await getActiveCategories();

    //         setCategories(response.data);

    //     } catch (error) {

    //         console.error("Error Loading Categories", error);

    //     }

    // };

    const loadCategories = async () => {
    try {
        const response = await getActiveCategories();

        console.log("Categories:", response.data);

        setCategories(response.data);

    } catch (error) {
        console.error(error);
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

            const response = await addSubCategory(formData);

            alert(response.data);

            if (response.data === "SubCategory Added Successfully") {

                navigate("/admin/subcategory");

            }

        } catch (error) {

            console.error(error);

            alert("Unable to Add Sub Category");

        }

    };

    return (

        <div className="product-page">

            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    { label: "Sub Categories", path: "/admin/subcategory" },
                    { label: "Add Sub Category" }
                ]}
            />

            <div className="product-card">

                <div className="table-header">

                    <h3>Add Sub Category</h3>

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
                            placeholder="Enter Sub Category Name"
                            value={formData.subCategoryName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="approve-btn"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => navigate("/admin/subcategory")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


