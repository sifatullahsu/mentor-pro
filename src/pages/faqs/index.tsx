/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from '@/layouts/MainLayout'
import { useGetfaqsQuery } from '@/redux/api/faqApi'
import { NextLayout } from '@/types'

const FaqsPage: NextLayout = () => {
  const { data, isLoading } = useGetfaqsQuery({ query: 'size=15' })

  if (isLoading) return <div>Loading</div>

  return (
    <div className="container py-10">
      {data?.data?.map((item: any, index: number) => {
        return (
          <div
            key={item._id}
            tabIndex={index}
            className="collapse collapse-plus border border-base-300 bg-base-200 mb-2"
          >
            <div className="collapse-title text-xl font-medium">{item.title}</div>
            <div className="collapse-content">
              <p>{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FaqsPage

FaqsPage.getLayout = page => <MainLayout>{page}</MainLayout>
