import { PrismaClient } from "@prisma/client";
import { products } from "../lib/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Clear existing products
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        title: p.name,
        description: p.description,
        price: p.price,
        originalPrice: p.originalPrice,
        images: p.gallery,
        category: p.category,
        stock: p.stock,
        isNew: p.isNew || false,
        isTrending: p.isTrending || false,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
