"use client"

import { usePost, usePosts } from "@/utils/queries";

export default function Home() {

  const posts = usePosts(); //hook que ira importar a requisição e a chave
   
  const post = usePost(3);
  return (
    <div>
      <p>...</p>
      {posts.isLoading && "carregando..."} {/* com o tanstackquery ja é possivel verificar se esta carregando desta forma */}
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
