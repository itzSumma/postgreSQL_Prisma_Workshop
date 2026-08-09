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
## Product Schema Design

```text
Product
│
├── id
│   └── আমি কে? → Primary Key
│
├── title
│   └── আমার নাম কী?
│
├── description
│   └── আমার details কী? → Optional
│
├── price
│   └── আমার দাম কত?
│
├── stock
│   └── কতগুলো available?
│
├── image
│   └── আমার product image → Optional
│
├── categoryId
│   └── আমি কোন Category-এর? → Foreign Key
│
├── category
│   └── আমার Category কে?
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
├── cartItems
│   └── আমি কয়টা CartItem-এর সাথে connected?
│       → অনেক → []
│
└── orderItems
    └── আমি কয়টা OrderItem-এর সাথে connected?
        → অনেক → []
```
## CartItem Schema Design

```text
CartItem
│
├── id
│   └── আমি কে? → Primary Key (PK)
│
├── userId
│   └── কোন User-এর cart? → Foreign Key (FK)
│
├── productId
│   └── কোন Product cart-এ আছে? → Foreign Key (FK)
│
├── quantity
│   └── Product কতটা আছে? → Default 1
│
├── user
│   └── আমার CartItem কোন User-এর?
│       → User relation
│
├── product
│   └── আমি কোন Product?
│       → Product relation
│
├── createdAt
│   └── কখন cart-এ add হয়েছে?
│
├── updatedAt
│   └── সর্বশেষ কখন update হয়েছি?
│
├── @@unique([userId, productId])
│   └── একই User + একই Product
│       একাধিক CartItem হতে পারবে না
│
└── @@map("cart_items")
    └── Database table → cart_items
```

### Relationship

```text
             User
          id = U1 (PK)
               │
               │
               │ userId (FK)
               ↓
           CartItem
        ┌──────────────┐
        │ quantity = 2 │
        └──────┬───────┘
               │
               │ productId (FK)
               ↓
            Product
          id = P1 (PK)
```

### Logic

```text
User
  ↓
কোন User-এর cart?
  ↓
CartItem
  ↓
কোন Product?
  ↓
Product
  ↓
কতটা?
  ↓
quantity
```

**Example:**

```text
User: Summa
Product: Niacinamide Serum
Quantity: 2

        User
      (Summa)
         │
         ↓
      CartItem
    quantity = 2
         │
         ↓
  Niacinamide Serum
```

অর্থাৎ, **CartItem হলো একজন User-এর cart-এ কোন Product কত quantity আছে—সেটার connection/record।**

## Order Schema Design

```text
Order
│
├── id
│   └── আমি কে? → Primary Key (PK)
│
├── userId
│   └── কে আমাকে order করেছে? → Foreign Key (FK)
│
├── totalAmount
│   └── আমার total price কত?
│
├── status
│   └── আমি এখন কোন অবস্থায় আছি?
│       → PENDING / CONFIRMED / SHIPPED / DELIVERED / CANCELLED
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
├── user
│   └── আমার User কে?
│       → User relation
│
└── orderItems
    └── আমার মধ্যে কয়টা Product আছে?
        → অনেক → []
```

### Relationship

```text
             User
          id = U1 (PK)
               │
               │ userId (FK)
               ↓
             Order
        ┌───────────────┐
        │ totalAmount   │
        │ status        │
        └───────┬───────┘
                │
                │ 1 → Many
                ↓
            OrderItem
           /         \
          ↓           ↓
       Product     quantity
```

### Logic

```text
User
  ↓
কে Order করেছে?
  ↓
Order
  ↓
কত টাকার Order?
  ↓
totalAmount
  ↓
Order-এর status কী?
  ↓
PENDING → CONFIRMED → SHIPPED → DELIVERED
                    ↘
                     CANCELLED
  ↓
Order-এর মধ্যে কোন কোন Product আছে?
  ↓
OrderItem[]
```
```text
Example:

User: Summa
       ↓
Order #O1
       │
       ├── Niacinamide Serum × 2
       ├── CeraVe Cleanser × 1
       └── Sunscreen × 1

Total Amount = ৳3500
Status = PENDING
```

### Database Mapping

```text
Prisma Model
     ↓
   Order
     ↓
PostgreSQL Table
     ↓
   orders
```
