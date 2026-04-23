# Gadgetion - Technical Project Documentation

## 1. System Overview

**Gadgetion** is a production-grade, headless e-commerce application built on a modern JavaScript stack. It utilizes server-side rendering (SSR), static site generation (SSG), and edge middleware to deliver high-performance dynamic content.

### Core Architecture
- **Frontend / Backend Meta-framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **UI & Styling**: React 18, Tailwind CSS, Lucide React (Icons)
- **State Management**: Zustand (Client-side, persisted)
- **Database**: MongoDB (Atlas)
- **ORM**: Prisma
- **Media Storage**: UploadThing (AWS S3 abstraction)

---

## 2. Directory Structure & App Routing

The project follows the Next.js App Router conventions:

```text
app/
├── (storefront)/         # Route Group for public facing UI
│   ├── page.tsx          # Main Landing Page
│   ├── products/         # Product listing & filtering
│   ├── product/[id]/     # Dynamic single product page
│   ├── cart/             # Shopping cart view
│   ├── checkout/         # Form & WhatsApp checkout logic
│   └── contact/          # Support & feedback forms
├── admin/                # Route Group for Admin Dashboard
│   ├── login/            # Admin Auth Portal
│   ├── orders/           # Order management panel
│   ├── page.tsx          # Admin dashboard (Product management)
│   └── layout.tsx        # Admin-specific navigation shell
├── api/                  # Serverless API Endpoints
│   ├── uploadthing/      # File upload webhooks
│   ├── products/         # GET/POST/PUT/DELETE for products
│   ├── orders/           # POST (checkout), GET (admin)
│   └── auth/             # Login/Logout session handlers
└── layout.tsx            # Root HTML shell & Global Context Providers
```

---

## 3. Database & Data Modeling

The database is managed via **Prisma** targeting a **MongoDB** cluster.

### Schema Breakdown (`schema.prisma`)

#### `Product` Model
Stores product inventory, pricing, and rich media.
- `id`: ObjectId (Primary Key)
- `title`: String
- `description`: String
- `price`: Float
- `originalPrice`: Float? (For discount calculation)
- `images`: String[] (UploadThing URL strings)
- `category`: String (Used for frontend filtering)
- `stock`: Int
- `isNew`: Boolean (For "New Arrivals" badge)
- `isTrending`: Boolean (For "Hot" badge)
- `createdAt` / `updatedAt`: DateTime

#### `Order` Model
Handles customer purchases and fulfillment status.
- `id`: ObjectId
- `customerName`: String
- `phone`: String
- `address`: String
- `city`: String
- `items`: Json (Stores snapshot of purchased products and quantities)
- `totalAmount`: Float
- `status`: String (Default: "PENDING", updates to "DELIVERED" or "CANCELLED")
- `paymentMethod`: String (Default: "COD")
- `createdAt`: DateTime

---

## 4. State Management (Client-Side)

### Zustand Cart Store (`store/useCart.ts`)
The shopping cart relies on `Zustand` with the `persist` middleware to save the cart state in the browser's `localStorage`.

**Key Actions:**
- `addItem(product, quantity)`: Checks if item exists; if yes, increments quantity, else adds to array.
- `removeItem(productId)`: Filters out the item from the array.
- `updateQuantity(productId, quantity)`: Adjusts quantities dynamically.
- `clearCart()`: Flushes state upon successful checkout.
- `getCartTotal()`: Computes `price * quantity` across all items.

*Note: A `mounted` state check is utilized in UI components consuming the store to prevent React Hydration Mismatches between server-rendered HTML and client-local storage.*

---

## 5. Data Fetching & Reactivity

### URL-Driven State
Instead of using React `useState` for search queries and category filters, the application leverages URL Search Parameters (`?category=kitchen&q=lamp`). 
- **Why?** It ensures deep-linking works perfectly (users can share filtered URLs) and offloads state management to the router.
- **Implementation**: The `ProductsPage` reads `searchParams` on render and filters the database query accordingly.

### Cache Control
To ensure the Admin dashboard and Product listings always show live data:
- `export const dynamic = "force-dynamic"` is used on API routes and key pages.
- Fetch requests use `cache: 'no-store'` to bypass Next.js aggressive static caching.

---

## 6. Authentication & Security

### Admin Protection (Edge Middleware)
The `/admin` route group is protected by a custom login system.
1. **Credentials**: Managed via environment variables (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).
2. **Session Handling**: Upon successful login at `/api/auth/login`, an HTTP-only, secure cookie (`admin_session`) is set.
3. **Middleware**: `middleware.ts` intercepts all requests to `/admin/*`. If the cookie is missing or invalid, the request is redirected to `/admin/login` at the edge, preventing unauthorized rendering.

---

## 7. Third-Party Integrations

### WhatsApp Integration
The checkout and support flows bypass traditional email pipelines in favor of direct WhatsApp communication, optimized for regional conversions.
- Action: When checking out, `window.open("https://wa.me/923362092937?text=...")` is triggered.
- Payload: The URI component encodes a formatted string containing the Cart Items, Total, and Customer Address.

### UploadThing (Image Hosting)
UploadThing acts as an abstraction over AWS S3 for media storage.
- **Router (`app/api/uploadthing/core.ts`)**: Defines an `imageUploader` endpoint restricted to `4MB` per image and a max of 4 files.
- **Frontend**: The Admin product form utilizes the `@uploadthing/react` Dropzone component to stream images to the cloud, returning direct URLs stored in the MongoDB `images` array.

---

## 8. Environment Variables Requirements

To deploy this project, the following keys must be provisioned in the production environment (e.g., Vercel):

```env
# Database
DATABASE_URL=

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Admin Access
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

---

## 9. Future Scaling Considerations
- **Analytics**: Integrate Vercel Web Analytics or Google Tag Manager for conversion tracking.
- **Payment Gateway**: Currently hardcoded to COD/WhatsApp. Can easily integrate Stripe or PayFast by intercepting the checkout form submission before saving the order.
- **Multi-Vendor**: The schema can be expanded to include a `Vendor` model, with a relation mapping `Products` to `Vendors`.
