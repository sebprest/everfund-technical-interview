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

export const paymentsByNonprofitId: QueryResolvers['paymentsByNonprofitId'] = ({ nonprofitId }) => {
  return db.payment.findMany({
    where: { nonprofitId },
  })
}

export const paymentsCount: QueryResolvers['paymentsCount'] = async ({ nonprofitId }) => {
  return db.payment.count({ where: { nonprofitId, status: 'succeeded' }})
}

export const totalDonationsAmount: QueryResolvers['totalDonationsAmount'] = async ({ nonprofitId }) => {
  const result = await db.payment.aggregate({
    where: {
      nonprofitId,
      status: 'succeeded'
    },
    _sum: {
      amountPaid: true,
    },
  });

  return result._sum.amountPaid || 0;
};

export const percentageGiftaided: QueryResolvers['percentageGiftaided'] = async ({ nonprofitId }) => {
  const totalCount = await db.payment.count({ where: { nonprofitId, status: 'succeeded' }})

  const giftAidedCount = await db.payment.aggregate({
    where: {
      nonprofitId,
      status: 'succeeded'
    },
    _count: {
      giftAided: true,
    },
  });

  return Math.round((giftAidedCount._count.giftAided / totalCount) * 100);
}