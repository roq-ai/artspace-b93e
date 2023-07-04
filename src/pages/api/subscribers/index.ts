import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { subscriberValidationSchema } from 'validationSchema/subscribers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSubscribers();
    case 'POST':
      return createSubscriber();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSubscribers() {
    const data = await prisma.subscriber
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'subscriber'));
    return res.status(200).json(data);
  }

  async function createSubscriber() {
    await subscriberValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.gallery?.length > 0) {
      const create_gallery = body.gallery;
      body.gallery = {
        create: create_gallery,
      };
    } else {
      delete body.gallery;
    }
    const data = await prisma.subscriber.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
