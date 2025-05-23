import { getProfileMenu } from '~/data/mockdata'

const Sidebar = ({ activeTab, onTabChange, className }) => {
  const profileMenuItems = getProfileMenu()
  return (
    <aside className={`border-r border-gray-200 bg-white ${className}`}>
      <div className='px-8'>
        <ul className='space-y-1'>
          {profileMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`flex w-full cursor-pointer items-center rounded-lg px-6 py-3 text-left leading-none! ${
                  activeTab === item.id
                    ? 'title-md text-primary bg-sky-50'
                    : 'title-md font-normal! text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon && (
                  <i
                    className={`${item.icon} mr-3 aspect-square h-6 w-6 translate-y-0.5 text-xl`}
                  ></i>
                )}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
