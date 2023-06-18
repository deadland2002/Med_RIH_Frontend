import React, { useState } from "react";
import Layout from "../../../../components/account/doctor/Layout";
import styles from "@/styles/components/account/doctor/Dashboard.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, res }) {
  const TOKEN = req.cookies["TOKEN"];
  const response = await axios.post(
    "http://localhost:2000/api/doctor/allAppointments",
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
  const [filteredAppointments, setFilteredAppintments] = useState(
    data ? data : []
  );

  const router = useRouter();

  const filterData = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setFilteredAppintments([...data]);
    } else if (value == "Date") {
      const sortedAppointments = data.sort((a, b) => {
        return Date.parse(a.Appointment_Date) <= Date.parse(b.Appointment_Date) ? 1 : -1;
      });
      setFilteredAppintments([...sortedAppointments]);


    }else if (value == "Completed") {
      const filterAppointments = data.filter((single) => {
        return single.Status == "Completed";
      });
      setFilteredAppintments([...filterAppointments]);


    }else if (value == "Upcomming") {
      const filterAppointments = data.filter((single) => {
        return single.Status == "Up Comming";
      });
      setFilteredAppintments([...filterAppointments]);

      
    }else if (value == "Expired") {
      const filterAppointments = data.filter((single) => {
        return single.Status == "Expired";
      });
      setFilteredAppintments([...filterAppointments]);

      
    }
  };

  const handleViewAppointment = (ID) =>{
    router.push("/accounts/doctor/view/"+ID)
  }

  const renderer=()=>{
    return filteredAppointments.map((single, index) => {
      return (
        <tr className={styles.values} onClick={()=>{handleViewAppointment(single.ID)}}>
          <td>{index + 1}</td>
          <td>{single.Patient_Name}</td>
          <td>{single.Appointment_Date}</td>
          <td>{single.Time}</td>
          <td>{single.City}</td>
          <td>ABC Hospital</td>
          <td>
            <span className={styles.status}>
              {single.Status}
            </span>
          </td>
        </tr>
      );
    })
  }

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
              <select name="filter" id="filter" onChange={filterData}>
                <option value="">Sort Data</option>
                <option value="Date">Date</option>
                <option value="Completed">Completed</option>
                <option value="Upcomming">Upcomming</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          <div className={styles.dataContainer}>
            <table>
              <tbody>
                <tr className={styles.heading}>
                  <td>S.No</td>
                  <td>Patient Name</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td>Location</td>
                  <td>Hospital</td>
                  <td>Status</td>
                </tr>

                {renderer()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
