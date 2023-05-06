import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

export default function LayoutAdmin({ children }) {
  return (
    <>
      <Navbar role='admin' />
      <Sidebar role='admin' />
      <main className='pl-[15rem]'>{children}</main>
    </>
  )
}