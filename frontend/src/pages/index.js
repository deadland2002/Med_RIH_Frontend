import Head from "next/head";
import Navbar from "../../components/Navbar";
import styles from "../styles/Home.module.scss";
import homeAnimation from "../../public/lottie/103520-freelancer-working-on-laptop.json";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Med R.I.H" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <section className={styles.homeWrapper}>
        <div className={styles.homeHero + " " + styles.roundCorner}>
          <div className={styles.dataWrapper}>
              <span className={styles.heading}>One stop destination for all your medical needs</span>
              <span className={styles.subHeading}>Spreading awareness and creating Comprehensive Healthcare Solutions tailored just for you</span>
          </div>
          <Player
            autoplay
            loop
            src={homeAnimation}
            className={styles.homeLottie}
          />
        </div>

        <div className={styles.homeSeperator + " " + styles.roundCorner}></div>

        <div className={styles.homeDivWhite + " " + styles.roundCorner}></div>

        <div className={styles.homeDivBlack + " " + styles.roundCorner}></div>
      </section>
    </>
  );
}
