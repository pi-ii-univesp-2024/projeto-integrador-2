import Cookies from "js-cookie";

export const requireAuth = (context) => {
  const { req, res } = context;
  const token = req ? req.cookies.token : Cookies.get("token");

  if (!token) {
    if (res) {
      res.writeHead(302, { Location: "/login" });
      res.end();
    } else {
      window.location.href = "/login";
    }
    return { props: {} }; 
  }

  return { props: { token } }; 
};
