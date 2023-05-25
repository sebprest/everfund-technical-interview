interface Payment {
  id: number
  date: string
  amountPaid: number
  status: string
  giftAided: boolean
}

export interface HomePageStats {
  paymentsCount: number
  totalDonationsAmount: number
  percentageGiftaided: number
  payments: Payment[]
}
