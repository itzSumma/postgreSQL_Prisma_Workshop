## User Schema Design

```text
User
│
├── id
│   └── আমি কে? → Primary Key (PK)
│
├── name
│   └── আমার নাম কী?
│
├── email
│   └── আমার email কী? → Unique
│
├── password
│   └── আমার password
│
├── role
│   └── আমি CUSTOMER / SELLER / ADMIN?
│
├── isDeleted
│   └── আমাকে Soft Delete করা হয়েছে?
│
├── createdAt
│   └── আমি কখন তৈরি হয়েছি?
│
├── updatedAt
│   └── সর্বশেষ কখন update হয়েছি?
│
├── orders
│   └── আমার কয়টা Order আছে? → অনেক → []
│
└── cartItems
    └── আমার কয়টা CartItem আছে? → অনেক → []
```

## Category Schema Design

```text
Category
│
├── id
│   └── আমি কে? → Primary Key (PK)
│
├── name
│   └── আমার নাম কী? → Unique
│
├── isDeleted
│   └── আমাকে Soft Delete করা হয়েছে?
│
├── createdAt
│   └── আমি কখন তৈরি হয়েছি?
│
├── updatedAt
│   └── সর্বশেষ কখন update হয়েছি?
│
└── products
    └── আমার কয়টা Product আছে? → অনেক → []
```

