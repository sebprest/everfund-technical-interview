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

export const paymentsCount: QueryResolvers['paymentsCount'] = async ({ nonprofitId }) => {
  return db.payment.count({ where: { nonprofitId }})
}

export const totalDonationsAmount: QueryResolvers['totalDonationsAmount'] = async ({ nonprofitId }) => {
  const result = await db.payment.aggregate({
    where: {
      nonprofitId,
    },
    _sum: {
      amountPaid: true,
    },
  });

  return result._sum.amountPaid || 0;
};

export const percentageGiftaided: QueryResolvers['percentageGiftaided'] = async ({ nonprofitId }) => {
  const totalCount = await db.payment.count({ where: { nonprofitId }})

  const giftAidedCount = await db.payment.aggregate({
    where: {
      nonprofitId,
    },
    _count: {
      giftAided: true,
    },
  });

  return Math.round((giftAidedCount._count.giftAided / totalCount) * 100);
}