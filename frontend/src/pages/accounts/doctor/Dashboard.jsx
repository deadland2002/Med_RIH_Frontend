import React from "react";
import Layout from "../../../../components/account/doctor/Layout";
import styles from "@/styles/components/account/doctor/Dashboard.module.scss";

const Dashboard = () => {
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
            <div className={styles.upcomming}>no upcomming appointment</div>
            <div className={styles.renew}>no renew appointment</div>
            <div className={styles.current}>no pending appointment</div>
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
                  <td>Location</td>
                  <td>Hospital</td>
                  <td>Status</td>
                </tr>


                <tr className={styles.values}>
                  <td>#3234234</td>
                  <td>Dr. abc</td>
                  <td>Jan 22 , 2023</td>
                  <td>Kanpur</td>
                  <td>ABC Hospital</td>
                  <td><span className={styles.status}> Incomplete</span></td>
                </tr>
               
               
               
               
                <tr className={styles.values}>
                  <td>#3234234453453</td>
                  <td>Dr. abc Mishra</td>
                  <td>Jan 22 , 2023</td>
                  <td>Kanpur UtterPradesh</td>
                  <td>ABC Hospital Ganga gang</td>
                  <td><span className={styles.status}> Incomplete</span></td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
