# Backend API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user.

### Method
`POST`

### Request Body
The request body must be a JSON object containing the following fields:

- `email` (string): The email of the user. Must be a valid email address.
- `password` (string): The password of the user. Must be at least 4 characters long.
- `fullname` (object): An object containing the user's full name.
  - `firstname` (string): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string): The last name of the user. (Optional)

### Example Request
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

### Responses

#### Success (201)
- **Description**: User registered successfully.
- **Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "user@example.com"
    },
    "token": "jwt_token"
  }
  ```

#### Validation Error (400)
- **Description**: Validation failed for the request body.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

#### Server Error (500)
- **Description**: An error occurred on the server.
- **Body**:
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Notes
- Ensure that the `email` field is unique.
- Passwords are hashed before being stored in the database.