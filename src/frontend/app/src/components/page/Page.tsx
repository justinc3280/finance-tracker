import React from 'react';
import Navbar from '../navbar/Navbar';
import styles from './Page.module.scss';

type Props = {
  children?: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles["container"]}>
      <Navbar />
      <div className={styles["content"]}>
        {children}
      </div>
    </div>
  );
};

export default Page;
