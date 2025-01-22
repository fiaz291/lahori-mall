import prisma from "@/app/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    case "GET":
      return GET(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// POST: Add a new banner
async function POST(req, res) {
  const { name, slug, url, active, order, productId, bannerType } = req.body;

  if (!name || !slug || !url) {
    return res.status(400).json({ message: 'Fields "name", "slug", and "url" are required.' });
  }

  try {
    const banner = await prisma.banner.create({
      data: {
        name,
        slug,
        url,
        active: active ?? false,
        order: order ?? 1,
        productId,
        bannerType
      },
    });

    return res.status(201).json(banner);
  } catch (error) {
    console.error("Error creating banner:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// GET: Retrieve all banners
async function GET(req, res) {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
