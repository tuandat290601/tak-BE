"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc = void 0;
const package_json_1 = require("./package.json");
exports.doc = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: package_json_1.name,
            version: package_json_1.version,
        },
        consumes: ["application/json", "application/x-www-form-urlencoded"],
        servers: [
            { url: "https://ckwhite-d3ov6wzrda-as.a.run.app/api/v1.0" },
            { url: "http://localhost:3000/api/v1.0" },
        ],
        components: {
            securitySchemes: {
                Bearer: {
                    name: "Authorization",
                    in: "header",
                    type: "apiKey",
                },
            },
            parameters: {
                filters: {
                    name: "filters",
                    in: "query",
                    description: "filter, visit https://www.npmjs.com/package/sequelize-api-paginate for syntax",
                    type: "string",
                },
                filtersEdit: {
                    name: "filters",
                    in: "query",
                    description: "filter, visit https://www.npmjs.com/package/sequelize-api-paginate for syntax",
                    type: "string",
                    required: true,
                },
                sortField: {
                    name: "sortField",
                    in: "query",
                    description: "sortField, visit https://www.npmjs.com/package/sequelize-api-paginate for syntax",
                    type: "string",
                },
                sortOrder: {
                    name: "sortOrder",
                    in: "query",
                    description: "sort order, visit https://www.npmjs.com/package/sequelize-api-paginate for syntax",
                    type: "string",
                },
                currentPage: {
                    name: "currentPage",
                    in: "query",
                    description: "currentPage, visit https://www.npmjs.com/package/sequelize-api-paginate for syntax",
                    type: "integer",
                },
                pageSize: {
                    name: "pageSize",
                    in: "query",
                    description: "pageSize, visit https://www.npmjs.com/package/sequelize-api-paginate for syntax",
                    type: "number",
                },
                categoryListIds: {
                    name: "categoryListIds",
                    in: "query",
                    description: "List of cate Ids, separated by ','",
                    type: "string",
                    example: "00000000-0000-0000-0000-000000000000,00000000-0000-0000-0000-000000000000",
                },
            },
            schemas: {
                // Users
                User: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "The user's email.",
                            example: "user@gmail.com",
                        },
                        password: {
                            type: "string",
                            description: "The user's password.",
                            example: 123456,
                        },
                        fullName: {
                            type: "string",
                            description: "The user's full name",
                            example: "admin",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Created date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        createdBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Created by user",
                        },
                        updatedAt: {
                            type: "string",
                            description: "Updated date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        updatedBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Updated by user",
                        },
                    },
                },
                register: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "The user's email.",
                            example: "user@gmail.com",
                        },
                        password: {
                            type: "string",
                            description: "The user's password.",
                            example: 123456,
                        },
                        fullName: {
                            type: "string",
                            description: "The user's full name",
                            example: "admin",
                        },
                        createdAt: {
                            type: "string",
                            description: "",
                            example: "",
                        },
                    },
                },
                login: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            description: "The user's email.",
                            example: "user@gmail.com",
                        },
                        password: {
                            type: "string",
                            description: "The user's password.",
                            example: 123456,
                        },
                    },
                },
                // Products
                Product: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "The product's id to use",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        title: {
                            type: "string",
                            description: "The item's name",
                            example: "Sản phẩm 1",
                        },
                        originPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's original price",
                            example: "123.45",
                        },
                        discountPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's discounted price",
                            example: "123.45",
                        },
                        rating: {
                            type: "number",
                            format: "float",
                            minimum: "0",
                            maximum: "5",
                            description: "The item's rating",
                            example: "2",
                        },
                        image: {
                            type: "string",
                            description: "image link",
                            example: "/images/hinh_anh_1.jpg",
                        },
                        description: {
                            type: "string",
                            description: "short description of the item",
                            example: "this item is good",
                        },
                        detail: {
                            type: "string",
                            description: "full content of the item",
                            example: "lorem ipsum odor...",
                        },
                        sku: {
                            type: "string",
                            description: "product's code",
                            example: "SKU1234",
                        },
                        attributes: {
                            type: "object",
                            description: "JSON Object for additional attributes",
                            example: `{
                size: 5,
                weight: 100
              }`,
                        },
                        type: {
                            type: "string",
                            description: "PRODUCT | COURSE",
                            example: "PRODUCT",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Created date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        createdBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Created by user",
                        },
                        updatedAt: {
                            type: "string",
                            description: "Updated date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        updatedBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Updated by user",
                        },
                    },
                },
                editProduct: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "The item's name",
                            example: "Sản phẩm 1",
                        },
                        originPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's original price",
                            example: "123.45",
                        },
                        discountPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's discounted price",
                            example: "123.45",
                        },
                        rating: {
                            type: "number",
                            format: "float",
                            minimum: "0",
                            maximum: "5",
                            description: "The item's rating",
                            example: "2",
                        },
                        image: {
                            type: "string",
                            description: "image link",
                            example: "/images/hinh_anh_1.jpg",
                        },
                        description: {
                            type: "string",
                            description: "short description of the item",
                            example: "this item is good",
                        },
                        detail: {
                            type: "string",
                            description: "full content of the item",
                            example: "lorem ipsum odor...",
                        },
                        sku: {
                            type: "string",
                            description: "product's code",
                            example: "SKU1234",
                        },
                        attributes: {
                            type: "object",
                            description: "JSON Object for additional attributes",
                            example: `{
                size: 5,
                weight: 100
              }`,
                        },
                        type: {
                            type: "string",
                            description: "PRODUCT | COURSE",
                            example: "PRODUCT",
                        },
                        categoryIds: {
                            type: "array",
                            description: "The category ids to use",
                            items: {
                                type: "string",
                                example: "00000000-0000-0000-0000-000000000000",
                            },
                        },
                    },
                },
                // Banners
                Banner: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "The category's id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        image: {
                            type: "string",
                            description: "image link",
                            example: "/images/hinh_anh_1.jpg",
                        },
                        sortOrder: {
                            type: "number",
                            description: "sort",
                            example: 1,
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Created date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        createdBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Created by user",
                        },
                        updatedAt: {
                            type: "string",
                            description: "Updated date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        updatedBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Updated by user",
                        },
                    },
                },
                editBanner: {
                    type: "object",
                    properties: {
                        image: {
                            type: "string",
                            description: "image link",
                            example: "/images/hinh_anh_1.jpg",
                        },
                        sortOrder: {
                            type: "number",
                            description: "sort",
                            example: 1,
                        },
                    },
                },
                // Categories
                Category: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "The category's id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        title: {
                            type: "string",
                            description: "The category's name",
                            example: "Danh mục chính",
                        },
                        parentId: {
                            type: "string",
                            description: "The parent's category id, null if has no parent",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Created date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        createdBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Created by user",
                        },
                        updatedAt: {
                            type: "string",
                            description: "Updated date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        updatedBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Updated by user",
                        },
                    },
                },
                editCategory: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "The category's name",
                            example: "Danh mục chính",
                        },
                        parentId: {
                            type: "string",
                            description: "The parent's category id, null if has no parent",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                    },
                },
                // Courses
                Course: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "The product's id to use",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        title: {
                            type: "string",
                            description: "The item's name",
                            example: "Sản phẩm 1",
                        },
                        originPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's original price",
                            example: "123.45",
                        },
                        discountPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's discounted price",
                            example: "123.45",
                        },
                        rating: {
                            type: "number",
                            format: "float",
                            minimum: "0",
                            maximum: "5",
                            description: "The item's rating",
                            example: "2",
                        },
                        image: {
                            type: "string",
                            description: "image link",
                            example: "/images/hinh_anh_1.jpg",
                        },
                        description: {
                            type: "string",
                            description: "short description of the item",
                            example: "this item is good",
                        },
                        detail: {
                            type: "string",
                            description: "full content of the item",
                            example: "lorem ipsum odor...",
                        },
                        category: {
                            type: "object",
                            $ref: "#/components/schemas/Category",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Created date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        createdBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Created by user",
                        },
                        updatedAt: {
                            type: "string",
                            description: "Updated date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        updatedBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Updated by user",
                        },
                    },
                },
                editCourse: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "The item's name",
                            example: "Sản phẩm 1",
                        },
                        originPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's original price",
                            example: "123.45",
                        },
                        discountPrice: {
                            type: "number",
                            format: "float",
                            description: "The item's discounted price",
                            example: "123.45",
                        },
                        rating: {
                            type: "number",
                            format: "float",
                            minimum: "0",
                            maximum: "5",
                            description: "The item's rating",
                            example: "2",
                        },
                        image: {
                            type: "string",
                            description: "image link",
                            example: "/images/hinh_anh_1.jpg",
                        },
                        description: {
                            type: "string",
                            description: "short description of the item",
                            example: "this item is good",
                        },
                        detail: {
                            type: "string",
                            description: "full content of the item",
                            example: "lorem ipsum odor...",
                        },
                        categoryId: {
                            type: "string",
                            description: "The category's id to use",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                    },
                },
                // Feedback
                Feedback: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "The product's id to use",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        content: {
                            type: "string",
                            description: "The content of the feedback",
                            example: "Sản phẩm này tốt",
                        },
                        type: {
                            type: "string",
                            description: "type of feedback, COMMENT or RATING",
                            example: "COMMENT | RATING",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Created date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        createdBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Created by user",
                        },
                        updatedAt: {
                            type: "string",
                            description: "Updated date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        updatedBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Updated by user",
                        },
                    },
                },
                addFeedback: {
                    type: "object",
                    properties: {
                        content: {
                            type: "string",
                            description: "The content of the feedback",
                            example: "Sản phẩm này tốt",
                        },
                        type: {
                            type: "string",
                            description: "type of feedback, COMMENT or RATING",
                            example: "COMMENT | RATING",
                        },
                        productId: {
                            type: "string",
                            description: "connect id, only need 1 of 2",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                    },
                },
                editFeedback: {
                    type: "object",
                    properties: {
                        content: {
                            type: "string",
                            description: "The content of the feedback",
                            example: "Sản phẩm này tốt",
                        },
                        type: {
                            type: "string",
                            description: "type of feedback, COMMENT or RATING",
                            example: "COMMENT | RATING",
                        },
                    },
                },
                deleteFeedback: {
                    type: "object",
                    properties: {
                        id: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "id",
                                example: "00000000-0000-0000-0000-000000000000",
                            },
                        },
                    },
                },
                // Status
                Status: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "status id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        name: {
                            type: "string",
                            description: "name of the status",
                            example: "Đang chờ",
                        },
                        code: {
                            type: "string",
                            description: "code for status",
                            example: "PENDING",
                        },
                        groupCode: {
                            type: "string",
                            description: "group code for status",
                            example: "CART",
                        },
                    },
                },
                // Cart
                Cart: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "cart id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Created date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        createdBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Created by user",
                        },
                        updatedAt: {
                            type: "string",
                            description: "Updated date",
                            example: "2023-02-15T17:00:00.000Z",
                        },
                        updatedBy: {
                            type: "object",
                            $ref: "#/components/schemas/User",
                            description: "Updated by user",
                        },
                        status: {
                            type: "object",
                            $ref: "#/components/schemas/Status",
                            description: "Cart's status",
                        },
                    },
                },
                editCart: {
                    type: "object",
                    properties: {
                        statusId: {
                            type: "string",
                            description: "status id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                    },
                },
                createCart: {
                    type: "object",
                    properties: {
                        itemId: {
                            type: "string",
                            description: "id of item",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        itemAmount: {
                            type: "number",
                            description: "number of item",
                            example: 2,
                        },
                    },
                },
                removeFromCart: {
                    type: "object",
                    properties: {
                        productIds: {
                            type: "array",
                            items: {
                                type: "string",
                                description: "id of item",
                                example: "00000000-0000-0000-0000-000000000000",
                            },
                        },
                    },
                },
                // Connect
                Connect: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "connect id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        productId: {
                            type: "string",
                            description: "connect id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        courseId: {
                            type: "string",
                            description: "connect id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        cartId: {
                            type: "string",
                            description: "connect id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        feedbackId: {
                            type: "string",
                            description: "connect id",
                            example: "00000000-0000-0000-0000-000000000000",
                        },
                        amount: {
                            type: "number",
                            description: "amount of products / courses, default to 1",
                            example: 1,
                        },
                    },
                },
            },
        },
    },
    apis: [`./src/controllers/api/v${package_json_1.version}/**/*.*`],
};
