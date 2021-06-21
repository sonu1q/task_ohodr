import Layout from "../../components/layout/layout";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddDoctor() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState("Male");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState();
  const history = useHistory();

  const datab = JSON.parse(window.localStorage.getItem("user-info"));

  const access_token = datab.data.token;

  const education = [
    {
      degree,
      college,
      year,
    },
  ];
  const speciality = [specialist];

  const data = {
    speciality,
    fullName,
    email,
    password,
    phone,
    gender,
    experience,
    education,
  };

  const [yearstudy, setYearstudy] = useState([
    {
      name: "",
      degree: "",
      year: "",
    },
  ]);

  async function submit(e) {
    e.preventDefault();
    {
      if (
        fullName === "" ||
        email === "" ||
        password === "" ||
        phone === "" ||
        speciality === ""
      ) {
        toast.error("Please Check All The Required Fields");
      } else {
        try {
          var result = await fetch(
            "http://54.169.205.249:3000/ohodr/api/admin/add-doctor",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              body: JSON.stringify(data),
            }
          );
          result = await result.json();
          if (result.isSuccess === true) {
            toast.success(result.message);
            history.push("/doctor-list");
          } else if (result.isSuccess === false) {
            toast.error("Please Check All The Required Fields");
          }
        } catch (e) {
          console.log(e);
        }
      }
      console.log(result);
    }
  }

  function AddYearStudy() {
    setYearstudy(
      yearstudy.concat([
        {
          name: "",
          degree: "",
          year: "",
        },
      ])
    );
  }

  function DeleteYearStudy(i) {
    setYearstudy([...yearstudy.slice(0, i), ...yearstudy.slice(i + 1)]);
  }
  /*
  function NameYearStudy(e, i) {
    let tempyearstudy = [...yearstudy];
    tempyearstudy[i].qualification = e.target.value;
    setYearstudy(yearstudy);
  }
*/
  const [yearexperience, setYearexperience] = useState([
    {
      name: "",
      experience: "",
      workas: "",
    },
  ]);

  function AddYearExperience() {
    setYearexperience(
      yearexperience.concat([
        {
          name: "",
          experience: "",
          workas: "",
        },
      ])
    );
  }

  function DeleteYearExperience(i) {
    setYearexperience([
      ...yearexperience.slice(0, i),
      ...yearexperience.slice(i + 1),
    ]);
  }

  function backlink() {
    window.location.href = "/doctor-list";
  }

  return (
    <Layout page="doctor">
      <div className="flex justify-between">
        <div>
          <h3 className="page-title"> Add Doctors </h3>
          <h5 className="page-subtitle">Hospital Admin Dashboard Template</h5>
        </div>
        <div className="my-auto">
          <button className="csv-button" type="button" onClick={backlink}>
            {"< "}Back
          </button>
        </div>
      </div>
      <div className="add-doctor-form ohodr-card mt-10">
        <form>
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1">
              <label className="add-doctor-form-label"> Name </label>
              <br />
              <input
                type="text"
                className="add-doctor-form-input"
                onChange={(e) => setFullName(e.target.value)}
              />
              <br />
            </div>
            {/* <div className="col-span-1">
              <label className="add-doctor-form-label"> Date of Birth </label>
              <br />
              <input
                type="date"
                className="add-doctor-form-input"
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
            </div> */}
            <div className="col-span-1">
              <label className="add-doctor-form-label"> Email </label>
              <br />
              <input
                type="text"
                className="add-doctor-form-input"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
            </div>
            <div className="col-span-1">
              <label className="add-doctor-form-label"> Gender </label>
              <br />
              <select
                className="add-doctor-form-input"
                onChange={(e) => setGender(e.target.value)}
              >
                <option> Male </option>
                <option> Female </option>
              </select>
              <br />
            </div>
            <div className="col-span-1">
              <label className="add-doctor-form-label"> Specialist </label>
              <br />
              <input
                type="text"
                className="add-doctor-form-input"
                onChange={(e) => setSpecialist(e.target.value)}
              />
              <br />
            </div>
            {/* <div className="col-span-1">
              <label className="add-doctor-form-label"> Address </label>
              <br />
              <input
                type="textarea"
                className="add-doctor-form-input"
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
            </div> */}
            <div className="col-span-1">
              <label className="add-doctor-form-label"> Password </label>
              <br />
              <input
                type="password"
                className="add-doctor-form-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
            </div>

            {/* <div className="col-span-1">
              <label className="add-doctor-form-label">Doctor Biography</label>
              <br />
              <input
                type="textarea"
                className="add-doctor-form-input"
                onChange={(e) => setBiography(e.target.value)}
              />
              <br />
            </div> */}
            <div className="col-span-1">
              <label className="add-doctor-form-label">Phone</label>
              <br />
              <input
                type="number"
                className="add-doctor-form-input"
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />
            </div>
            <div className="col-span-1 my-auto">
              <h5 className="add-doctor-form-title"> Year of Study </h5>
            </div>
            <div className="col-span-1 my-auto ">
              <button
                className="csv-button"
                onClick={AddYearStudy}
                type="button"
              >
                + Add New
              </button>
            </div>
            {yearstudy.map((item, index) => (
              <div className="col-span-2 grid grid-cols-2 gap-10" key={index}>
                <div className="col-span-1">
                  <label className="add-doctor-form-label">
                    Collage/University Name{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    className="add-doctor-form-input"
                    onChange={(e) => setCollege(e.target.value)}
                  />
                  <br />
                </div>
                <div className="col-span-1">
                  <label className="add-doctor-form-label">
                    {" "}
                    Year Studied In{" "}
                  </label>
                  <br />
                  <input
                    type="number"
                    className="add-doctor-form-input"
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <br />
                </div>
                <div className="col-span-1">
                  <label className="add-doctor-form-label"> Degree </label>
                  <br />
                  <input
                    type="text"
                    className="add-doctor-form-input"
                    onChange={(e) => setDegree(e.target.value)}
                  />
                  <br />
                </div>
                <div className="col-span-1 my-auto ">
                  {index > 0 ? (
                    <button
                      className="add-doctor-form-delete"
                      type="button"
                      onClick={() => DeleteYearStudy(index)}
                    >
                      Delete
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-span-2">
                  <hr />
                </div>
              </div>
            ))}
            <div className="col-span-1 my-auto">
              <h5 className="add-doctor-form-title"> Years of Experience </h5>
            </div>
            <div className="col-span-1 my-auto ">
              <button
                className="csv-button"
                type="button"
                onClick={AddYearExperience}
              >
                + Add New
              </button>
            </div>
            {yearexperience.map((item, index) => (
              <div className="col-span-2 grid grid-cols-2 gap-10" key={index}>
                {/* <div className="col-span-1">
                  <label className="add-doctor-form-label">
                    {" "}
                    Hospital Name{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    className="add-doctor-form-input"
                    onChange={(e) => setHospital(e.target.value)}
                  />
                  <br />
                </div> */}
                {/* <div className="col-span-1">
                  <label className="add-doctor-form-label">
                    Years of Experience
                  </label>
                  <br />
                  <input
                    type="date"
                    className="add-doctor-form-input"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <br />
                </div> */}
                <div className="col-span-1">
                  <label className="add-doctor-form-label">
                    Years of Experience
                  </label>
                  <br />
                  <input
                    type="number"
                    className="add-doctor-form-input"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <br />
                </div>
                {/* <div className="col-span-1">
                  <label className="add-doctor-form-label"> Worked as </label>
                  <br />
                  <input
                    type="text"
                    className="add-doctor-form-input"
                    onChange={(e) => setWorked(e.target.value)}
                  />
                  <br />
                </div> */}
                <div className="col-span-1 my-auto ">
                  {index > 0 ? (
                    <button
                      className="add-doctor-form-delete "
                      type="button"
                      onClick={() => DeleteYearExperience(index)}
                    >
                      Delete
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-span-2">
                  <hr />
                </div>
              </div>
            ))}
            <div className="col-span-2 mt-10 ">
              <button
                className="add-doctor-form-delete "
                type="submit"
                onClick={submit}
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddDoctor;
