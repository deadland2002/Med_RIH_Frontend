import React from "react";
import styles from "../src/styles/components/Navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className={styles.navParent}>
        <Link href={"/"} className={styles.logoWrapper}>
          <img src="/png/logo-transparent-single-color.png" />
        </Link>

        <div className={styles.dataWrapper}>
          <Link href={"/SignIn"} className={styles.btnWrapper}>
              <span>SIGN IN</span>
          </Link>
          <Link href={"/SignIn"} className={styles.btnWrapper}>
              <span>SIGN UP</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
