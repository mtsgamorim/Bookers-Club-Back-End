import { users } from "@prisma/client";

type createUserType = Omit<users, "id">;

export default createUserType;
