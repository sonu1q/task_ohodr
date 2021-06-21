import { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSpecialty() {
  const [speciality, setSpeciality] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const history = useHistory();

  const datab = JSON.parse(window.localStorage.getItem("user-info"));

  const access_token = datab.data.token;

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (speciality === "" || description === "" || selectedFile === "") {
      toast.error("Please Check All The Required Fields");
    } else {
      {
        try {
          const formData = new FormData();
          formData.append("description", description);
          formData.append("speciality", speciality);
          formData.append("icon", selectedFile);

          var result = await fetch(
            "http://54.169.205.249:3000/ohodr/api/admin/add/speciality",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
              body: formData,
            }
          );
          result = await result.json();
          if (result.isSuccess === true) {
            toast(result.message);
            history.push("/specialty-list");
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

  function backlist() {
    window.location.href = "/specialty-list";
  }
  return (
    <Layout page="specialty">
      <div className="flex justify-between">
        <div>
          <h3 className="page-title"> Add Specialty </h3>
          <h5 className="page-subtitle">Hospital Admin Dashboard Template</h5>
        </div>
        <div className="my-auto">
          <button className="csv-button" type="button" onClick={backlist}>
            {"<"} Back
          </button>
        </div>
      </div>
      <div className="add-specialty-form ohodr-card mt-10">
        <form className=" grid grid-cols-2 gap-10">
          <div className="col-span-1">
            <label className="add-specialty-form-label"> Title </label>
            <br />
            <input
              type="text"
              className="add-specialty-form-input"
              onChange={(e) => setSpeciality(e.target.value)}
            />
            <br />
          </div>
          <div className="col-span-1">
            <label className="add-specialty-form-label"> Icon </label>
            <br />
            <input
              type="file"
              className="add-specialty-form-input"
              onChange={changeHandler}
            />
            <br />
          </div>
          {/* <div className="col-span-1">
            <label className="add-specialty-form-label"> Featured </label>
            <br />
            <input
              type="radio"
              className="mt-3 mr-1"
              name="featured"
              value="yes"
              id="yes"
            />
            <label for="yes" className="mr-5">
              Yes
            </label>
            <input
              type="radio"
              className="mt-3 mr-1"
              name="featured"
              value="no"
              id="no"
            />
            <label for="no" className="">
              No
            </label>
            <br />
          </div> */}
          <div className="col-span-1">
            <label className="add-specialty-form-label"> Description </label>
            <br />
            <textarea
              type="text"
              className="add-specialty-form-input outline-none"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
          </div>

          {/* <div className="col-span-1">
            <label className="add-specialty-form-label"> Display </label>
            <br />
            <input
              type="radio"
              className="mt-3 mr-1"
              name="featured"
              value="yes"
              id="yes"
            />
            <label for="yes" className="mr-5">
              Yes
            </label>
            <input
              type="radio"
              className="mt-3 mr-1"
              name="featured"
              value="no"
              id="no"
            />
            <label for="no" className="mr-5">
              No
            </label>
            <br />
          </div> */}
          {/* <div className="col-span-1">
            <label className="add-specialty-form-label"> Created At </label>
            <br />
            <input
              type="datetime-local"
              className="add-specialty-form-input"
              onChange={(e) => setCreated(e.target.value)}
            />
            <br />
          </div> */}
          {/* <div className="col-span-1">
            <label className="add-specialty-form-label"> Updated At </label>
            <br />
            <input
              type="datetime-local"
              className="add-specialty-form-input"
              onChange={(e) => setUpdated(e.target.value)}
            />
            <br />
          </div> */}

          <div className="col-span-2">
            <button
              className="submit-button"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddSpecialty;
