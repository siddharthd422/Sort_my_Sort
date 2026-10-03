-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "gst" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "managerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_phone_key" ON "Manager"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_id_key" ON "Listing"("id");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
