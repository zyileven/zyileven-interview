import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  
  return (
    <section className='max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto p-6 mt-10 rounded-sm shadow-md'>
      {children}
    </section>
  );
}

export default Layout;