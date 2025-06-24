import { Post } from "@/types/posts";
import axios from "axios";

const req = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getPosts = async (limit: number, start: number): Promise<Post[]> => {
    const result = await req.get("/posts?_limit=" + limit + "&_start=" + start);
    return result.data;
}

export const getPost = async (id: number): Promise<Post> => {
    const result = await req.get("/posts/" + id);
    return result.data;
}

export const getUsers = async (): Promise<Post[]> => {
    const result = await req.get("/users");
    return result.data;
}

export const addPost = async (data: Omit<Post, "id">) => {
    const result = await req.post("/posts", data);
    return result.data
}