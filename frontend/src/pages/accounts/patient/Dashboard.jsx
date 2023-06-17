import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../../../components/account/patient/Layout";
import styles from "@/styles/components/account/patient/Dashboard.module.scss";
import axios from "axios";
import { getCookie } from "cookies-next";

export async function getServerSideProps({ req, res }) {
  const TOKEN = req.cookies["TOKEN"];
  const response = await axios.post(
    "http://localhost:2000/api/user/allAppointments",
    { token: TOKEN }
  );
  console.log(response.data);
  if (response && response.data && response.data.status == 200) {
    return {
      props: {
        data: response?.data?.result ? response.data.result : "",
      },
    };
  } else {
    return {
      redirect: {
        permanen: false,
        destination: "/SignIn",
      },
    };
  }
}

const Dashboard = ({ data }) => {
  const [allAppointments, setAllAppintments] = useState(data ? data : []);
  const [upcommingAppointments, setupcommingAppintments] = useState(
    allAppointments.filter((single) => {
      return !single.Visited;
    })
  );
  console.log(allAppointments);

  return (
    <Layout>
      <div className={styles.dashWrapper}>
        <div className={styles.top}>
          <div className={styles.heading}>Welcome Back</div>
          <div className={styles.subHeading}>
            we got you covered , check out for upcomming appointments
          </div>
        </div>

        <div className={styles.featured}>
          <div className={styles.cardHolder}>
            <div className={styles.upcomming}>
              <span className={styles.heading}>Upcomming Appointment :</span>
              {upcommingAppointments.length >= 1
                ? [
                    <div>
                      {upcommingAppointments.length}
                    </div>,
                  ]
                : "no upcomming appointment"}
            </div>
            <div className={styles.renew}>
              <span className={styles.heading}>Renew appointment</span>
              <span>no renew appointment</span>
            </div>
            <div className={styles.current}>
              <span className={styles.heading}>Pending appointment</span>
              <span>no pending appointment</span>
            </div>
          </div>
        </div>

        <div className={styles.appointments}>
          <div className={styles.top}>
            <div className={styles.heading}>Appointments</div>
            <div className={styles.filter}>
              <select name="filter" id="filter">
                <option value="date">Date</option>
                <option value="date">Completed</option>
                <option value="date">Upcomming</option>
                <option value="date">Pending</option>
              </select>
            </div>
          </div>
          <div className={styles.dataContainer}>
            <table>
              <tbody>
                <tr className={styles.heading}>
                  <td>Id</td>
                  <td>Doctor</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td>Location</td>
                  <td>Hospital</td>
                  <td>Status</td>
                </tr>

                {allAppointments.map((single, index) => {
                  return (
                    <tr className={styles.values}>
                      <td>{index + 1}</td>
                      <td>{single.Doctor}</td>
                      <td>{single.Appointment_Date}</td>
                      <td>{single.Appointment_Time}</td>
                      <td>{single.Appointment_City}</td>
                      <td>ABC Hospital</td>
                      <td>
                        <span className={styles.status}>
                          {" "}
                          {single.Visited ? "Visited" : "Up Coming"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
