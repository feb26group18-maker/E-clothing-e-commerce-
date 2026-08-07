// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Breadcrumb from "./Breadcrumb";
// import "./CustomerList.css";

// import { getCustomers } from "../services/customerService";

// export default function CustomerList() {

//   const navigate = useNavigate();

//   const [customers, setCustomers] = useState([]);

//   useEffect(() => {

//     loadCustomers();

//   }, []);

//   const loadCustomers = async () => {

//     try {

//       const response = await getCustomers();

//       setCustomers(response.data);

//     } catch (error) {

//       console.error("Error Loading Customers", error);

//     }

//   };

//   const getStatusText = (status) => {

//     if (status === 1) {
//       return "Active";
//     }

//     return "Inactive";
//   };

//   const deleteCustomer = (id) => {

//     alert("Delete Customer ID: " + id);

//   };

//   return (

//     <div className="customer-page">

//       <Breadcrumb
//         items={[
//           { label: "Admin", path: "/admin" },
//           { label: "Customers", path: "/admin/customers" },
//           { label: "Customer List" },
//         ]}
//       />

//       <div className="customer-card">

//         <table className="customer-table">

//           <thead>

//             <tr>
//               <th>ID</th>
//               <th>Customer</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>

//           </thead>

//           <tbody>

//             {customers.length === 0 ? (

//               <tr>

//                 <td
//                   colSpan="6"
//                   style={{ textAlign: "center" }}
//                 >
//                   No Customers Found
//                 </td>

//               </tr>

//             ) : (

//               customers.map((customer) => (

//                 <tr key={customer.id}>

//                   <td className="id-cell">
//                     #{customer.id}
//                   </td>

//                   <td className="name-cell">

//                     <div className="avatar">
//                       {customer.name?.charAt(0)}
//                     </div>

//                     {customer.name}

//                   </td>

//                   <td>
//                     {customer.email}
//                   </td>

//                   <td>
//                     {customer.contact}
//                   </td>

//                   <td>

//                     <span
//                       className={`status ${
//                         getStatusText(customer.status).toLowerCase()
//                       }`}
//                     >
//                       {getStatusText(customer.status)}
//                     </span>

//                   </td>

//                   <td>

//                     <div className="action-buttons">
// {/* 
//                       <button
//                         className="view-btn"
//                         onClick={() =>
//                           navigate(
//                             `/admin/customers/${customer.id}`
//                           )
//                         }
//                       >
//                         View
//                       </button> */}


//                       <button
//                         className="delete-btn"
//                         onClick={() =>
//                           deleteCustomer(customer.id)
//                         }
//                       >
//                         Delete
//                       </button>

//                     </div>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   );
// }


import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import "./CustomerList.css";

import {
  getCustomers,
  deleteCustomer as deleteCustomerApi,
} from "../services/customerService";

export default function CustomerList() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {

    loadCustomers();

  }, []);

  const loadCustomers = async () => {

    try {

      const response = await getCustomers();

      setCustomers(response.data);

    } catch (error) {

      console.error("Error Loading Customers", error);

    }

  };

  const getStatusText = (status) => {

    return status === 1 ? "Active" : "Inactive";

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await deleteCustomerApi(id);

      alert(response.data);

      if (response.data === "Customer Deleted Successfully") {

        await loadCustomers();

      }

    } catch (error) {

      console.error("Error Deleting Customer", error);

      if (error.response?.data) {

        alert(error.response.data);

      } else {

        alert("Unable to Delete Customer");

      }

    }

  };

  return (

    <div className="customer-page">

      <Breadcrumb
        items={[
          { label: "Admin", path: "/admin" },
          { label: "Customers", path: "/admin/customers" },
          { label: "Customer List" },
        ]}
      />

      <div className="customer-card">

        <table className="customer-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {customers.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{ textAlign: "center" }}
                >
                  No Customers Found
                </td>

              </tr>

            ) : (

              customers.map((customer) => (

                <tr key={customer.id}>

                  <td className="id-cell">
                    #{customer.id}
                  </td>

                  <td className="name-cell">

                    <div className="avatar">
                      {customer.name?.charAt(0)}
                    </div>

                    {customer.name}

                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    {customer.contact}
                  </td>

                  <td>

                    <span
                      className={`status ${
                        getStatusText(customer.status).toLowerCase()
                      }`}
                    >
                      {getStatusText(customer.status)}
                    </span>

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(customer.id)
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