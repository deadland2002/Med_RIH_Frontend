import React from "react";
import styles from "@/styles/components/account/patient/AppointmentMap.module.scss";

const AppointmentMap = ({ data, handleBookAppointment }) => {
  return (
    <div className={styles.dataContainer}>
      <table>
        <tbody>
          <tr className={styles.heading}>
            <td>S.No</td>
            <td>Name</td>
            <td>Hospital</td>
            <td>Time </td>
            <td>Slots left</td>
            <td></td>
          </tr>
          {data.map((single, index) => {
            return (
              <tr className={styles.values}>
                <td>{index + 1}</td>
                <td>{single[1] + single[2]}</td>
                <td>ABC Hospital</td>
                <td>{single[4][1]}</td>
                <td>{single[5]}</td>
                <td>
                  <div>
                    {!single[8]
                      ? [
                          <span
                            className={styles.status}
                            onClick={() => {
                              handleBookAppointment(single);
                            }}
                          >
                            {" "}
                            Book
                          </span>,
                        ]
                      : [<span className={styles.status}> Booked</span>]}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentMap;
