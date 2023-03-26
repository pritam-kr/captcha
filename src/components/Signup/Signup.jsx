import React, { useEffect, useState } from "react";
import { generateString } from "../utils";
import Styles from "./Signup.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    captcha: "",
    generatedCaptch: "",
    error: "",
    successfull: "",
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, generatedCaptch: generateString(6) }));
  }, []);

  const generateCaptch = () => {
    setRefresh(true);
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, generatedCaptch: generateString(6) }));
      setRefresh(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.captcha === formData.generatedCaptch) {
      setFormData((prev) => ({
        ...prev,
        error: "",
        successfull: "Successfully submit.",
      }));
    } else if (!formData.captcha || formData.captcha !== formData.generatedCaptch) {
      setFormData((prev) => ({
        ...prev,
        error: "Please enter valid captcha.",
        successfull: "",
      }));
    }
  };

  return (
    <form className={Styles.form}>
      <div className={Styles.formHeader}>
        <h2 className="small-heading">Signup</h2>
      </div>

      <div className={Styles.inputRow}>
        <label className={Styles.inputLabel}>Name: </label>
        <input
          type="text"
          placeholder="Enter Text"
          className="input primary-input"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className={Styles.inputRow}>
        <label className={Styles.inputLabel}>Email:</label>
        <input
          type="email"
          placeholder="example@.com"
          className="input"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className={Styles.inputRow}>
        <label className={Styles.inputLabel}>Password:</label>
        <input type="password" className="input" required />
      </div>

      <div className={`${Styles.inputRow}`}>
        <label className={Styles.inputLabel}>Captcha:</label>
        <div className={Styles.captchaRow}>
          {" "}
          <div className={Styles.captchView}>
            {formData.generatedCaptch}
          </div>{" "}
          <input
            type="text"
            className="input"
            placeholder="Enter captcha"
            value={formData.captcha}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, captcha: e.target.value }))
            }
          />
        </div>
      </div>

      <div className={`${Styles.inputRow} ${Styles.captcha}`}>
        <p>
          Captcha not visible{" "}
          {!refresh && (
            <span onClick={generateCaptch} className={Styles.click}>
              click
            </span>
          )}
        </p>
        {refresh && (
          <img
            src="https://res.cloudinary.com/dhqxln7zi/image/upload/v1679828788/FormalBewitchedIsabellinewheatear-max-1mb_dboygg.gif"
            alt="refresh_icon"
          />
        )}
      </div>
      <p className={`${formData.error ? Styles.error : Styles.success}`}>
        {formData.error
          ? formData.error
          : formData.successfull
          ? formData.successfull
          : ""}
      </p>
      <div className={Styles.inputRow}>
        <button className="btn" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Signup;
