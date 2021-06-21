import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DataProvider } from "../DataContext";
import { PatientProvider } from "../PatientContext";
/** auth pages */
import Login from "../pages/authentication/login";
import Forget from "../pages/authentication/Forget";
import Verify from "../pages/authentication/Verify";
import Reset from "../pages/authentication/Reset";
/** private route pages */
import Dashboard from "../pages/dashboard/dashboard";
import PatientList from "../pages/patient/patientList";
import DoctorList from "../pages/doctor/doctorList";
import PatientDetail from "../pages/patient/PatientDetail";
import DoctorDetail from "../pages/doctor/doctorDetail";
import AddDoctor from "../pages/doctor/addDoctor";
import AddSpecialty from "../pages/specialty/addSpecialty";
import SpecialtyList from "../pages/specialty/specialtyList";

class Routes extends React.Component {
  render() {
    return (
      <>
        <DataProvider>
          <PatientProvider>
            <Router>
              <Route exact path="/" component={Login} />
              <Route exact path="/forget" component={Forget} />
              <Route exact path="/reset" component={Reset} />
              <Route exact path="/verify" component={Verify} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/patient-list" component={PatientList} />
              <Route exact path="/doctor-list" component={DoctorList} />
              <Route exact path="/doctor-detail" component={DoctorDetail} />
              <Route exact path="/patient-detail" component={PatientDetail} />
              <Route exact path="/add-doctor" component={AddDoctor} />
              <Route exact path="/specialty-list" component={SpecialtyList} />
              <Route exact path="/add-specialty" component={AddSpecialty} />
            </Router>
          </PatientProvider>
        </DataProvider>
      </>
    );
  }
}

export default Routes;
