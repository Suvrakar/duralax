import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // Define Yup schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  return (
    <>
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            <div className="card">
              <div className="card-body">
                <div className="app-brand justify-content-center">
                  <a href="javascript:void(0)" className="app-brand-link gap-2">
                    <span className="app-brand-logo demo">
                      <img
                        src={"../../assets/img/favicon/logo.png"}
                        style={{
                          width: "130px",
                          height: 55,
                          objectFit: "contain",
                        }}
                      />
                    </span>
                  </a>
                </div>
                <h4 className="mb-2">Welcome to Duralux! 👋</h4>
                <p className="mb-4">
                  Please sign-in to your account and start the adventure
                </p>
                <Formik
                  initialValues={{ email: "" }}
                  onSubmit={async (values) => {
                    dispatch(loginApi(values))
                      .then((data) => {
                        // This block runs when the loginApi is fulfilled successfully
                        if (data?.payload?.status == 200) {
                          navigate("/");
                        }
                      })
                      .catch((error) => {
                        // This block runs if there was an error during the loginApi operation
                        console.error("Async operation failed:", error);
                      });
                  }}
                  validationSchema={validationSchema}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset,
                    } = props;
                    return (
                      <form
                        id="formAuthentication"
                        className="mb-3"
                        onSubmit={handleSubmit}
                      >
                        <div className="mb-3">
                          <TextInput
                            label="Email"
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            // autoFocus
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email}
                          />
                        </div>
                        <div className="mb-3 form-password-toggle">
                          <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                            <a href="javascript:void(0)">
                              <small>Forgot Password?</small>
                            </a>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="password"
                              placeholder="············"
                              aria-describedby="password"
                              className={`form-control ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <span className="input-group-text cursor-pointer">
                              <i className="bx bx-hide" />
                            </span>
                            {touched.password && errors.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remember-me"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remember-me"
                            >
                              {" "}
                              Remember Me{" "}
                            </label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary w-100 buttonload"
                            type="submit"
                          >
                            {store.status == "loading" && (
                              <i class="fa fa-spinner fa-spin"></i>
                            )}
                            Sign in
                          </button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
