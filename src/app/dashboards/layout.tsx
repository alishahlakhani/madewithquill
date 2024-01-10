import { Navbar } from '@zero/components/navbar';
import type { Metadata } from 'next'
import { GetDashboards } from './action';

export const metadata: Metadata = {
  title: 'Tools for builders | madeofzero',
  description: 'Tools for builders by builders',
  robots: {
    nocache: true,
    noarchive: true,
    noimageindex: true,
    nositelinkssearchbox: true,
    nosnippet: true,
    notranslate: true,
    index: false,
    follow: false,
  }
}

export default async function DashboardLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return <main className='overflow-scroll h-screen bg-background'>
    <div className='bg-primary pb-52'>
      <Navbar className='py-4 px-4' menu={[{
        title: "All Dashboards",
        href: "/dashboards"
      }]} />
    </div>
    <div className='py-4 px-4 bg-background h-full '>
      <section className='bg-white rounded-sm p-8 shadow-md min-w-full text-black '>
        {children}
      </section>
      <footer className='w-full flex justify-center items-center my-4'>
        <p className='text-sm text-muted-foreground'>"Ideas are easy. Execution is everything." - <strong>John Doerr</strong></p>
      </footer>
    </div>
  </main>
}
