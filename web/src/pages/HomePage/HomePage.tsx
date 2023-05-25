import { useQuery, MetaTags } from '@redwoodjs/web'

import Stats from 'src/components/Stats/Stats'
import { HomePageStats } from './types'

const HomePage = () => {
  const GET_HOMEPAGE_STATS = gql`
    query GetHomepageStats {
      paymentsCount
    }
  `

  const { data, error, loading } = useQuery<HomePageStats>(GET_HOMEPAGE_STATS)

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
      statistic: '£20.50',
    },
    {
      name: 'Donations with Gift Aid (%)',
      statistic: '57%',
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
        {/*
         * TODO: Replace this component with a table component that is already supplied in the components folder
         * */}
        <svg
          className="absolute inset-0 h-full w-full stroke-gray-900/10"
          fill="none"
        >
          <defs>
            <pattern
              id="pattern-003a54e1-93b5-4534-9ccb-0ed8812b8270"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
            </pattern>
          </defs>
          <rect
            stroke="none"
            fill="url(#pattern-003a54e1-93b5-4534-9ccb-0ed8812b8270)"
            width="100%"
            height="100%"
          ></rect>
        </svg>
      </div>
    </>
  )
}

export default HomePage
