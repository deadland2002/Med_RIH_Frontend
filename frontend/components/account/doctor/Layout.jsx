import React from "react";
import Navbar from "./Navbar";
import styles from "@/styles/components/account/doctor/Layout.module.scss"

const Layout = ({ children }) => {
  return (
    <>
      <section>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.nav}>
              <Navbar />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.dataWrapper}>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
