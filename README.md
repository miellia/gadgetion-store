# 🛒 Gadgetion — Modern E-commerce Platform

**Gadgetion** is a high-performance, modern e-commerce web application built using the latest web technologies. It is designed to be blazing fast, SEO-friendly, and provides a seamless shopping experience for customers looking for everyday smart gadgets.

![Gadgetion E-commerce](https://via.placeholder.com/1200x600.png?text=Gadgetion+E-Commerce+Platform)

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **ORM**: [Prisma](https://www.prisma.io/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Persistent Shopping Cart)
- **Image Hosting**: [UploadThing](https://uploadthing.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Dynamic Product Filtering**: URL-based reactive filtering and search.
- **Cart Management**: Persistent shopping cart powered by Zustand (`localStorage`).
- **Seamless Checkout**: Support for Cash on Delivery (COD) and direct WhatsApp ordering.
- **Responsive Design**: Mobile-first UI using modern layout patterns.

### 🛡️ Admin & Store Management
- **Secure Admin Dashboard**: Route-protected (`/admin`) using Next.js Middleware and secure HTTP-only cookies.
- **Order Management**: View, filter, and manage customer orders dynamically.
- **Product Management**: Add, edit, and delete products with real-time image uploads via UploadThing.

---

## 🛠️ Project Architecture

```text
├── app/
│   ├── (storefront)/         # Public user-facing pages (Home, Products, Checkout)
│   ├── admin/                # Secure admin panel
│   ├── api/                  # Next.js API Routes (Prisma interactions)
│   ├── layout.tsx            # Root layout & providers
│   └── page.tsx              # Homepage
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── home/                 # Hero, CategoryBar, ProductSections
│   └── shared/               # ProductCard, Skeletons, Modals
├── lib/
│   └── prisma.ts             # Prisma client singleton
├── prisma/
│   └── schema.prisma         # Database schema
└── store/
    └── useCart.ts            # Zustand cart store
```

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/gadgetion-store.git
cd gadgetion-store
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following keys:

```env
# MongoDB Connection String
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/gadgetion"

# UploadThing API Keys
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="app_..."

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="secure_password_here"
```

### 4. Setup Prisma DB
Push the Prisma schema to your MongoDB database:
```bash
npx prisma db push
npx prisma generate
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🔐 Security & Hardening

1. **Environment Variables**: Sensitive credentials (Admin login, DB URLs) are stored securely in `.env` and never exposed to the client.
2. **Middleware Protection**: The `/admin/*` routes are protected using Next.js edge middleware. Unauthenticated users are strictly redirected to `/admin/login`.
3. **Hydration Conflict Avoidance**: Browser extension conflicts are bypassed in development to ensure a smooth debugging experience.

---

## 📱 WhatsApp Integration Workflow
Gadgetion heavily utilizes WhatsApp to simplify the ordering process for customers in specific regions (like Pakistan).
- When a customer clicks **"Order via WhatsApp"** during checkout, the app instantly generates a structured, pre-filled message detailing their cart contents, totals, and shipping details.
- This creates an immediate, high-conversion communication channel directly between the customer and the store owner.

---

## 📝 License

This project is licensed under the MIT License.
