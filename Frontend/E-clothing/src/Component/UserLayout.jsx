// import Home from "./Home";
// import { Outlet } from "react-router-dom";

// export default function UserLayout() {

//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <>
    
//       {/* optional welcome text */}
//       <div className="container mt-2">
//         <label>Welcome, <b>{user?.name}</b></label>
//       </div>

//       <Home />

//       {/* ONLY MAIN CONTENT */}
//       <div style={{ padding: "20px" }}>
//         <Outlet />
//       </div>
//     </>
//   );
// }

import { Outlet } from "react-router-dom";

export default function UserLayout() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            {/* <div className="container mt-2">
                <label>
                    Welcome, <b>{user?.name}</b>
                </label>
            </div> */}

            <div style={{ padding: "20px" }}>
                <Outlet />
            </div>
        </>
    );
}