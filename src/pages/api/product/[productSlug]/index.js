
export default async function handler(req, res) {
    switch (req.method) {
      case "GET":
        return GET(req, res);
      case "PATCH":
        return PATCH(req, res);
      case "DELETE":
        return DELETE(req, res);
      case "PATCH":
        return PATCH(req, res);
      default:
        res.setHeader("Allow", ["POST", "DELETE", "PATCH"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }