import Breadcrumb from "./Breadcrumb";
import "./SalesReport.css";

export default function SalesReport(){

    const sales = [
        {
            id:1,
            product:"Nike Air Max",
            orders:25,
            quantity:40,
            revenue:"₹80,000",
            status:"Completed"
        },
        {
            id:2,
            product:"Puma T-Shirt",
            orders:18,
            quantity:30,
            revenue:"₹45,000",
            status:"Completed"
        },
        {
            id:3,
            product:"Adidas Jacket",
            orders:10,
            quantity:12,
            revenue:"₹36,000",
            status:"Pending"
        }
    ];


    return(

        <div className="sales-page">


            <Breadcrumb
                items={[
                    {label:"Seller",path:"/seller"},
                    {label:"Reports",path:"/seller/reports"},
                    {label:"Sales Report"}
                ]}
            />


            {/* Summary Cards */}

            <div className="sales-summary">


                <div className="sales-box">
                    <h4>Total Sales</h4>
                    <h2>₹1,61,000</h2>
                    <span>+12% this month</span>
                </div>


                <div className="sales-box">
                    <h4>Total Orders</h4>
                    <h2>53</h2>
                    <span>Orders completed</span>
                </div>


                <div className="sales-box">
                    <h4>Total Products Sold</h4>
                    <h2>82</h2>
                    <span>Units sold</span>
                </div>


                <div className="sales-box">
                    <h4>Profit</h4>
                    <h2>₹45,000</h2>
                    <span>Monthly profit</span>
                </div>


            </div>



            {/* Table */}

            <div className="sales-card">


                <table className="sales-table">


                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Orders</th>
                            <th>Quantity Sold</th>
                            <th>Revenue</th>
                            <th>Status</th>
                        </tr>

                    </thead>



                    <tbody>


                    {
                        sales.map((item)=>(

                            <tr key={item.id}>


                                <td>#{item.id}</td>


                                <td>

                                    <div className="sales-product">

                                        <div className="sales-avatar">
                                            {item.product.charAt(0)}
                                        </div>

                                        {item.product}

                                    </div>

                                </td>


                                <td>{item.orders}</td>


                                <td>{item.quantity}</td>


                                <td className="revenue">
                                    {item.revenue}
                                </td>


                                <td>

                                    <span 
                                    className={
                                        `sales-status ${
                                            item.status==="Completed"
                                            ?"completed"
                                            :"pending"
                                        }`
                                    }
                                    >
                                        {item.status}
                                    </span>

                                </td>


                            </tr>

                        ))
                    }


                    </tbody>


                </table>


            </div>


        </div>

    )
}