import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Layout from "../Layouts/Layout";
import ForgotPassword from "../Pages/Forgotpassword/ForgotPassword";
import ThankYou from "../Pages/Thankyou/ThankYou";
import Verification from "../Pages/Verifiction/Verification";
import CreatePassword from "../Pages/CreatePassword/CreatePassword";
import StudentProfile from "../Pages/StudentProfile/StudentProfile";
import ResetPassword from "../Pages/Resetpassword/ResetPassword";
import Accordion from "../Components/Accordion/Accordion";
import Protected from "./Protected";

const MTPRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route element={<Protected />}>
              <Route
                path="/studentProfile"
                element={<StudentProfile />}
              ></Route>
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/thankyou" element={<ThankYou />}></Route>
            <Route
              path="/verify/email/:token"
              element={<Verification />}
            ></Route>
            <Route path="/createPassword" element={<CreatePassword />}></Route>
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="/accordion" element={<Accordion />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MTPRoutes;
