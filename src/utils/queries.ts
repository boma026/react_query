// Arquivo com os hooks pra MONTAR as queries do tanstack

import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "./api";

export const usePosts = () => useQuery({
    staleTime: 60 * 1000, // staletime é o tempo que a requisição fica "obsoleta" e quando ela está assim qualquer mudança (troca de aba por exemplo) fará com que ela faça o fetch novamente. ela por padrão é "0"
    queryKey: ["posts"], // É a chave que identifica essa requisição dentro do sistema de cache do React Query. Se usar o mesmo queryKey em outro lugar, ele reaproveita os dados do cache (sem refazer a requisição).
     queryFn: getPosts // É a função assíncrona que faz a requisição de fato
})

export const usePost = (id:number) => useQuery({
    queryKey: [id, "post"],
    queryFn: () => getPost(id)
})