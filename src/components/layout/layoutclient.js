import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

export default function LayoutClient({ children }) {
  return (
    <>
      <Navbar role='client' />
      <Sidebar role='client' />
      <main className='pl-[15rem]'>{children}</main>
    </>
  )
}