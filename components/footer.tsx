import styles from '../styles/Footer.module.css'
import ImageLoader from "./../imageLoader";
import eukaLogo from "../images/eukaPayLogo.jpg";
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className={styles.footer}>
    <a
      href="https://eukapay.com/"
      target="_blank"
      rel="noopener noreferrer"
      style={{textAlign:"center"}}

    >
        <span className={styles.logo}>
        <Image
                  loader={ImageLoader}
                  unoptimized
                  src={eukaLogo}
                  alt="Euka Logo"
                  width="50"
                  height="50"
                />
                <br />
       EukaPay Todo App
      </span>
    </a>
  </footer>
  );
};

export default Footer;
