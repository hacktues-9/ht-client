import { useEffect, useState } from "react";
import getConfig from 'next/config';

import useKeyPress from "../../hooks/useKeyPress";

interface AdminProps {
  secret: string,
}

const Admin = (props: AdminProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [keyCombo, setKeyCombo] = useState<string>('');

  console.log(process.env.OOOPSIE)

  const onKeyPress = (event: KeyboardEvent) => {
    setKeyCombo(prevCombo => (prevCombo + event.key));
  };

  useKeyPress("hacktues 9".split(''), onKeyPress);

  useEffect(() => {
    if (keyCombo === "hacktues 9")
      setShow(true);
  }, [keyCombo])

  return show ? <h1>Admin Page</h1> : <h1>404</h1>;
};

const getStaticProps = () => {
  return {
    props: {
      secret: process.env.OOOPSIE
    }
  }
}

export default Admin;
