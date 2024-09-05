import { auth } from "@/auth";

export const getUserSession = async () => {
  const session = await auth();
  const user = session?.user;
  return user;
};
