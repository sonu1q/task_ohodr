import React, { useContext, useState } from "react";
import Layout from "../../components/layout/layout";
import placeholder from "../../assets/image/placeholder.svg";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import { BsStarFill, BsStar } from "react-icons/bs";
import { RiStethoscopeLine } from "react-icons/ri";
import { CgGenderMale } from "react-icons/cg";
import { CgGenderFemale } from "react-icons/cg";
import PieChart from "../../components/chart/PieChart";
import moment from "moment";
import { DataContext } from "../../DataContext";

function DoctorDetail() {
  const [viewData, setViewData] = useContext(DataContext);
  const [patients, setPatients] = useState([]);
  const data = viewData;
  console.log(data);

  return (
    <Layout page="doctor">
      <div className="flex justify-between">
        <div>
          <h3 className="page-title"> Doctor Details </h3>
          <h5 className="page-subtitle"> Doctor / #P-0616 </h5>
        </div>
        <div className="my-auto">
          <button className="update-button"> Update Profile </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-10">
        <div className="col-span-5">
          <div className="ohodr-card doctor-detail-biography">
            <div className="flex justify-between">
              {data.map((value) => {
                return (
                  <div className="flex">
                    <img
                      src={value.profileImage}
                      className="doctor-detail-biography-img mr-3"
                      alt=""
                    />
                    <div className="my-auto">
                      <h3 className="doctor-detail-biography-name">
                        Dr. {value.fullName}
                      </h3>
                      <h4 className="doctor-detail-biography-id">
                        {value.email}
                      </h4>
                      <h5 className="doctor-detail-biography-time">
                        {moment(value.createdAt).format(
                          "Do MMMM YYYY, h:mm:ss a"
                        )}
                      </h5>
                    </div>
                  </div>
                );
              })}
              <div>
                {data.map((value) => {
                  return (
                    <>
                      <div className="doctor-detail-biography-gender">
                        {value.gender === "male" || value.gender === "Male" ? (
                          <CgGenderMale />
                        ) : (
                          <CgGenderFemale />
                        )}
                      </div>
                      <div className="doctor-detail-biography-specialist mt-5">
                        <h5 className="text-center flex items-center flex-col">
                          {value.speciality[0]}
                          <div>{value.speciality[1]}</div>
                          <div>{value.speciality[2]}</div>
                          <div>{value.speciality[3]}</div>
                          <div>{value.speciality[4]}</div>
                        </h5>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="mt-10">
              <h4 className="doctor-detail-biography-title mb-3">Biography</h4>
              <p className="doctor-detail-biography-detail">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
                fermentum quam. Aenean at purus turpis. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Phasellus in augue tristique, malesuada enim vitae,
                fermentum mi. Nunc venenatis elementum sem vel euismod. Vivamus
                sodales dignissim volutpat. Integer pretium hendrerit iaculis.
                Ut id eleifend lorem, non auctor sem. Morbi euismod malesuada
                aliquet. Nullam sed velit aliquam, blandit risus ut, cursus
                ipsum. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Donec tellus sem,
                eleifend sed nunc et, dignissim iaculis nisl.
                <br /> <br /> Nullam at accumsan sem. Morbi imperdiet dignissim
                mi nec ornare. Aliquam interdum, nisl consequat vulputate
                pharetra, mi neque tincidunt sem, ut porta odio odio at mauris.
                Donec et nisi semper, posuere dui et, iaculis arcu. Praesent
                mollis rhoncus auctor. Integer tristique consectetur erat ac
                bibendum. Vivamus dapibus neque quam, dapibus auctor turpis
                vestibulum ut. Suspendisse vel neque non mi sodales tristique a
                sollicitudin ipsum. In vulputate, quam ac tempor placerat,
                lectus justo rutrum leo, ac efficitur felis mauris eu dolor.
                <br /> <br /> Nullam non consequat neque. In tempus justo est,
                aliquet mollis felis lacinia vel. Nulla id vehicula nisi, vel
                rutrum arcu. Quisque quis condimentum magna. Maecenas feugiat
                velit sapien, et viverra turpis pretium id. Proin leo purus,
                rutrum eget urna a, aliquet vulputate magna. Nulla at felis eu
                velit porttitor vehicula id sed enim. Proin dui dolor,
                vestibulum a lorem at, porta ultricies eros. Nam efficitur leo
                et vulputate consectetur. Morbi id nulla nisl. In hac habitasse
                platea dictumst.
              </p>
            </div>
          </div>
          <div className="mt-10 ohodr-card doctor-detail-ability grid grid-cols-2">
            <div className="col-span-1">
              <h3 className="doctor-detail-ability-title"> Doctor Ability </h3>
              <h6 className="doctor-detail-ability-detail">
                Lorem ipsum dolor sit amet, consectetur
              </h6>
              <div className="mt-5">
                <h4 className="doctor-detail-ability-statistic-title">
                  Total Statistic
                </h4>
                <h6 className="doctor-detail-ability-statistic-number">
                  452,551k
                </h6>
              </div>
              <div className="mt-5">
                <h4 className="doctor-detail-ability-statistic-title">
                  Total Statistic
                </h4>
                <h6 className="doctor-detail-ability-statistic-number">
                  452,551k
                </h6>
              </div>
              <div className="mt-5">
                <h4 className="doctor-detail-ability-statistic-title">
                  Total Statistic
                </h4>
                <h6 className="doctor-detail-ability-statistic-number">
                  452,551k
                </h6>
              </div>
            </div>
            <div className="col-span-1">
              <PieChart />
            </div>
          </div>
          <div className="mt-10 ohodr-card doctor-detail-review">
            <h3 className="doctor-detail-review-title"> Education </h3>
            {data.map((value) => {
              return (
                <>
                  {value.education &&
                    value.education.map((svalue) => {
                      return (
                        <>
                          <div className="flex items-center">
                            <div className="flex items-center my-5 w-1/2">
                              <h3 className="text-xl text-bold">Collage</h3>
                              <h3 className="ml-5 text-gray-400 text-base	">
                                {svalue.college}
                              </h3>
                            </div>
                            <div className="flex items-center my-5 ml-5 w-1/2">
                              <h3 className="text-xl text-bold">Degree</h3>
                              <h3 className="ml-5 text-gray-400 text-base	">
                                {svalue.degree}
                              </h3>
                            </div>
                            <div className="flex items-center my-5 ml-5">
                              <h3 className="text-xl text-bold">Year</h3>
                              <h3 className="ml-5 text-gray-400 ">
                                {svalue.year}
                              </h3>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </>
              );
            })}
          </div>
          <div className="mt-10 ohodr-card doctor-detail-review">
            <h3 className="doctor-detail-review-title"> Recent Review </h3>
            <div className="flex justify-between my-5">
              {data.map((value) => {
                return (
                  <>
                    <div className="flex">
                      {data.map((value) => {
                        return (
                          <>
                            {value.reviews.map((svalue) => {
                              return (
                                <>
                                  {svalue.reviewBy.map((tvalue) => {
                                    return (
                                      <img
                                        src={tvalue.profileImage}
                                        className="doctor-detail-review-img mr-5"
                                        alt=""
                                      />
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                      <div className="">
                        {value.reviews.map((svalue) => {
                          return (
                            <>
                              {svalue.reviewBy.map((tvalue) => {
                                return (
                                  <h4 className="doctor-detail-review-name">
                                    {tvalue.fullName}
                                  </h4>
                                );
                              })}
                              {value.reviews.map((svalue) => {
                                return (
                                  <p className="doctor-detail-review-detail mb-5">
                                    {svalue.review}
                                  </p>
                                );
                              })}
                            </>
                          );
                        })}
                        {value.reviews.map((svalue) => {
                          return (
                            <h6 className="doctor-detail-review-badge inline mr-3">
                              {svalue.review}
                            </h6>
                          );
                        })}
                      </div>
                    </div>
                    {data.map((value) => {
                      return (
                        <div className="my-auto">
                          <h4 className="text-center"> {value.rating} </h4>
                          {value.rating === 1 ? (
                            <>
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                            </>
                          ) : value.rating === 2 ? (
                            <>
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                            </>
                          ) : value.rating === 3 ? (
                            <>
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                            </>
                          ) : value.rating === 4 ? (
                            <>
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStar className="inline doctor-detail-review-star" />
                            </>
                          ) : value.rating === 5 ? (
                            <>
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                              <BsStarFill className="inline doctor-detail-review-star" />
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="ohodr-card doctor-detail-appointment ">
            <h3 className="appointment-title"> Appointment </h3>
            <Calendar date={new Date()} className="w-full" />
            <div>
              <div className="flex justify-between appointment-detail-con ">
                <div className="">
                  <div>
                    {data.map((value) => {
                      return (
                        <>
                          {value.activeAppointments.map((svalue) => {
                            return (
                              <>
                                <h5>
                                  {moment(svalue.createdAt).format(
                                    "Do MMMM YYYY, h:mm:ss a"
                                  )}
                                </h5>
                                {svalue.patientDetails.map((tvalue) => {
                                  return <h3>{tvalue.fullName}</h3>;
                                })}
                                <hr />
                              </>
                            );
                          })}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="my-auto">
                  <BiCheckCircle className="inline appointment-accept-icon mr-3" />
                  <BiXCircle className="inline appointment-reject-icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 ohodr-card doctor-detail-patient-list">
            <h3 className="doctor-detail-patient-list-title mb-3">
              Patient List
            </h3>
            <div className="">
              {data.map((value) => {
                return (
                  <>
                    {value.patients.map((svalue) => {
                      return (
                        <>
                          {svalue.patientInfo.map((tvalue) => {
                            return (
                              <>
                                <div className="flex doctor-detail-patient-detail">
                                  <img
                                    src={tvalue.profileImage}
                                    className="doctor-detail-patient-list-image mr-3"
                                    alt=""
                                  />
                                  <div className="my-auto">
                                    <h5 className="doctor-detail-patient-list-name">
                                      {tvalue.fullName}
                                    </h5>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DoctorDetail;
