import Layout from "../../components/layout/layout";
import calender from "../../assets/image/calender.svg";
import heart from "../../assets/image/heart.svg";
import doctor from "../../assets/image/doctor.svg";
import money from "../../assets/image/money.svg";
import { GrStar } from "react-icons/gr";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const data = JSON.parse(window.localStorage.getItem("user-info"));

  const access_token = data.data.token;

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authAxios.get(
          "http://54.169.205.249:3000/ohodr/api/admin/dashboard"
        );
        setUser(result.data.data);
        setTopDoctors(result.data.data.topDoctors);
        setRecentActivity(result.data.data.recentActivity);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  console.log("Recent activity", recentActivity);
  console.log(user);
  return (
    <Layout page="dashboard">
      <div>
        <h3 className="page-title"> Dashboard </h3>
        <h5 className="dashboard-title">
          All Dashboard activities related to application are displayed below
        </h5>
      </div>
      <div className="mt-10 flex justify-between">
        <div className="ohodr-card dashboard-number-card">
          <div>
            <h4 className="dashboard-number-title mt-1">
              {user.successfulAppointments}
            </h4>
            <h5 className="dashboard-number-subtitle dashboard-subtitle-appointment">
              Appointment
            </h5>
          </div>
          <div className="my-auto">
            <img src={calender} alt="" className="dashboard-number-icon" />
          </div>
        </div>
        <div className="ohodr-card dashboard-number-card">
          <div>
            <h4 className="dashboard-number-title"> {user.patientCount} </h4>
            <h5 className="dashboard-number-subtitle"> Total Patient </h5>
          </div>
          <div className="my-auto">
            <img src={heart} alt="" className="dashboard-number-icon" />
          </div>
        </div>
        <div className="ohodr-card dashboard-number-card">
          <div>
            <h4 className="dashboard-number-title"> {user.doctorCount} </h4>
            <h5 className="dashboard-number-subtitle"> Total Doctor </h5>
          </div>
          <div className="my-auto">
            <img src={doctor} alt="" className="dashboard-number-icon" />
          </div>
        </div>
        <div className="ohodr-card dashboard-number-card">
          <div>
            <h4 className="dashboard-number-title dashboard-title-earning">
              ${user.totalEarnings}
            </h4>
            <h5 className="dashboard-number-subtitle"> Hospital Earning </h5>
          </div>
          <div className="my-auto">
            <img src={money} alt="" className="dashboard-number-icon" />
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-10">
        <div className="col-span-1">
          <div className="ohodr-card dashboard-table-card">
            <div className="grid grid-cols-2">
              <h2 className="dashboard-table-title col-span-1 ">
                Top Rated Doctors
              </h2>
              <Link to="/doctor-list">
                <h6 className="dashboard-more col-span-1 text-right">
                  More {">>"}
                </h6>
              </Link>
            </div>
            <table className="table-auto w-full flex flex-col">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="dashboard__topRated">
                <tr className="dashboard-table-detail flex  flex-col ">
                  {topDoctors.map((value) => (
                    <div className="flex items-center mr-2" key={value._id}>
                      <td className="doctor-table-index mr-2">{value._id}</td>
                      <td>
                        <img
                          src={value.profileImage}
                          alt=""
                          className="doctor-table-img ml-3"
                        />
                      </td>
                      <div className="flex ">
                        <div className="doctor-topRated">
                          <td className="">
                            <h4 className="doctor-table-name ml-3 mr-8">
                              Dr. {value.fullName}
                            </h4>
                            <h5 className="doctor-type ml-3 mr-6">
                              {value.speciality[0]}
                            </h5>
                            <h5 className="doctor-type ml-3 mr-6">
                              {value.speciality[1]}
                            </h5>
                            <h5 className="doctor-type ml-3 mr-6">
                              {value.speciality[2]}
                            </h5>
                            <h5 className="doctor-type ml-3 mr-6">
                              {value.speciality[3]}
                            </h5>
                            <h5 className="doctor-type ml-3 mr-6">
                              {value.speciality[4]}
                            </h5>
                          </td>
                        </div>
                        <div>
                          <td>
                            {value.rating === 1 && (
                              <GrStar className="inline review-star" />
                            )}
                            {value.rating === 2 && (
                              <>
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                              </>
                            )}
                            {value.rating === 3 && (
                              <>
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                              </>
                            )}
                            {value.rating === 4 && (
                              <>
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                              </>
                            )}
                            {value.rating === 5 && (
                              <>
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                                <GrStar className="inline review-star" />
                              </>
                            )}
                            <h6 className="doctor-review">
                              {value.numReviews} Reviews
                            </h6>
                          </td>
                        </div>
                      </div>
                    </div>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-1">
          <div className="ohodr-card dashboard-table-card">
            <div className="grid grid-cols-2">
              <h2 className="dashboard-table-title col-span-1 ">
                Recent Patient Activity
              </h2>
              <Link to="/patient-list">
                <h6 className="dashboard-more col-span-1 text-right">
                  More {">>"}
                </h6>
              </Link>
            </div>
            <div className="dashboard__recent">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((data) => (
                    <tr key={data._id} className="dashboard-table-detail">
                      <td>
                        <img
                          src={data.userId.profileImage}
                          alt=""
                          className="dashboard-patient-img mr-4"
                        />
                      </td>

                      <td>
                        <h4 className="dashboard-patient-name ml-3 mr-4">
                          {data.userId.fullName}
                        </h4>
                      </td>
                      <td>
                        <h5 className="dashboard-patient-subtitle">Activity</h5>
                        <h6 className="dashboard-diseage-name">
                          {data.msg.message}
                        </h6>
                      </td>
                      <td>
                        <h5 className="dashboard-patient-time">
                          {moment(data.createdAt).format(
                            "Do MMMM YYYY, h:mm:ss a"
                          )}
                        </h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
