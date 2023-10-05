//Mongoose to swagger for schema representation
const m2s = require('mongoose-to-swagger');
//Model's to represent through mongoose to swagger
const User = require('./models/user.model');
const Product = require('./models/product.model');

//Built based on openapi 3.01.0
//see more: https://spec.openapis.org/oas/latest.html
exports.options = {
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }
    },
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products Project Application",
        "contact": {
            "name": "API Support",
            "url": "https//www.exm.com",
            "email": "support@exmp.com"
        }
    },
    "servers": [
        {
            url: "http://localhost:3000",
            description: "Local Server"
        },
        {
            url: "https://www.example.com",
            description: "Testing Server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API for users"
        },
        {
            "name": "Products",
            "description": "API for products"            
        },
        {
         "  name": "Users and Products",
            "description": "API for users and products"
        }
    ],
    "paths": {
        "/api/users": {
            "get": {
                "tags": [
                    "Users"
                ],
                "description": "Return all users",
                "responses": {
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Users"
                ],
                "description": "Create new User",
                "requestBody": {
                    "description": "User to create",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string"},
                                    "password": { "type": "string"},
                                    "name": { "type": "string "},
                                    "surname": { "type": "string "},
                                    "email": { "type": "string "},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": { "type": "string "},
                                            "road": { "type": "string "}
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type" : "string"},
                                                "number": { "type": "string" }
                                            }
                                        }
                                    }
                                },
                                "required": ["username", "password", "email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user is created"
                    }
                }
            }
        },
        "/api/users/{username}": {
            "get": {
                "tags": [
                    "Users"
                ],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "username to search for",
                        "type": "string"
                    }
                ],
                "description": "Get user with specific username",
                "summary":"Summary Details",
                "responses": {
                    "200": {
                        "description": "a user",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Users"
                ],
                "description": "Update User",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user to update",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Data of user to Update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string"},
                                    "name": { "type": "string"},
                                    "surname": { "type": "string"},
                                    "email": { "type": "string"},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": { "type": "string"},
                                            "road": { "type": "string"}
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": { "type": "string"},
                                                "number": { "type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User Updated",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "delete": {
                "tags": ["Users"],
                "description": "Delete User",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "description": "Username of user to delete",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete User"
                    }
                }
            }
        },
        "/api/users-products": {
            "get": {
                "tags": [
                    "Users and Products"
                ],
                "summary": "All user's Procucts",
                "description": "Get all user's Products",
                "responses": {
                    "200": {
                        "description": "A list of users and products",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "post": {
                "tags": ["Users and Products"],
                "description": "Add New Product for User",
                "requestBody": {
                    "description": "User that we want to add product",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string" },
                                    "products": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "product": { "type": "string" },
                                                "cost": { "type": "number" },
                                                "quantity": { "type": "number" }
                                            }
                                        }
                                    }
                                },
                                "required": ["quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New Product is added"
                    }
                }
            }
        },
        "/api/users-products/{username}": {
            "get": {
                "tags": ["Users and Products"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's username to find products",
                        "type": "string"
                    }
                ],
                "description": "Description text",
                "summary": "Summary Text",
                "responses": {
                    "200": {
                        "description": "User's Products",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": ["Users and Products"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's username to find products",
                        "type": "string"
                    }
                ],
                "description": "Update user's product",
                "requestBody": {
                    "description": "Description for requestbody",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "product": {
                                        "type": "object",
                                        "properties": {
                                            "_id": { "type": "string" },
                                            "quantity": {"type": "number"}
                                        }
                                    }
                                },
                                "required": ["quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Description for response"
                    }
                }
            }
        },
        "/api/users-products/{username}/products/{product}": {
            "delete": {
                "tags": ["Users and Products"],
                "description": "Description for delete",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "description": "username to find",
                        "required": true
                    },
                    {
                        "name": "product",
                        "in": "path",
                        "description": "product name to delete",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Product Deleted"
                    }
                }
            }
        }
    }
}