import React from "react";
import Layout from "../../../../../components/account/doctor/Layout";
import axios from "axios";
import styles from "@/styles/components/account/doctor/DynamicViewer.module.scss";
import medicineNames from "@/../data/names";

export async function getServerSideProps(context) {
  const TOKEN = context.req.cookies["TOKEN"];
  const { query } = context;

  if (TOKEN && query && query.id) {
    const res = await axios.post("http://localhost:2000/api/user/Appointment", {
      token: TOKEN,
      ID: query.id,
    });
    console.log(res.data);
    return {
      props: {
        data: res.data,
      },
    };
  }

  return {
    redirect: {
      permanen: false,
      destination: "/SignIn",
    },
  };
}

const DynamicViewer = ({ data }) => {
  if (!data) {
    return (
      <>
        <h1>Some error occured</h1>
      </>
    );
  }
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.imgField}>
            <img src={data.patient_Details.Image} alt="" srcset="" />
          </div>
          <div className={styles.field}>
            <div>
              <span>Name</span>
              <span>:</span>
              <span>{data.appointment_details.PatientName}</span>
            </div>
            <div>
              <span>Age</span>
              <span>:</span>
              <span>{data.patient_Details.Age}</span>
            </div>
            <div>
              <span>Gender</span>
              <span>:</span>
              <span>{data.patient_Details.Gender}</span>
            </div>
            <div>
              <span>Height</span>
              <span>:</span>
              <span>{data.patient_Details.Height}</span>
            </div>
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.header}>Prescription</div>
          <div>
            <div>
              <input
                key={30}
                name="medicineName"
                list="medicineList"
                placeholder="Medicine name"
              />
              <datalist id="medicineList">
                {medicineNames.map((single, index) => {
                  return <option value={single} key={`medicine_${index}`} />;
                })}
              </datalist>
            </div>
            <div>
              <input type="text" placeholder="Dosage" />
            </div>
            <div>
              <span>time</span>
              <span>
                <label htmlFor="morning">morning</label>
                <input type="checkbox" name="" id="morning" />
              </span>
              <span>
                <label htmlFor="evening">evening</label>
                <input type="checkbox" name="" id="evening" />
              </span>
              <span>
                <label htmlFor="afternoon">afternoon</label>
                <input type="checkbox" name="" id="afternoon" />
              </span>
            </div>
            <div>
              <span>meal</span>
              <span>
                <label htmlFor="meal_before">before</label>
                <input type="checkbox" name="" id="meal_before" />
              </span>
              <span>
                <label htmlFor="meal_after">after</label>
                <input type="checkbox" name="" id="meal_after" />
              </span>
              <span>
                <label htmlFor="meal_any">any</label>
                <input type="checkbox" name="" id="meal_any" />
              </span>
            </div>
            <div>
              <input type="text" placeholder="duration" />
            </div>
          </div>
          <div>
            <button>Add</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DynamicViewer;
