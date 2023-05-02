import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className='pl-[15rem]'>{children}</main>
    </>
  )
}