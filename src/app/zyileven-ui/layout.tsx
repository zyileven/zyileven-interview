import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  
  return (
    <section className=''>
      {children}
    </section>
  );
}

export default Layout;