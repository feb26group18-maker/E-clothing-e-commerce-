import { NavLink } from "react-router-dom";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // return (
    // <ul className="nav nav-pills flex-column p-3 border-end">
    //   {role === 2 && (
    //     <>
    //       <li className="nav-item">
    //         <NavLink to="search" className="nav-link">
    //           Search
    //         </NavLink>
    //       </li>

    //       <li className="nav-item">
    //         <NavLink to="booking" className="nav-link">
    //           Booking
    //         </NavLink>
    //       </li>
    //     </>
    //   )}
    //   <li className="nav-item">
    //     <NavLink to="/logout" className="nav-link text-danger">
    //       Logout
    //     </NavLink>
    //   </li>

    // </ul>
  // );
}