import { Footer } from "./Footer.jsx"
import { UserProfileCard } from "./UserProfileCard.jsx"
import { UserSuggestionCard } from "./UserSuggestionCard.jsx"

export const SidebarRight = () => {
  return (
    <div className='SidebarRightComponent hidden flex-col w-[30%] items-left px-6 bg-amber-300 lg:flex'>
        <UserProfileCard />
        <UserSuggestionCard />
        <Footer />
    </div>
  )
}
