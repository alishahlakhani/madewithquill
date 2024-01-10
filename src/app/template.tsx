import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MVP Web Boilerplate | madeofzero',
  description: 'MVP Web Boilerplate by builders',
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

export default function AppLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return <main className={"min-h-screen bg-primary text-primary-foreground font-sans antialiased fixed w-full"}
  >
    {children}
  </main>
}
