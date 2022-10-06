-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "review" TEXT,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
