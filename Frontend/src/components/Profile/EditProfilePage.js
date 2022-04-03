import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";


import { CountriesData } from './Countries'
import { useNavigate } from "react-router";
import { uploadImage } from "../../service/imageUploadService";
import { backend } from "../../config/backend";

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  

  const handleChange =  (e) => {
    if (e.target.name === "ProfileImage") {
      var profilePhoto = e.target.files[0];
      uploadImage(profilePhoto);
      
    } else {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  let profileImageData = (
    <img
      id="avatar_img"
      // src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"

      src="http://localhost:8080/images/f08297f46f68ae09cfd9851c921cbba8"
      alt=""
      className="img-fluid rounded-circle"
    />
  );
  

  return (
    <div>
      
      {/* <Container fluid> */}
      <div id="content" className="clear " role="main">
        {/* <Row className="justify-content-md-center"> */}
        {/* <Col xs lg="2"> */}
        <div className="grid-child green">
          <div id="content" className="clear " role="main">
            <link
              rel="stylesheet"
              href="https://www.etsy.com/ac/primary/css/base.20220304135846.css"
              type="text/css"
            />
            {/* <link
                rel="stylesheet"
                href="https://www.etsy.com/dac/common/web-toolkit/scoped/scoped_fixed_shared.20220304135846,common/web-toolkit/v1_toolkit_with_v2_footer/fixed-global-nav.20220304135846,common/web-toolkit/a11y_colors/overrides.20220304135846.css"
                type="text/css"
              /> */}
            <link
              rel="stylesheet"
              href="https://www.etsy.com/dac/site-chrome/components/components.20220304135846,site-chrome/header/header.20220304135846,site-chrome/footer/footer.20220304135846,gdpr/settings-overlay.20220304135846.css"
              type="text/css"
            />
            <link
              rel="stylesheet"
              href="https://www.etsy.com/dac/your/profile.20210909222603,modules/autosuggest.20210909222603,your-etsy.20220304135846,your/account/settings.20220304135846,modules/forms.20210909222603.css"
              type="text/css"
            />
          </div>
        </div>

        <div className="container">
          <div className="primary profile-edit">
            <div className="your-etsy-header clear">
              <h1>Your Public Profile</h1>
              <p>Everything on this page can be seen by anyone</p>
              <a
                className="view-profile btn-secondary small registration-hidden"
                href="/profile"
              >
                View Profile
              </a>
            </div>
            <form className="section-inner" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="label" htmlFor="avatar">
                  Profile Picture
                </label>
                <div className="change-avatar-content">
                  <input
                    type="file"
                    className="upload-new-avatar"
                    id="avatar"
                    name="ProfileImage"
                    size="15"
                    aria-describedby="changing-avatar-disabled avatar-technical-hint"
                    onChange={handleChange}
                  />

                  <div className="image-wrapper user-avatar-wrapper">
                    {profileImageData}
                  </div>
                </div>

                <span className="inline-message" id="avatar-technical-hint">
                  Must be a .jpg, .gif or .png file smaller than 10MB and at
                  least 400px by 400px.
                </span>
              </div>
              <hr />
              <div
                className="input-group"
                id="name"
                role="group"
                aria-labelledby="your-name-label"
              >
                <label className="label" id="your-name-label">
                  Your Name
                </label>
                <p className="full-name" id="full-name">
                  {/* <div>
                    {formValue.Name}
                  <ProfileNameButton />
                  </div>
                  <a
                    class="request-name-change overlay-trigger"
                    href="#namechange-overlay"
                    rel="#namechange-overlay"
                    aria-describedby="your-name-label"
                  >
                    Change or remove
                  </a> */}
                  <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="Name"
                    id="Name"
                    value={userData.Name ?? ""}
                    onChange={handleChange}
                  />
                </p>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Email">
                  Email
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="email"
                    autoComplete="off"
                    name="Email"
                    id="Email"
                    value={userData.Email ?? ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Phonenumber">
                  Phone Number
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="123-456-6789"
                    autoComplete="off"
                    name="Phonenumber"
                    id="Phonenumber"
                    value={userData.Phonenumber ?? ""}
                    onChange={handleChange}
                    className="text"
                  />
                </div>
              </div>
              <hr />
              <fieldset>
                <div
                  className="gender-class"
                  role="group"
                  aria-labelledby="gender-group-label"
                >
                  <label className="label" id="gender-group-label">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Gender
                  </label>
                  {/* <div class="radio-group" id="gender"> */}
                  <label htmlFor="female">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Female&nbsp;&nbsp;
                    <input
                      type="radio"
                      value="female"
                      name="Gender"
                      id="female"
                      checked={userData.Gender === "female"}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="male">
                  &nbsp;&nbsp;&nbsp;&nbsp;Male&nbsp;&nbsp;
                    <input
                      type="radio"
                      value="male"
                      name="Gender"
                      id="male"
                      checked={userData.Gender === "male"}
                      onChange={handleChange}
                    />
                  </label>

                  <label htmlFor="private">
                  &nbsp;&nbsp;&nbsp;&nbsp;Rather not say&nbsp;&nbsp;
                    <input
                      type="radio"
                      value="private"
                      name="Gender"
                      id="private"
                      checked={userData.Gender === "private"}
                      onChange={handleChange}
                    />
                  </label>

                  {/* </div> */}
                </div>
              </fieldset>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="DOB">
                  Date of Birth
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="date"
                    autoComplete="off"
                    name="DOB"
                    id="DOB"
                    value={userData.DOB ? userData.DOB.substring(0, 10) : ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Country">
                  Address
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="Address"
                    id="Address"
                    value={userData.Address ?? ""}
                    onChange={handleChange}
                    className="text"
                  />
                </div>
              </div>
              <hr className="registration-hidden" />
              <div className="input-group location-city">
                <label className="label" htmlFor="city3">
                  City
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="City"
                    id="City"
                    value={userData.City ?? ""}
                    onChange={handleChange}
                    className="text"
                  />
                </div>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Country">
                  Country
                </label>
                <div className="autosuggest-wrapper">
                  {/* <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="Country"
                    id="Country"
                    value={userData.Country ?? ""}
                    onChange={handleChange}
                    className="text"
                  /> */}
                  <select name="Country"  id="Country" value={userData.Country} defaultValue="none" onChange={handleChange}>
                  <option value="none" key="none"  disabled hidden>Select Country</option>
                    {CountriesData.data.map((item) => (
                        <option value={item.country} key={item.country}>{item.country}</option>
                    ))}
                   
                  </select>
                </div>
              </div>
              <div className="submit">
                <input
                  className="btn-primary"
                  type="submit"
                  value="Save Changes"
                />
              </div>
            </form>
          </div>
        </div>
        {/* </Col> */}
        {/* </Row> */}
        {/* </Container> */}
      </div>
    </div>
  );
};
export default EditProfilePage;
