# Eclothing AuthService (.NET 8 Web API)

This microservice is the .NET 8 port of the Java Spring Boot Auth Microservice for the **Eclothing** platform. It implements authentication, user registration (Customers and Sellers), password hashing using BCrypt, JWT token generation & validation, and user management endpoints adhering to Clean Architecture principles and Entity Framework Core.

---

## 🛠 Features & Technology Stack

- **Framework**: .NET 8 Web API
- **Architecture**: Modular / Clean Architecture (Controllers, Services, Data Access EF Core, Entities, DTOs)
- **Database & Persistence**: Entity Framework Core (EF Core) with MySQL provider (`Pomelo.EntityFrameworkCore.MySql`) and automatic fallback to InMemory database for local testing.
- **Security & Authentication**: BCrypt password hashing & JWT Bearer Token generation and validation.
- **Documentation**: Swagger UI / OpenAPI specification.

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- MySQL Server (Optional - if MySQL is running on `localhost:3306`, ensure schema `p18_eclothing_populated` exists).

### Running the Service

1. Open terminal inside the project directory:
   ```bash
   cd Eclothing/AuthService
   ```

2. Build the project to verify zero compilation errors:
   ```bash
   dotnet build
   ```

3. Run the microservice:
   ```bash
   dotnet run
   ```

4. Access Swagger UI in your browser at:
   `http://localhost:5000/swagger` or `https://localhost:7001/swagger`

---

## ⚙ Configuration (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=p18_eclothing_populated;User=root;Password=root;"
  },
  "JwtSettings": {
    "Secret": "SuperSecretJwtKeyForEclothingAuthMicroservice2026!#$",
    "Issuer": "EclothingAuthService",
    "Audience": "EclothingApp",
    "ExpiryMinutes": "1440"
  }
}
```

---

## 📡 API Endpoints & Request Payloads

### 1. Register Customer
- **Endpoint**: `POST /auth/register/customer`
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "mobile": "9876543210",
  "password": "Password123!",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001"
}
```
- **Response** (`200 OK`): `"Customer Registered Successfully"`

---

### 2. Register Seller
- **Endpoint**: `POST /auth/register/seller`
- **Request Body**:
```json
{
  "name": "John Smith",
  "email": "john.seller@example.com",
  "mobile": "9123456789",
  "password": "SellerPassword123!",
  "shopName": "Fashion Hub",
  "gstNumber": "27AAACB1234C1ZV",
  "businessAddress": "456 Market Lane"
}
```
- **Response** (`200 OK`): `"Seller Registered Successfully"`

---

### 3. User Login (JWT Token Generation)
- **Endpoint**: `POST /auth/login`
- **Request Body**:
```json
{
  "email": "jane.doe@example.com",
  "password": "Password123!"
}
```
- **Response** (`200 OK`):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": "Customer",
  "status": 1
}
```

---

### 4. Validate Token
- **Endpoint**: `POST /auth/validate`
- **Header**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
```json
{
  "valid": true,
  "userId": "1",
  "email": "jane.doe@example.com",
  "role": "Customer"
}
```

---

### 5. Get All Users
- **Endpoint**: `GET /users`
- **Response** (`200 OK`): List of active non-deleted users.

---

### 6. Get User By ID
- **Endpoint**: `GET /users/{id}`
- **Response** (`200 OK`): User details object.

---

### 7. Update Customer Profile
- **Endpoint**: `PUT /users/{id}`
- **Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "mobile": "9876543210",
  "address": "789 New St",
  "city": "Pune",
  "state": "Maharashtra",
  "pincode": "411001"
}
```
- **Response** (`200 OK`): `"Customer Updated Successfully"`

---

### 8. Update Seller Profile
- **Endpoint**: `PUT /users/seller/{id}`
- **Request Body**:
```json
{
  "name": "John Smith Updated",
  "email": "john.seller@example.com",
  "mobile": "9123456789",
  "shopName": "Fashion Hub Express",
  "gstNumber": "27AAACB1234C1ZV",
  "businessAddress": "789 New Market Lane"
}
```
- **Response** (`200 OK`): `"Seller Updated Successfully"`

---

### 9. Get Seller Profile
- **Endpoint**: `GET /users/seller/profile/{id}`
- **Response** (`200 OK`):
```json
{
  "userId": 2,
  "name": "John Smith",
  "email": "john.seller@example.com",
  "mobile": "9123456789",
  "shopName": "Fashion Hub",
  "gstNumber": "27AAACB1234C1ZV",
  "businessAddress": "456 Market Lane"
}
```

---

### 10. Soft Delete User
- **Endpoint**: `DELETE /users/{id}`
- **Response** (`200 OK`): `"User Deleted Successfully"`
