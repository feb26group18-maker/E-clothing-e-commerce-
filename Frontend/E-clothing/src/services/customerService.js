const USER_API = "http://localhost:8080/users";

// ======================================
// GET CUSTOMER PROFILE
// ======================================

export const getCustomerProfile = async (customerId) => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // Check logged-in user
    if (!user) {
        throw new Error("User not logged in");
    }

    // Check JWT token
    if (!user.token) {
        throw new Error("JWT token not found");
    }

    // Debug
    console.log("Customer ID:", customerId);

    console.log(
        "TOKEN:",
        user.token
    );

    console.log(
        "AUTH HEADER:",
        `Bearer ${user.token}`
    );

    // API call
    const response = await fetch(
        `${USER_API}/customer/profile/${customerId}`,
        {
            method: "GET",

            headers: {
                "Content-Type": "application/json",

                "Authorization":
                    `Bearer ${user.token}`
            }
        }
    );

    // Handle error
    if (!response.ok) {

        const errorText =
            await response.text();

        console.log(
            "Customer Profile API Error:",
            response.status,
            errorText
        );

        throw new Error(
            errorText ||
            "Failed to get customer profile"
        );
    }

    // Convert response to JSON
    const data =
        await response.json();

    console.log(
        "Customer Profile Response:",
        data
    );

    return data;
};
