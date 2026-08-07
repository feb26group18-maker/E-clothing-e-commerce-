import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { addCategory } from "../services/categoryService";
import "./CategoryList.css";

export default function AddCategory() {

    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (categoryName.trim() === "") {
            alert("Category Name is required");
            return;
        }

        try {

            await addCategory({
                categoryName: categoryName
            });

            alert("Category Added Successfully");

            navigate("/admin/category");

        } catch (error) {

            console.error(error);

            alert("Unable to add category");

        }

    };
        return (

        <div className="product-page">

            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    { label: "Categories", path: "/admin/category" },
                    { label: "Add Category" }
                ]}
            />

            <div className="product-card">

                <div className="table-header">

                    <h3>Add Category</h3>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Category Name</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Category Name"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                        />

                    </div>

                    <div
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            gap: "10px"
                        }}
                    >

                        <button
                            type="submit"
                            className="approve-btn"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => navigate("/admin/category")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}