// Arquivo com os hooks pra MONTAR as queries do tanstack

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, getPosts, getUsers } from "./api";
import { postInitialData } from "@/data/postInitalData";
import { queryClient } from "./queryclient";

export const usePosts = (limit: number, start: number) => useQuery({
    staleTime: 60 * 1000, // staletime é o tempo que a requisição fica "obsoleta" e quando ela está assim qualquer mudança (troca de aba por exemplo) fará com que ela faça o fetch novamente. ela por padrão é "0"
    queryKey: ["posts", { limit, start}], // É a chave que identifica essa requisição dentro do sistema de cache do React Query. Se usar o mesmo queryKey em outro lugar, ele reaproveita os dados do cache (sem refazer a requisição).
    queryFn: () => getPosts(limit, start), // É a função assíncrona que faz a requisição de fato
    placeholderData: postInitialData // dados que aparecem enquanto a requisiçao esta carregando
})

export const usePost = (id:number) => useQuery({
    queryKey: [id, "post"],
    queryFn: () => getPost(id)
})

export const useUsers = () => useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers()
})

//Irá fazer essa requisição e deixar em standby só pra ter em cache caso necessite que seja mostrada
export const useUsersPrefetch = () => {
    queryClient.prefetchQuery({ // aqui pegamos o queryClient do context
        queryKey: ["users"],
        queryFn: getUsers
    })
}

export const invalidatePost = () => {
    queryClient.invalidateQueries({
        queryKey: ["posts"]
    })
}