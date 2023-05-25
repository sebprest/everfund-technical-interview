import { render } from '@redwoodjs/testing/web'

import PaymentStatusDisplay from './PaymentStatusDisplay'

describe('PaymentStatusDisplay', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(<PaymentStatusDisplay status='succeeded' />)
    expect(getByTestId('payment-status')).toBeInTheDocument()
  })

  it('should render with a green background if the status is succeeded', () => {
    const { getByTestId } = render(<PaymentStatusDisplay status='succeeded' />)
    expect(getByTestId('payment-status')).toHaveClass('bg-green-900')
  })

  it('should render with a red background if the status is failed', () => {
    const { getByTestId } = render(<PaymentStatusDisplay status='failed' />)
    expect(getByTestId('payment-status')).toHaveClass('bg-red-900')
  })

  it('should render with a yellow background if the status is pending', () => {
    const { getByTestId } = render(<PaymentStatusDisplay status='pending' />)
    expect(getByTestId('payment-status')).toHaveClass('bg-yellow-900')
  })

  it('should render with a yellow background if the status is incomplete', () => {
    const { getByTestId } = render(<PaymentStatusDisplay status='incomplete' />)
    expect(getByTestId('payment-status')).toHaveClass('bg-yellow-900')
  })

  it('should render with a gray background if the status is unknown', () => {
    const { getByTestId } = render(<PaymentStatusDisplay status='unknown' />)
    expect(getByTestId('payment-status')).toHaveClass('bg-gray-900')
  })
})