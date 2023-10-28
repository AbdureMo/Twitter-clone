import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(session?.user?.email + " authenticated")

  if (!session?.user?.email) {
    console.log(session?.user?.email)
    throw new Error("Not signed in | session not found");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
