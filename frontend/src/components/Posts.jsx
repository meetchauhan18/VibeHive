import { Post } from "./Post.jsx"

export const Posts = () => {
  return (
    <div className="flex-1 flex flex-col  items-cente">
        {[1].map((post, index) => <Post  key={index} />)}
    </div>
  )
}
