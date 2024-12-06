'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export default function Providers({ children }: React.PropsWithChildren) {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry:1,
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60 * 5, 
            },
        },
    }))
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}