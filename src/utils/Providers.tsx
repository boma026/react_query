"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react"
import { queryClient } from "./queryclient";

type Props = {
    children: ReactNode;
}
// esse Provider vai ser um componente que vai envolver outros componentes (usando {children} igual o context) e fornecer para eles uma "ferramenta" chamada QueryClient, que vem da biblioteca React Query (ou @tanstack/react-query).
export const Providers = ({children}: Props) => { 

    return(
        <QueryClientProvider client={queryClient} >
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
} 