import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/components/account/doctor/Navbar.module.scss";

const Navbar = () => {
  return (
    <ul className={styles.navParent}>
      <li className={styles.dataHolder}>
        <Image
          src={"/png/logo-transparent-single.png"}
          width={500}
          height={500}
        />
      </li>
      <li className={styles.dataHolder}>
          <Link href={"/accounts/doctor/Dashboard"}>
        <div className={styles.items}>
            Home
        </div>
            </Link>
          {/* <Link href={"/accounts/doctor/Appointment"}>
        <div className={styles.items}>
            Appointment
        </div>
            </Link> */}
      </li>
      <li className={styles.dataHolder}>
        <div className={styles.items}>
          Log Out
        </div>
      </li>
    </ul>
  );
};

export default Navbar;
