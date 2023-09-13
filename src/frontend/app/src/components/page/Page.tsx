import React from 'react';

import Navbar from '../navbar/Navbar';

type Props = {
  children?: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Page;
