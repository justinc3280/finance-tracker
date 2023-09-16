import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../navbar/Navbar';
import styles from './Page.module.scss';

type Props = {
  children?: React.ReactNode;
};

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles["container"]}>
      <Navbar />
      <Container fluid className={styles["content"]}>
        {children}
      </Container>
    </div>
  );
};

export default Page;
