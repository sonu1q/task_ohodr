import React, { useContext, useState } from "react";
import Layout from "../../components/layout/layout";
import Table from "../../components/table/table";
import PatientTable from "../../components/table/PatientTable";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { CgGenderMale } from "react-icons/cg";
import { CgGenderFemale } from "react-icons/cg";
import moment from "moment";
import { PatientContext } from "../../PatientContext";

function PatientDetail() {
  const [patientData, setPatientData] = useContext(PatientContext);
  const data = patientData;
  console.log("just data is", data);

  // const columns = [
  //   {
  //     Header: "Patient ID",
  //     accessor: "_id",
  //   },
  //   {
  //     Header: "Date Check In",
  //     accessor: "createdAt",
  //     Cell: ({ value }) => {
  //       return format(new Date(value), "dd/MM/yyyy");
  //     },
  //   },
  //   {
  //     Header: "Patient Name",
  //     accessor: "fullName",
  //   },
  //   {
  //     Header: "Contact",
  //     accessor: "phone",
  //   },
  //   {
  //     Header: "Blood Group",
  //     accessor: "bloodGroup",
  //   },
  //   {
  //     Header: "Injury",
  //     accessor: (data, index) => {
  //       return data.HealthProfile.map(
  //         (value) => value.medical.injury.description
  //       );
  //     },
  //   },
  //   {
  //     Header: "Occupation",
  //     accessor: (data, index) => {
  //       return data.HealthProfile.map((value) => value.lifestyle.occupation);
  //     },
  //   },
  //   {
  //     Header: "Surgery",
  //     accessor: (data, index) => {
  //       return data.HealthProfile.map(
  //         (value) => value.medical.surgery.hasSurgery
  //       );
  //     },
  //   },
  // ];
  const columnsTwo = [
    {
      Header: "Injury",
      accessor: (data, index) => {
        return data.HealthProfile.map(
          (value) => value.medical.injury.description
        );
      },
    },
    {
      Header: "Blood Group",
      accessor: "bloodGroup",
    },
    {
      Header: "Surgery",
      accessor: (data, index) => {
        return data.HealthProfile.map(
          (value) => value.medical.surgery.hasSurgery
        );
      },
    },
    {
      Header: "Allergic",
      accessor: (data, index) => {
        return data.HealthProfile.map(
          (value) => value.medical.allergic.isAllergic
        );
      },
    },
    {
      Header: "Chronic ILL",
      accessor: (data, index) => {
        return data.HealthProfile.map(
          (value) => value.medical.chronicIll.isIll
        );
      },
    },
    {
      Header: "Past Med",
      accessor: (data, index) => {
        return data.HealthProfile.map(
          (value) => value.medical.pastMed.isTaking
        );
      },
    },
    {
      Header: "Present Med",
      accessor: (data, index) => {
        return data.HealthProfile.map(
          (value) => value.medical.presentMed.description
        );
      },
    },
    {
      Header: "Activity Level",
      accessor: (data, index) => {
        return data.HealthProfile.map((value) => value.lifestyle.activityLevel);
      },
    },
    {
      Header: "Smoking",
      accessor: (data, index) => {
        return data.HealthProfile.map((value) => value.lifestyle.smoking);
      },
    },
    {
      Header: "Alcohol",
      accessor: (data, index) => {
        return data.HealthProfile.map((value) => value.lifestyle.alcohol);
      },
    },
  ];

  return (
    <Layout page="doctor">
      <div className="flex justify-between">
        <div>
          <h3 className="page-title"> Patient Details </h3>
          <h5 className="page-subtitle"> Patient / #P-0616 </h5>
        </div>
        <div className="my-auto">
          <button className="update-button"> Update Profile </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-10">
        <div className="col-span-7">
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
                        {value.fullName}
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
                        {value.HealthProfile.map((svalue) => {
                          return (
                            <>
                              <h5 className="text-center flex items-center flex-col">
                                {svalue.lifestyle.occupation}
                              </h5>
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {/* <div className="patientdetail__table mt-20 w-max">
              <Table columns={columns} data={data} type="patientDetail" />
            </div> */}
          </div>
        </div>
        <div className="patientdetail__table ohodr-card doctor-detail-biography col-span-7 mt-16  w-max">
          <h3 className="page-title mb-5">Disease History</h3>
          <PatientTable columns={columnsTwo} data={data} type="patientDetail" />
        </div>
      </div>
    </Layout>
  );
}

export default PatientDetail;
