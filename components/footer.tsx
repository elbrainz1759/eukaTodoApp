import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Typography } from "@material-ui/core";

import styles from '../styles/Footer.module.css'


const Footer = () => {
  return (
    <footer className={styles.footer}>
    <a
      href="https://eukapay.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.logo}>
       EukaPay Todo App
      </span>
    </a>
  </footer>
  );
};

export default Footer;
