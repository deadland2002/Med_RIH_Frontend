import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../../components/account/patient/Layout";
import Location from "@/../data/Location.json";
import { Department } from "@/../data/Department.js";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import styles from "@/styles/components/account/patient/Appointment.module.scss";
import { getCookie } from "cookies-next";
import axios from "axios";
import AppointmentMap from "../../../../components/account/patient/AppointmentMap";

export async function getServerSideProps({ query }) {
  return {
    props: {
      queryParam: query,
    },
  };
}

const Appointment = ({ queryParam }) => {
  const [Data_For_Search, setData_For_Search] = useState({
    State: queryParam.State ? queryParam.State : "",
    City: queryParam.City ? queryParam.City : "",
    Department: queryParam.Department ? queryParam.Department : "",
    Date: queryParam.Date ? queryParam.Date : "",
  });
  const [queryString, setQueryString] = useState("");
  let searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [result, setResult] = useState([]);
  
  const createQueryString = useCallback(
    (name, value) => {
      console.log(name, value);
      const params = new URLSearchParams();
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData_For_Search((prev) => ({ ...prev, [name]: value }));
    // setQueryString(createQueryString(name,value));
    // router.push(pathname + '?' + createQueryString(name,value));
  };

  const GetToday = (offset = 0) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear(Data_For_Search);

    return (today = yyyy + "-" + mm + "-" + dd);
  };

  const setUrlDataRecord = () => {
    let queryStr = createQueryString("State", Data_For_Search.State);
    queryStr += "&" + createQueryString("City", Data_For_Search.City);
    queryStr +=
      "&" + createQueryString("Department", Data_For_Search.Department);
    queryStr += "&" + createQueryString("Date", Data_For_Search.Date);
    router.push(pathname + "?" + queryStr);
  };

  const handleSearch = async (e) => {
    const TOKEN = getCookie("TOKEN");
    console.log("started");
    if (
      Data_For_Search.State &&
      Data_For_Search.City &&
      Data_For_Search.Department &&
      Data_For_Search.Date &&
      TOKEN
    ) {
      setUrlDataRecord();
      const res = await axios.post(
        "http://localhost:2000/api/SearchAppointment",
        { ...Data_For_Search, token: TOKEN }
      );
      if (res && res.data && res.data.result) {
        console.log(res.data.result);
        setResult(res.data.result);
      }else if(res && res.data){
        if(res.data.status == 401){
          alert("login session expired , login again");
          router.push("/SignIn")
        }
      }
    }
    console.log("ended");
  };

  const handleBookAppointment = async (obj) => {
    if (obj) {
      const TOKEN = getCookie("TOKEN");
      const response = await fetch(
        "http://localhost:2000/api/BookAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: obj[0],
            token: TOKEN,
            Day_Time: obj[4],
            Date_of_Appointment: obj[6],
            City_of_Appointment: obj[7],
          }),
        }
      ).then((res) => res.json());

      console.log(response);
    }
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <span>Appointment</span>
          <br />
          <span>Find an appoinement which suits your needs</span>
        </div>

        <div key={3423} className={styles.middle}>
          <div className={styles.formWrapper}>
            <div className={styles.dataHolder} key={3}>
              <div className={styles.field} key={4}>
                <input
                  key={30}
                  onChange={handleChange}
                  name="State"
                  list="states"
                  placeholder="State"
                  value={Data_For_Search.State}
                />
                <datalist id="states">
                  {Object.keys(Location).map((single, index) => {
                    return <option value={single} key={single} />;
                  })}
                </datalist>
              </div>

              <div className={styles.field} key={5}>
                <input
                  key={20}
                  onChange={handleChange}
                  name="City"
                  list="cities"
                  placeholder="City"
                  value={Data_For_Search.City}
                  disabled={Data_For_Search.State ? false : true}
                />
                <datalist id="cities">
                  {Location[Data_For_Search.State]
                    ? Location[Data_For_Search.State].map((single, index) => {
                        return <option value={single} key={single} />;
                      })
                    : []}
                </datalist>
              </div>

              <div className={styles.field} key={6}>
                <input
                  key={60}
                  onChange={handleChange}
                  name="Department"
                  list="department"
                  placeholder="Department"
                  value={Data_For_Search.Department}
                  disabled={Data_For_Search.City ? false : true}
                />
                <datalist id="department">
                  {Department.map((single, index) => {
                    return <option value={single} key={single} />;
                  })}
                </datalist>
              </div>

              <div key={80} className={styles.field}>
                <input
                  key={23423}
                  type="date"
                  name="Date"
                  onChange={handleChange}
                  value={Data_For_Search.Date}
                  min={GetToday()}
                />
              </div>

              <div key={42342} className={styles.btnWrapper}>
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.slotHolder}>
          <AppointmentMap data={result} handleBookAppointment={handleBookAppointment} />
        </div>
      </div>
    </Layout>
  );
};

export default Appointment;
