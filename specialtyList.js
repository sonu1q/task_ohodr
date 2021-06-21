import Layout from "../../components/layout/layout";
import Table from "../../components/table/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CSVLink } from "react-csv";

function SpecialtyList() {
  const [specialty, setSpecialty] = useState([]);
  const datab = JSON.parse(window.localStorage.getItem("user-info"));

  const access_token = datab.data.token;

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authAxios.get(
          "http://54.169.205.249:3000/ohodr/api/admin/specialities/"
        );
        setSpecialty(result.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const headers = [
    { label: "ID", key: "_id" },
    { label: "Title", key: "speciality" },
    { label: "Description", key: "description" },
    { label: "Created AT", key: "createdAt" },
    { label: "Updated AT", key: "updatedAt" },
  ];

  const csvReport = {
    filename: "SpecialityReport.csv",
    headers: headers,
    data: specialty,
  };

  console.log(specialty);

  const data = [
    {
      id: "#s-0011",
      title: "Dentist",
      icon: "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/09/Dental-Logo-Design.jpg",
      featured: "Yes",
      display: "No",
    },
    {
      id: "#s-0012",
      title: "ENT",
      icon: "https://dcassetcdn.com/design_img/2096639/92688/92688_11071094_2096639_577558cd_image.png",
      featured: "No",
      display: "Yes",
    },
  ];

  const columns = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Title",
      accessor: "speciality",
    },
    {
      Header: "Icon",
      accessor: "iconURL",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
      Cell: ({ value }) => {
        return format(new Date(value), "dd/MM/yyyy");
      },
    },
  ];

  function AddPage() {
    window.location.href = "/add-specialty";
  }

  return (
    <Layout page="specialty">
      <div className="flex justify-between">
        <div>
          <h3 className="page-title"> Specialty </h3>
          <h5 className="page-subtitle">
            All doctor specialities related to services provided by applications
            are displayed below.
          </h5>
        </div>
        <div className="my-auto">
          <button className="add-button mr-5" type="button" onClick={AddPage}>
            Add Specialty
          </button>
          <CSVLink className="" {...csvReport}>
            <button className="csv-button"> CSV Download </button>
          </CSVLink>
        </div>
      </div>
      <div className="mt-10">
        <Table columns={columns} data={specialty} type="speciality" />
        <img src={specialty.iconURL} />
      </div>
    </Layout>
  );
}

export default SpecialtyList;
