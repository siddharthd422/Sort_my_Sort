"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const globalForPrisma = global;
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        adapter,
    });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
exports.default = prisma;
//# sourceMappingURL=prisma.service.js.map