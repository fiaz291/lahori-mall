import { PrismaClient } from "@prisma/client";

// Define your PostgreSQL connection string
const connectionString = process.env.DATABASE_URL;

// Initialize the PrismaPg adapter with the Pool instance
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
  log: ["query", "info", "warn", "error"],
});

// Export the Prisma client instance
export default prisma;
