import { useQuery, MetaTags } from '@redwoodjs/web'

import Stats from 'src/components/Stats/Stats'
import { HomePageStats } from './types'
import Table from 'src/components/Table/Table'
import { useNonProfitContext } from 'src/layouts/MainLayout/MainLayout.context'

const formatDonationsAmount = (amount: number) => {
  // TODO: Add support for other currencies
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount / 100)
}

const formatDonationDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB').format(new Date(date))
}

const HomePage = () => {
  const { nonprofit, setNonProfit } = useNonProfitContext()
  const GET_HOMEPAGE_STATS = gql`
    query GetHomepageStats($nonprofitId: Int!) {
      payments {
        id
        amountPaid
        date
        giftAided
        status
      }
      paymentsCount(nonprofitId: $nonprofitId)
      totalDonationsAmount(nonprofitId: $nonprofitId)
      percentageGiftaided(nonprofitId: $nonprofitId)
    }
  `

  const { data, error, loading } = useQuery<HomePageStats>(
    GET_HOMEPAGE_STATS,
    {
      variables:
        {
          nonprofitId: nonprofit.id
        }
    }
  )

  if (loading) {
    return <div>Loading stats...</div>
  }

  if(error || !data) {
    return (
      <div className='text-red-500'>
        {error?.message || 'There was an error loading stats!'}
      </div>
    )
  }

  const homepageStats = [
    { name: 'Total Donations', statistic: String(data.paymentsCount) },
    {
      name: 'Total Donations Amount',
      statistic: formatDonationsAmount(data.totalDonationsAmount),
    },
    {
      name: 'Donations with Gift Aid (%)',
      statistic: `${data.percentageGiftaided}%`,
    },
  ]

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="mx-auto mb-4 max-w-7xl pb-2">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Stats
        </h2>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {homepageStats.map((item) => (
          <Stats key={item.name} {...item} />
        ))}
      </dl>

      <div className="relative my-4 pb-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>

      <div className="mx-auto mb-4 max-w-7xl pb-2">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Donations
        </h2>
      </div>

      <div className="relative h-96 overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
        <Table.table>
          <Table.thead>
            <Table.tr>
              <Table.th>ID</Table.th>
              <Table.th>Amount Paid</Table.th>
              <Table.th>Date</Table.th>
              <Table.th>Gift Aided</Table.th>
              <Table.th>Status</Table.th>
            </Table.tr>
          </Table.thead>
          <Table.tbody>
            {data.payments.map((payment) => (
              <Table.tr>
                <Table.td>{payment.id}</Table.td>
                <Table.td>{formatDonationsAmount(payment.amountPaid)}</Table.td>
                <Table.td>{formatDonationDate(payment.date)}</Table.td>
                <Table.td>{payment.giftAided ? 'O' : ''}</Table.td>
                <Table.td>{payment.status}</Table.td>
              </Table.tr>
            ))}
          </Table.tbody>
        </Table.table>
      </div>
    </>
  )
}

export default HomePage
