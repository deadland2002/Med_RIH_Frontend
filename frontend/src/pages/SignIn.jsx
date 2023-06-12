import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import styles from "../styles/SignIn.module.scss";
import signinAnimation from "../../public/lottie/27637-welcome.json";

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");

  const HandleRadioChange = (e) => {
    const { name, value } = e.target;
    setSelectedRadio(value);
  };
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to Med R.I.H account" />
        <meta name="viewport" content="width=device-width, initialc-scale=1" />
        <link
          rel="icon"
          href="/svg/med-rih-website-favicon-color.svg"
          type="image/svg"
          sizes="16x16"
        ></link>
      </Head>
      <div className={styles.signinParent}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Player
              autoplay
              loop
              src={signinAnimation}
              className={styles.signinLottie}
            />
          </div>

          <div className={styles.right}>
            <div className={styles.container}>
              <div className={styles.dataWrapper}>
                <div className={styles.heading}>
                  <span>Welcome back!</span>
                </div>
                <div className={styles.subHeading}>
                  <span>Resume your healty and care free life-style</span>
                </div>
                <form action="#" className={styles.formWrapper}>
                  <div className={styles.fieldWrapper}>
                    <img src="/png/email-blue.png" alt="email" width={"30px"} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <img src="/png/lock-blue.png" alt="email" width={"30px"} />
                    <input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      placeholder="At least 8 characters"
                      required
                    />
                    <img
                      src={
                        isVisible
                          ? "/png/eye-opened.png"
                          : "/png/eye-closed.png"
                      }
                      alt="email"
                      width={"30px"}
                      onClick={() => {
                        setIsVisible((prev) => !prev);
                      }}
                    />
                  </div>
                  <div className={styles.radioGroup}>
                    <div className={styles.radioField}>
                      <label
                        className={
                          selectedRadio === "doctor" ? styles.active : ""
                        }
                        htmlFor="radioDoctor"
                      >
                        <img
                          src="/png/doctor-blue-icon.png"
                          alt="doctor"
                          width={"20px"}
                        />
                        Doctor
                      </label>
                      <input
                        type="radio"
                        name="category"
                        value={"doctor"}
                        id="radioDoctor"
                        onChange={HandleRadioChange}
                        required
                      />
                    </div>
                    <div className={styles.radioField} htmlFor="radioPatient">
                      <label
                        className={
                          selectedRadio === "patient" ? styles.active : ""
                        }
                        htmlFor="radioPatient"
                      >
                        <img
                          src="/png/patient-blue-icon.png"
                          alt="doctor"
                          width={"20px"}
                        />
                        Patient
                      </label>
                      <input
                        type="radio"
                        name="category"
                        value={"patient"}
                        id="radioPatient"
                        onChange={HandleRadioChange}
                        required
                      />
                    </div>
                    <div className={styles.radioField} htmlFor="radioPharmacy">
                      <label
                        className={
                          selectedRadio === "pharmacy" ? styles.active : ""
                        }
                        htmlFor="radioPharmacy"
                      >
                        <img
                          src="/png/pill-blue-icon.png"
                          alt="doctor"
                          width={"20px"}
                        />
                        Pharmacy
                      </label>
                      <input
                        type="radio"
                        name="category"
                        value={"pharmacy"}
                        id="radioPharmacy"
                        onChange={HandleRadioChange}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
