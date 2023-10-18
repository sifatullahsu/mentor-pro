/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useDeleteTopicMutation, useGetTopicsQuery } from '@/redux/api/topicApi'
import { NextLayout, iMeta, iTableData, iTableHeader } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

const TopicsPage: NextLayout = () => {
  const [pagination, setPagination] = useState<Partial<iMeta>>({ page: 1 })

  const { data, isLoading } = useGetTopicsQuery({ query: `page=${pagination.page}&size=20` })
  const [deleteItem] = useDeleteTopicMutation()

  const tableHeader: iTableHeader = ['Title', 'Category', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const {
      _id,
      title,
      category: { title: catTitle }
    } = item

    return {
      data: [_id, title, catTitle],
      others: {
        editLink: `/profile/topics/${_id}`
      }
    }
  })

  const deleteHandler = async (id: string) => {
    const res = await deleteItem({ id }).unwrap()

    if (res.status) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-5">Topics</h3>
        <Link href={`/profile/topics/create`} className="btn btn-primary btn-sm">
          Create Topic
        </Link>
      </div>
      <Table
        tableHeader={tableHeader}
        tableData={tableData}
        isLoading={isLoading}
        deleteHandler={deleteHandler}
        meta={data?.meta}
        setPagination={setPagination}
      />
    </div>
  )
}

export default TopicsPage

TopicsPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
