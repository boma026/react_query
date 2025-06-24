"use client"

import { usePost, usePosts } from "@/utils/queries";
import { useState } from "react";

export default function Home() {

   //PAGINAÇÃO
  const [page, setPage] = useState(0); //state que irá controlar o numero da pagina
  const limit = 3; //limit de itens por pagina

  const posts = usePosts(); //hook que ira importar a requisição e a chave
   
  const post = usePost(3);

  const handlePrevButton = () => {
    setPage(page === 0 ? 0 : page - 1);
  }

  const handleNextButton = () => {
    setPage(page + 1);
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
    </div>
  );
}
