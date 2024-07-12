import prisma from "@/pages/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const POST = async (req, res) => {
  const { slug: catSlug } = req.body;

  if (!catSlug) {
    return res.status(400).json({ error: "slug is required" });
  }

  try {
    const slug = await prisma.product.findUnique({
      where: { slug: catSlug.toLowerCase() },
    });

    if (slug) {
      return res.status(200).json({ error: catSlug.toLowerCase() +" "+ " already in use", status: 200 });
    }

    return res.status(200).json({ message: catSlug.toLowerCase() +  " "+"Slug is available", status: 200 });
  } catch (error) {
    console.error('Error checking Slug:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

