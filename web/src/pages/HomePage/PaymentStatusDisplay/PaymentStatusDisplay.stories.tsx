import type { ComponentMeta } from '@storybook/react'

import PaymentStatusDisplay from './PaymentStatusDisplay'
import { PaymentStatus } from '../types'

export const generated = (props: {status: PaymentStatus}) => {
  return <PaymentStatusDisplay status={props.status}/>
}

export default {
  title: 'Pages/HomePage/PaymentStatusDisplay',
  component: PaymentStatusDisplay,
  argTypes: {
    status: {
      control: {
        type: 'radio',
      },
      options: ['succeeded', 'failed', 'pending', 'incomplete']
    }
  }
} as ComponentMeta<typeof PaymentStatusDisplay>
