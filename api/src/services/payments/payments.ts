import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const payments: QueryResolvers['payments'] = () => {
  return db.payment.findMany()
}

export const payment: QueryResolvers['payment'] = ({ id }) => {
  return db.payment.findUnique({
    where: { id },
    include: {
      nonprofit: true,
    },
  })
}

export const paymentsCount: QueryResolvers['paymentsCount'] = () => {
  return db.payment.count()
}

export const totalDonationsAmount: QueryResolvers['totalDonationsAmount'] = async () => {
  const result = await db.payment.aggregate({
    _sum: {
      amountPaid: true,
    },
  });

  return result._sum.amountPaid || 0;
};

export const percentageGiftaided: QueryResolvers['percentageGiftaided'] = async () => {
  const totalCount = await db.payment.count()

  const giftAidedCount = await db.payment.aggregate({
    _count: {
      giftAided: true,
    },
  });

  return Math.round((giftAidedCount._count.giftAided / totalCount) * 100);
}