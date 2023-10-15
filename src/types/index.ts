/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type NextLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextLayout
}

export type iChildren = {
  children: ReactNode
}

export type iFormEvent = React.FormEvent<HTMLFormElement>

export type iMeta = {
  limit: number
  page: number
  total: number
}
