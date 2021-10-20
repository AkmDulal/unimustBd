import { Route, Switch } from "react-router-dom"
import ScrollToTop from './components/ScrollToTop';

import './App.css';
// Pages Import
import HomePages from "./pages/Home";
import StudentConsultancy from "./pages/StudentConsultancy";
import VisaConsultancy from "./pages/VisaConsultancy";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import Layout from "./components/layout/Layout";
import CountryDetails from "./pages/CountryDetails";
import AboutPages from "./pages/AboutUsPages";
import BlockDetails from "./pages/BlockDetails";
import EventDetails from "./pages/EventDetails";
import CourseList from "./pages/CourseList";
import CoursesDetails from "./pages/CoursesDetails";
import ApplicationPages from "./pages/ApplicationPages";
// import GetAppointment from "./pages/GetAppointmentNew";
import GetAppointment from "./pages/GetAppointment";
import MedicalTourism from "./pages/MedicalTourism";
import Error from "./pages/Error";
// import GetAppointment from "./pages/Raff";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePages}></Route>
            <Route exact path="/student-consultancy" component={StudentConsultancy}></Route>
            <Route exact path="/about-us" component={AboutPages}></Route>
            <Route exact path="/visa-consultancy" component={VisaConsultancy}></Route>
            <Route exact path="/country-details/:slug" component={CountryDetails}></Route>
            <Route exact path="/block-details/:slug" component={BlockDetails}></Route>
            <Route exact path="/event-details/:slug" component={EventDetails}></Route>
            <Route exact path="/course-list" component={CourseList}></Route>
            <Route exact path="/course-list/:cslug" component={CourseList}></Route>
            <Route exact path="/courses-details/:slug" component={CoursesDetails}></Route>
            <Route exact path="/application-pages" component={ApplicationPages}></Route>
            <Route exact path="/application-pages/:slug" component={ApplicationPages}></Route>
            <Route exact path="/get-appointment" component={GetAppointment}></Route>
            <Route exact path="/medical-tourism" component={MedicalTourism}></Route>
            {/* ERROR PAGES  */}
            <Route component={Error}></Route>
          </Switch>
        </Layout>
    </div>
  );
}

export default App;
