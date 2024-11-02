import { getSession } from "next-auth/react";

const getSessionFromRequest = async (req) => {
  const session = await getSession({ req });
  return session;
};

export const requireAuth = async (context) => {
  const { req, res } = context;
  const session = await getSessionFromRequest(req);

  if (!session) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  return { props: { session } };
};
