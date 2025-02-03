import { Post } from "./Post.jsx"

export const Posts = () => {
  return (
    <div className="flex-1 flex flex-col  items-center bg-red-400">
        {[1].map((post, index) => <Post  key={index} />)}
    </div>
  )
}
