import Layout from "../../components/layout/layout";
import Table from "../../components/table/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CSVLink } from "react-csv";

function PatientList() {
  const [patient, setPatient] = useState([]);
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
          "http://54.169.205.249:3000/ohodr/api/admin/patient-list"
        );
        setPatient(result.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const headers = [
    { label: "Patient ID", key: "_id" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "phone" },
    { label: "Number Of Appointments", key: "numAppointments" },
    { label: "Weight", key: "weight" },
  ];

  const csvReport = {
    filename: "PatientReport.csv",
    headers: headers,
    data: patient,
  };

  console.log(patient);
  const datab = [
    {
      patient_id: "#p-0011",
      check_in_date: "26/02/2020, 12:42AM",
      patient_name: "patient",
      doctor_assign: "Dr. Samantha",
      disease: "Sleep Problem",
      status: "New Patient",
      room_no: "AB-004",
    },
  ];
  const columns = [
    {
      Header: "Patient ID",
      accessor: "_id",
    },
    {
      Header: "Date Check In",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Patient Name",
      accessor: "fullName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Contact",
      accessor: "phone",
    },
    {
      Header: "No. of appointments",
      accessor: "numAppointments",
    },
    {
      Header: "Weight",
      accessor: "weight",
    },
  ];

  return (
    <Layout page="patient">
      <div className="flex justify-between">
        <div>
          <h3 className="page-title"> Patient </h3>
          <h5 className="page-subtitle">
            All patients and their appointment data with their profile related
            to this application are displayed below
          </h5>
        </div>
        <div className="my-auto">
          <CSVLink className="" {...csvReport}>
            <button className="csv-button"> CSV Download </button>
          </CSVLink>
        </div>
      </div>
      <div className="mt-10">
        <Table columns={columns} data={patient} type="patient" />
      </div>
    </Layout>
  );
}

export default PatientList;
