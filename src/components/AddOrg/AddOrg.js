import React ,{ useState } from "react";
import { Form, Button, Grid, Segment ,Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../AddOrg/AddOrg.css"

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  category_id: yup.string().required("Category ID is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  phone_number: yup.string().required("Phone number is required."),
  city: yup.string().required("City is required."),
  country: yup.string().required("Country is required."),
  state: yup.string().required("State is required."),
  area: yup.string().required("Area is required."),
  display_name: yup.string().required("Display Name is required."),
  pin_code: yup.string().required("Pin Code is required."),
  latitude: yup.string().required("Latitude is required."),
  longitude: yup.string().required("Longitude is required."),
  address: yup.string().required("Address is required."),
  display_logo: yup
    .mixed()
    .test("fileSize", "Image size is too large.", (value) => {
      if (!value) return true; // No image selected, so it's valid
      return value && value.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test("fileType", "Invalid image file type.", (value) => {
      if (!value) return true; // No image selected, so it's valid
      return value && value.type.startsWith("image/");
    })
    .required("Image is required."),
});
const AddOrg = () => {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    email: "",
    phone_number: "",
    city: "",
    country: "",
    state: "",
    area: "",
    address: "",
    display_name: "",
    pin_code: "",
    latitude: "",
    longitude: "",
    display_logo:""
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  console.log("errors",errors)
  console.log("values", getValues())
  // const handleImageChange = (e) => {
  //   console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",e)
  //   const file = e.target.files[0];
  //   console.log("file&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",file)
  //   if (file) {
  //     if (file.size > 5 * 1024 * 1024) {
  //       // If the file size exceeds 5MB, display an error message
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         display_logo: null,
  //         imageError: "Image size is too large. Please select a smaller image.",
  //       }));
  //     } else if (!file.type.startsWith("image/")) {
  //       // If the file is not an image, display an error message
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         display_logo: null,
  //         imageError: "Invalid image file type. Please select an image.",
  //       }));
  //     } else {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setFormData((prevFormData) => ({
  //           ...prevFormData,
  //           display_logo: reader.result,
  //           imageError: null,
  //         }));
  //       };setValue("display_logo",file)
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };

  const onSubmit = async (data) => {
    try {

      const response = await axios.post("/organization/create", data, {
        headers: { "Content-Type": "multipart/form-data" }, // Important for sending files
      });

      // Reset the form after successful submission
      setFormData({
        name: "",
        category_id: "",
        email: "",
        phone_number: "",
        city: "",
        country: "",
        state: "",
        area: "",
        address: "",
        display_name: "",
        pin_code: "",
        latitude: "",
        longitude: "",
        display_logo:"",
      });

      console.log("API Response:", response.data);
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error submitting form:", error);
    }
  };


  const {
    name,
    category_id,
    email,
    phone_number,
    city,
    country,
    state,
    area,
    address,
    display_name,
    pin_code,
    latitude,
    longitude,
    display_logo,
    imageError,
  } = formData;

  return (
    <div className="about-container">
      <h2>Welcome to the About Page</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="about-form">
        <Segment>
          <h3>Basic Information</h3>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="name">Name:</label>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="name"
                        {...field}
                        placeholder="Enter your name"
                      />
                    )}
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                  )}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="category_id">Category ID:</label>
                  <Controller
                    name="category_id"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="category_id"
                        {...field}
                        placeholder="Enter your Category ID"
                      />
                    )}
                  />
                  {errors.category_id && (
                    <p style={{ color: "red" }}>{errors.category_id.message}</p>
                  )}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="email">Email:</label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="email"
                        {...field}
                        placeholder="Enter your Email ID"
                      />
                    )}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                  )}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="phone_number">Phone Number:</label>
                    <Controller
                      name="phone_number"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="text"
                          id="phone_number"
                          {...field}
                          placeholder="Enter your Phone Number"
                        />
                      )}
                    />
                    {errors.phone_number && (
                      <p style={{ color: "red" }}>
                        {errors.phone_number.message}
                      </p>
                    )}
                  </Form.Field>
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <h3>Address Information</h3>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="Country">Country:</label>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="country"
                        {...field}
                        placeholder="Enter your Country"
                      />
                    )}
                  />
                  {errors.country && (
                    <p style={{ color: "red" }}>{errors.country.message}</p>
                  )}
                </Form.Field>{" "}
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label htmlFor="State">State:</label>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="state"
                        {...field}
                        placeholder="Enter your State"
                      />
                    )}
                  />
                  {errors.state && (
                    <p style={{ color: "red" }}>{errors.state.message}</p>
                  )}
                </Form.Field>{" "}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="city">City:</label>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="city"
                        {...field}
                        placeholder="Enter your City"
                      />
                    )}
                  />
                  {errors.city && (
                    <p style={{ color: "red" }}>{errors.city.message}</p>
                  )}
                </Form.Field>{" "}
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="Area">Area:</label>
                  <Controller
                    name="area"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="area"
                        {...field}
                        placeholder="Enter your Area"
                      />
                    )}
                  />
                  {errors.area && (
                    <p style={{ color: "red" }}>{errors.area.message}</p>
                  )}
                </Form.Field>{" "}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="Address">Address:</label>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="address"
                        {...field}
                        placeholder="Enter your Address"
                      />
                    )}
                  />
                  {errors.address && (
                    <p style={{ color: "red" }}>{errors.address.message}</p>
                  )}
                </Form.Field>{" "}
              </Grid.Column>

              <Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="Pin code">Pin code:</label>
                    <Controller
                      name="pin_code"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="text"
                          id="pin_code"
                          {...field}
                          placeholder="Enter your Pin code"
                        />
                      )}
                    />
                    {errors.pin_code && (
                      <p style={{ color: "red" }}>{errors.pin_code.message}</p>
                    )}
                  </Form.Field>{" "}
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="Latitude">Latitude:</label>
                  <Controller
                    name="latitude"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="latitude"
                        {...field}
                        placeholder="Enter your Latitude"
                      />
                    )}
                  />
                  {errors.latitude && (
                    <p style={{ color: "red" }}>{errors.latitude.message}</p>
                  )}
                </Form.Field>{" "}
              </Grid.Column>

              <Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor="Longitude">Longitude:</label>
                    <Controller
                      name="longitude"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="text"
                          id="longitude"
                          {...field}
                          placeholder="Enter your Longitude"
                        />
                      )}
                    />
                    {errors.longitude && (
                      <p style={{ color: "red" }}>{errors.longitude.message}</p>
                    )}
                  </Form.Field>{" "}
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="Display Name">Display Name:</label>
                  <Controller
                    name="display_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="text"
                        id="display_name"
                        {...field}
                        placeholder="Enter your Display Name"
                      />
                    )}
                  />
                  {errors.display_name && (
                    <p style={{ color: "red" }}>
                      {errors.display_name.message}
                    </p>
                  )}
                </Form.Field>{" "}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <Grid columns={2}>
            <Grid.Column>
              <h3>Organization Image</h3>
              <Form.Field>
                  <label htmlFor="display_logo">Display Logo:</label>
                  <Controller
                    name="display_logo"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  value={value?.fileName}
                  onChange={(event) => {
                    onChange(event.target.files[0]);
                  }}
                  type="file"
                  accept="image/*"
                  id="display_logo"
                />
              );
            }}
                  />
                  {errors.display_logo && (
                    <p style={{ color: "red" }}>
                      {errors.display_logo.message}
                    </p>
                  )}
              </Form.Field>{" "}
            </Grid.Column>
            <Grid.Column>
              {display_logo && (
                <div className="image-preview">
                  <h4>Selected Image:</h4>
                  <Image src={display_logo} alt="Selected Image" size="small" />
                </div>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
        <div className="submit-button">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddOrg;