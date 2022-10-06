import { book } from "@prisma/client";

type createBookType = Omit<book, "id" | "review">;

export default createBookType;
