export type PaymentStatus = 'succeeded' | 'failed' | 'pending' | 'incomplete'

interface Payment {
  id: number
  date: string
  amountPaid: number
  status: PaymentStatus
  giftAided: boolean
}

export interface HomePageStats {
  paymentsCount: number
  totalDonationsAmount: number
  percentageGiftaided: number
  paymentsByNonprofitId: Payment[]
}
