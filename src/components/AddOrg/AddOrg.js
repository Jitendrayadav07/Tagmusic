import React from "react";
import { Form, Button, Grid,Segment ,Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../AddOrg/AddOrg.css"

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name should be at least 3 characters long"),
  category_id: yup.string().required("Category Id is required"),
  city: yup.string().required("City is required"),
  display_name: yup.string().required("Display name is required"),
  address: yup.string().required("Address is required"),
  area: yup.string().required("Area is required"),
  state: yup.string().required("State is required"),
  pin_code: yup.string().required("Pin code is required"),
  country: yup.string().required("Country is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be a valid number"),
  latitude: yup.string().required("Latitude is required"),
  longitude: yup.string().required("Longitude is required"),
  // Add more validation rules for other fields as needed
});

const AddOrg = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post("/organization/register", formData);
      console.log("response", response);
      // Handle successful response
      console.log(response.data);
      alert("Added Success. Please try again");
      reset(); // Reset the form after successful submission
      navigate("/dashboard/outlets/addOrg");
    } catch (error) {
      // Handle error
      console.error(error);
      alert("Added Failed. Please try again");
    }

    setLoading(false);
  };

  return (
    <div className="about-container">
    <h2>Welcome to the Org Page</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Segment>
          <h3>Basic Information</h3>
            <Grid columns="2" stackable>
              <Grid.Column>
                <Form.Field>
                  <label>Name :</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    {...register("name")} // Add the register here for validation
                  />
                  {errors.name && (<span className="error-message">{errors.name.message}</span>)}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Category ID :</label>
                  <input
                    type="number"
                    name="category_id"
                    placeholder="Enter your category_id"
                    {...register("category_id")} // Add the register here for validation
                  />
                  {errors.category_id && (
                    <span className="error-message">{errors.category_id.message}</span>
                  )}
                </Form.Field>
              </Grid.Column>
            </Grid>

            <Grid columns="2" stackable>
              <Grid.Column>
                <Form.Field>
                  <label>Email :</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    {...register("email")} // Add the register here for validation
                  />
                  {errors.email && (<span className="error-message">{errors.email.message}</span>)}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Phone Number :</label>
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Enter your phone_number"
                    {...register("phone_number")} // Add the register here for validation
                  />
                  {errors.phone_number && (
                    <span className="error-message">{errors.phone_number.message}</span>
                  )}
                </Form.Field>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment>
          <h3>Address Information</h3>
            <Grid columns="2" stackable>
              <Grid.Column>
                <Form.Field>
                  <label>City :</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    {...register("city")} // Add the register here for validation
                  />
                  {errors.city && (<span className="error-message">{errors.city.message}</span>)}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Display Name :</label>
                  <input
                    type="text"
                    name="display_name"
                    placeholder="Enter your display_name"
                    {...register("display_name")} // Add the register here for validation
                  />
                  {errors.display_name && (
                    <span className="error-message">{errors.display_name.message}</span>
                  )}
                </Form.Field>
              </Grid.Column>
            </Grid>

            <Grid columns="2" stackable>
              <Grid.Column>
                <Form.Field>
                  <label>Country :</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter your country"
                    {...register("country")} // Add the register here for validation
                  />
                  {errors.country && (<span className="error-message">{errors.country.message}</span>)}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>State:</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    {...register("state")} // Add the register here for validation
                  />
                  {errors.state && (<span className="error-message">{errors.state.message}</span>)}
                </Form.Field>
              </Grid.Column>
            </Grid>

            <Grid columns="2" stackable>
              <Grid.Column>
                <Form.Field>
                  <label>Address :</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    {...register("address")} // Add the register here for validation
                  />
                  {errors.address && (<span className="error-message">{errors.address.message}</span>)}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Area :</label>
                  <input
                    type="text"
                    name="area"
                    placeholder="Enter your area"
                    {...register("area")} // Add the register here for validation
                  />
                  {errors.area && (<span className="error-message">{errors.area.message}</span>)}
                </Form.Field>
              </Grid.Column>
            </Grid>

            <Grid columns="3" stackable>
            <Grid.Column>
              <Form.Field>
                <label>PinCode :</label>
                <input
                  type="text"
                  name="pin_code"
                  placeholder="Enter your pinCode"
                  {...register("pin_code")}
                />
                {errors.pin_code && (<span className="error-message">{errors.pin_code.message}</span>)}
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Latitude :</label>
                <input
                  type="text"
                  name="latitude"
                  placeholder="Enter your latitude"
                  {...register("latitude")}
                />
                {errors.latitude && ( <span className="error-message">{errors.latitude.message}</span>)}
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Longitude :</label>
                <input
                  type="text"
                  name="longitude"
                  placeholder="Enter your longitude"
                  {...register("longitude")}
                />
                {errors.longitude && (
                  <span className="error-message">{errors.longitude.message}</span>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid>
          </Segment>
         

          {/* Add more form fields with similar structure for other data */}
          <div className="submit-button">
          <Button primary type="submit" loading={loading}>
            Submit
          </Button>
          </div>
        </Form>
        </div>
  );
};

export default AddOrg;
