// import { useEffect, useState } from "react";
// import Breadcrumb from "./Breadcrumb";
// import "./SellerList.css";

// import { getSellers } from "../services/sellerService";

// export default function SellerList() {

//   const [sellers, setSellers] = useState([]);

//   useEffect(() => {
//     loadSellers();
//   }, []);

//   const loadSellers = async () => {
//     try {

//       const response = await getSellers();

//       setSellers(response.data);

//     } catch (error) {

//       console.error("Error Loading Sellers", error);

//     }
//   };

//   const getStatusText = (status) => {

//     if (status === 1) {
//       return "Active";
//     }

//     return "Inactive";
//   };

//   return (
//     <>
//       <Breadcrumb
//         items={[
//           { label: "Admin", path: "/admin" },
//           { label: "Sellers", path: "/admin/sellers" },
//           { label: "Seller List" },
//         ]}
//       />

//       <div className="seller-table-card">

//         <table className="seller-table">

//           <thead>

//             <tr>
//               <th>ID</th>
//               <th>Seller Name</th>
//               <th>Email</th>
//               <th>Contact</th>
//               <th>Shop Name</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>

//           </thead>

//           <tbody>

//             {sellers.length === 0 ? (

//               <tr>
//                 <td
//                   colSpan="7"
//                   style={{ textAlign: "center" }}
//                 >
//                   No Sellers Found
//                 </td>
//               </tr>

//             ) : (

//               sellers.map((seller) => (

//                 <tr key={seller.id}>

//                   <td>
//                     {seller.id}
//                   </td>

//                   <td>
//                     {seller.name}
//                   </td>

//                   <td>
//                     {seller.email}
//                   </td>

//                   <td>
//                     {seller.contact}
//                   </td>

//                   <td>
//                     {seller.shopName}
//                   </td>

//                   <td>

//                     <span
//                       className={`status ${
//                         getStatusText(seller.status).toLowerCase()
//                       }`}
//                     >
//                       {getStatusText(seller.status)}
//                     </span>

//                   </td>

//                   <td>

//                     <div className="action-buttons">

//                       <button
//                         className="approve-btn"
//                         onClick={() =>
//                           alert(
//                             "Approve Seller ID: " +
//                             seller.id
//                           )
//                         }
//                       >
//                         Approve
//                       </button>

//                       <button
//                         className="reject-btn"
//                         onClick={() =>
//                           alert(
//                             "Reject Seller ID: " +
//                             seller.id
//                           )
//                         }
//                       >
//                         Reject
//                       </button>
// {/* 
//                       <button
//                         className="delete-btn"
//                         onClick={() =>
//                           alert(
//                             "Delete Seller ID: " +
//                             seller.id
//                           )
//                         }
//                       >
//                         Delete
//                       </button> */}

//                     </div>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>
//     </>
//   );
// }


// import { useEffect, useState } from "react";
// import Breadcrumb from "./Breadcrumb";
// import "./SellerList.css";

// import {
//     getSellers,
//     approveSeller,
//     rejectSeller,
// } from "../services/sellerService";

// export default function SellerList() {

//     const [sellers, setSellers] = useState([]);

//     useEffect(() => {
//         loadSellers();
//     }, []);

//     const loadSellers = async () => {

//         try {

//             const response = await getSellers();

//             setSellers(response.data);

//         } catch (error) {

//             console.error("Error Loading Sellers", error);

//         }

//     };

//     const handleApprove = async (id) => {

//         try {

//             const response = await approveSeller(id);

//             alert(response.data);

//             await loadSellers();

//         } catch (error) {

//             console.error("Error Approving Seller", error);

//             alert("Unable to approve seller");

//         }

//     };

//     const handleReject = async (id) => {

//         try {

//             const response = await rejectSeller(id);

//             alert(response.data);

//             await loadSellers();

//         } catch (error) {

//             console.error("Error Rejecting Seller", error);

//             alert("Unable to reject seller");

//         }

//     };

//     const getStatusText = (status) => {

//         return status === 1 ? "Active" : "Inactive";

//     };

//     return (
//         <>
//             <Breadcrumb
//                 items={[
//                     { label: "Admin", path: "/admin" },
//                     { label: "Sellers", path: "/admin/sellers" },
//                     { label: "Seller List" },
//                 ]}
//             />

//             <div className="seller-table-card">

//                 <table className="seller-table">

//                     <thead>

//                         <tr>
//                             <th>ID</th>
//                             <th>Seller Name</th>
//                             <th>Email</th>
//                             <th>Contact</th>
//                             <th>Shop Name</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {sellers.length === 0 ? (

//                             <tr>
//                                 <td
//                                     colSpan="7"
//                                     style={{ textAlign: "center" }}
//                                 >
//                                     No Sellers Found
//                                 </td>
//                             </tr>

//                         ) : (

//                             sellers.map((seller) => {

//                                 const isActive = seller.status === 1;

//                                 return (

//                                     <tr key={seller.id}>

//                                         <td>
//                                             #{seller.id}
//                                         </td>

//                                         <td>
//                                             {seller.name}
//                                         </td>

//                                         <td>
//                                             {seller.email}
//                                         </td>

//                                         <td>
//                                             {seller.contact}
//                                         </td>

//                                         <td>
//                                             {seller.shopName}
//                                         </td>

//                                         <td>

//                                             <span
//                                                 className={`status ${
//                                                     isActive
//                                                         ? "active"
//                                                         : "inactive"
//                                                 }`}
//                                             >
//                                                 {getStatusText(
//                                                     seller.status
//                                                 )}
//                                             </span>

//                                         </td>

//                                         <td>

//                                             <div className="action-buttons">

//                                                 <button
//                                                     className="approve-btn"
//                                                     disabled={isActive}
//                                                     onClick={() =>
//                                                         handleApprove(
//                                                             seller.id
//                                                         )
//                                                     }
//                                                 >
//                                                     Approve
//                                                 </button>

//                                                 <button
//                                                     className="reject-btn"
//                                                     onClick={() =>
//                                                         handleReject(
//                                                             seller.id
//                                                         )
//                                                     }
//                                                 >
//                                                     Reject
//                                                 </button>

//                                             </div>

//                                         </td>

//                                     </tr>

//                                 );

//                             })

//                         )}

//                     </tbody>

//                 </table>

//             </div>
//         </>
//     );
// }

import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import "./SellerList.css";

import {
    getSellers,
    approveSeller,
    rejectSeller,
} from "../services/sellerService";

export default function SellerList() {

    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        loadSellers();
    }, []);

    const loadSellers = async () => {

        try {

            const response = await getSellers();

            setSellers(response.data);

        } catch (error) {

            console.error("Error Loading Sellers", error);

        }

    };

    // ================= APPROVE =================

    const handleApprove = async (id) => {

        try {

            const response = await approveSeller(id);

            alert(response.data);

            // Refresh seller data
            await loadSellers();

        } catch (error) {

            console.error("Error Approving Seller", error);

            if (error.response?.data) {

                alert(error.response.data);

            } else {

                alert("Unable to approve seller");

            }

        }

    };

    // ================= REJECT =================

    const handleReject = async (id) => {

        try {

            const response = await rejectSeller(id);

            alert(response.data);

            // Refresh seller data
            await loadSellers();

        } catch (error) {

            console.error("Error Rejecting Seller", error);

            if (error.response?.data) {

                alert(error.response.data);

            } else {

                alert("Unable to reject seller");

            }

        }

    };

    // ================= STATUS =================

    const getStatusText = (status) => {

        return status === 1 ? "Active" : "Inactive";

    };

    return (

        <>
            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    { label: "Sellers", path: "/admin/sellers" },
                    { label: "Seller List" },
                ]}
            />

            <div className="seller-table-card">

                <table className="seller-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Seller Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Shop Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {sellers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{ textAlign: "center" }}
                                >
                                    No Sellers Found
                                </td>

                            </tr>

                        ) : (

                            sellers.map((seller) => {

                                // status = 1 → Active
                                // status = 0 → Inactive

                                const isActive = seller.status === 1;

                                return (

                                    <tr key={seller.id}>

                                        {/* ID */}

                                        <td>
                                            #{seller.id}
                                        </td>

                                        {/* Seller Name */}

                                        <td>
                                            {seller.name}
                                        </td>

                                        {/* Email */}

                                        <td>
                                            {seller.email}
                                        </td>

                                        {/* Contact */}

                                        <td>
                                            {seller.contact}
                                        </td>

                                        {/* Shop Name */}

                                        <td>
                                            {seller.shopName}
                                        </td>

                                        {/* Status */}

                                        <td>

                                            <span
                                                className={`status ${
                                                    isActive
                                                        ? "active"
                                                        : "inactive"
                                                }`}
                                            >
                                                {getStatusText(
                                                    seller.status
                                                )}
                                            </span>

                                        </td>

                                        {/* Actions */}

                                        <td>

                                            <div className="action-buttons">

                                                {/* APPROVE */}

                                                <button
                                                    className="approve-btn"
                                                    disabled={isActive}
                                                    onClick={() =>
                                                        handleApprove(
                                                            seller.id
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                {/* REJECT */}

                                                <button
                                                    className="reject-btn"
                                                    disabled={!isActive}
                                                    onClick={() =>
                                                        handleReject(
                                                            seller.id
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                );

                            })

                        )}

                    </tbody>

                </table>

            </div>
        </>
    );
}