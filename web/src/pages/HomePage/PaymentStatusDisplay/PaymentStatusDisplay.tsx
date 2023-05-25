import { twMerge } from "tailwind-merge"
import { PaymentStatus } from "../types"

const PaymentStatusDisplay = ({status}: {status: PaymentStatus}) => {
  const statusClass = {
    'pending': 'bg-yellow-900',
    'failed': 'bg-red-900',
    'succeeded': 'bg-green-900',
    'incomplete': 'bg-yellow-900',
  }

  return (
    <span
      className={twMerge(`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white`, statusClass[status] || 'bg-gray-900')}
      data-testid='payment-status'
    >
      {status}
    </span>
  )
}

export default PaymentStatusDisplay