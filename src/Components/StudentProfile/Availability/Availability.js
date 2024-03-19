import React, { useState } from "react";
import "./availability.css";
import { useFormik } from "formik";
import axios from "axios";
import { apiHeaders, isLoggedIn, currentUser } from "../../../helper";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const Availability = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    0: {
      "00:00": {
        sun: false,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "01:15": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "02:30": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "03:45": {
        sun: true,
        mon: false,
        tue: false,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "05:00": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "06:15": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "07:30": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "08:45": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "10:00": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "11:15": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "12:30": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "13:45": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "15:00": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "16:15": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "17:30": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "18:45": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "20:00": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "21:15": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
      "22:30": {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
      },
    },
  });
  // console.log({ data });
  console.log(Object.keys(data[0]));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user_availabilities: [data],
    },
    // validationSchema: PreferenceSchema,
    onSubmit: (data) => {
      setLoading(true);
      const formData = {
        user_availabilities: data.user_availabilities,
      };
      console.log(data);
      try {
        axios
          .post(
            "http://146.190.72.174:5006/api/student/update-availabilities",
            {
              ...formData,
            },
            { ...apiHeaders }
          )
          .then((res) => {
            console.log(res);
            setLoading(false);
            props.toggle(2);
            toast.success("Record Updated Sucessfully");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="availability-wrap">
      <div className="container">
        <div className="form-wrap-main">
          <div className="form-title">
            <h2>Set Your General Availability</h2>
          </div>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="calendar-wrap">
              <table cellPadding={0} cellSpacing={0} border={1}>
                <thead>
                  <tr>
                    <th colSpan={3}></th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data[0]).map((time_slot) => {
                    return (
                      <tr>
                        <td colSpan={3}>
                          <div className="time-slot">{time_slot}</div>
                        </td>
                        {/* <div className="checkbox-row"> */}
                        {Object.keys(data[0][time_slot]).map((day_name) => {
                          return (
                            <td>
                              <input
                                className="checkbox"
                                type="checkbox"
                                checked={data[0][time_slot][day_name]}
                                onChange={(event) => {
                                  setData((old_data) => {
                                    // console.log(
                                    //   old_data[0][time_slot][day_name],
                                    //   "this is",
                                    //   day_name,
                                    //   time_slot
                                    // );
                                    old_data[0][time_slot][day_name] =
                                      event.target.checked;
                                    return { ...old_data };
                                  });
                                }}
                              />
                            </td>
                          );
                        })}
                        {/* </div> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="submit-button submit-container ">
              <button type="submit" value="submit">
                CONTINUE
                {
                  <ClipLoader
                    color={"#fff"}
                    loading={loading}
                    className="loader"
                    size={18}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Availability;
