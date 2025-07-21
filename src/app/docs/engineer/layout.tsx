import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  
  return (
    <section className='mx-auto p-6 mt-10 rounded-sm shadow-md'>
      {children}
    </section>
  );
}

export default Layout;