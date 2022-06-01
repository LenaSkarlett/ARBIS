import styles from './index.module.css';
import Logo from "./../../assets/logo.svg";

const Header = ({text, mainInfo}) => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="logo" />
      <h1 className={styles.text}>{text}<br /><b>{mainInfo}</b></h1>
    </header>
  );
}

export default Header;
