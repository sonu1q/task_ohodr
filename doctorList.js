import Layout from "../../components/layout/layout";
import Table from "../../components/table/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CSVLink } from "react-csv";

function DoctorList() {
  const [doctor, setDoctor] = useState([]);

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
          "http://54.169.205.249:3000/ohodr/api/admin/doctor-list"
        );
        setDoctor(result.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const headers = [
    { label: "Doctor ID", key: "_id" },
    { label: "Date Join", key: "createdAt" },
    { label: "Doctor Name", key: "fullName" },
    { label: "Specialist", key: "speciality" },
    { label: "Number Of Appointments", key: "numAppointments" },
    { label: "Contact", key: "phone" },
  ];

  const csvReport = {
    filename: "DoctorReport.csv",
    headers: headers,
    data: doctor,
  };

  console.log(doctor);

  const dataB = [
    {
      id: "#p-0011",
      date_join: "26/02/2020, 12:42AM",
      doctor_name: "Dr. Samantha",
      specialist: "Dentist",
      schedule: 5,
      contact: "+1241245125",
      status: "Available",
    },
    {
      id: "#p-0011",
      date_join: "26/02/2020, 12:42AM",
      doctor_name: "Dr. Samantha",
      specialist: "Dentist",
      schedule: 0,
      contact: "+1241245125",
      status: "Unavailable",
    },
  ];

  const columns = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Date Join",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Doctor Name",
      accessor: "fullName",
    },
    {
      Header: "Specialist",
      accessor: "speciality",
    },
    {
      Header: "No of Appointments",
      accessor: "numAppointments",
    },
    {
      Header: "Contact",
      accessor: "phone",
    },
  ];

  function AddPage() {
    window.location.href = "/add-doctor";
  }

  return (
    <Layout page="doctor">
      <div className="flex justify-between">
        <div>
          <h3 className="page-title"> Doctors </h3>
          <h5 className="page-subtitle">
            All doctors and their information related to this application are
            displayed below
          </h5>
        </div>
        <div className="my-auto">
          <button className="add-button mr-5" type="button" onClick={AddPage}>
            {" "}
            Add Doctor{" "}
          </button>
          <CSVLink className="" {...csvReport}>
            <button className="csv-button"> CSV Download </button>
          </CSVLink>
        </div>
      </div>
      <div className="mt-10">
        <Table columns={columns} data={doctor} type="doctor" />
      </div>
    </Layout>
  );
}

export default DoctorList;
