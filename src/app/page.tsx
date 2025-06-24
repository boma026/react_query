"use client"

import { addPost } from "@/utils/api";
import { invalidatePost, usePost, usePosts, useUsersPrefetch } from "@/utils/queries";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {

  useUsersPrefetch(); //feita a requisição prefetch em que sera feita uma requisiçao pra deixar os dados em cache caso precise

   //PAGINAÇÃO
  const [page, setPage] = useState(0); //state que irá controlar o numero da pagina
  const limit = 3; //limit de itens por pagina

  const posts = usePosts(limit, limit *page); //hook que ira importar a requisição e a chave
   
  const post = usePost(3);

  const handlePrevButton = () => {
    setPage(page === 0 ? 0 : page - 1);
  }

  const handleNextButton = () => {
    setPage(page + 1);
  }

  const handleInvalidateRequest = () => {
    //No caso ao invalidar a requisição ele irá fazer uma nova quando perceber que esta foi invalidada
    invalidatePost();
  }

  //USO DE MUTATIONS
  const addMutation = useMutation({ //diferentemente das querys esse hook de useMutations serve pra alterar algo no servidor e alterar dados
    mutationFn: addPost // é a função que será executada quando a mutation for acionada, no caso quando houver o quando a variável der o mutate, ex. addMutation.mutate
  })

  const handleAddNewPost = () => {
    addMutation.mutate({ //  executa a mutation de fato, passando os dados do post.
      title: "titulo",
      body: "corpo"
    }
    )
  }

  return (
    <div>
      <p>...</p>
      {posts.isLoading && "carregando..."} {/* com o tanstackquery ja é possivel verificar se esta carregando desta forma */}
      
      {/*PAGINAÇÃO*/}
      <div className="border border-black p-3 m-3">
        <p>Itens por página: {limit}</p>
        <p>Número da página: {page}</p>
        <button onClick={handlePrevButton} className="mx-2 border p-2">Página anterior</button>
        <button onClick={handleNextButton} className="border p-2">Próxima página</button>
      </div>

      <button onClick={handleInvalidateRequest}>Invalidar Requisição</button>

      {posts.data &&
        <ul>
          {posts.data.map((item) => 
            <li key={item.id}>título: {item.title}. Corpo: {item.body}</li>)}
        </ul>
      }
      {post.isLoading && "carregando..."} {/*só será rodado na primeira vez que carrega os dados*/}
      {post.data &&
        <div>Aqui{post.data.body}</div>
      }

      <div className="border border-white p-3 my-3">
          <p>Adcionar novo post</p>
          <button className="cursor-pointer" onClick={handleAddNewPost}>adcionar</button>
      </div>
    </div>
  );
}
