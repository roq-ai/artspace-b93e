import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { galleryValidationSchema } from 'validationSchema/galleries';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGalleries();
    case 'POST':
      return createGallery();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGalleries() {
    const data = await prisma.gallery
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'gallery'));
    return res.status(200).json(data);
  }

  async function createGallery() {
    await galleryValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.image?.length > 0) {
      const create_image = body.image;
      body.image = {
        create: create_image,
      };
    } else {
      delete body.image;
    }
    const data = await prisma.gallery.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
