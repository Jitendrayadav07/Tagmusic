import React, { useState } from "react";
import { Form, Button ,Table ,Segment} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../Today/Today.css";

const validationSchema = yup.object().shape({
  artist_name: yup.string().required("Artist Name is required."),
  genre: yup.string().required("Genre is required."),
  price_per_request: yup.string().required("Price Per Request is required."),
});

const Today = () => {
  const [showForm, setShowForm] = useState(false);
  const [tableData,setTableData] = useState([])
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const tableData1 = [
    { id: 1, name: "John Doe", age: 30, city: "New York" },
    { id: 2, name: "Jane Smith", age: 25, city: "Los Angeles" },
    { id: 3, name: "Bob Johnson", age: 28, city: "Chicago" },
  ];

  const onSubmit = async (data) => {
    try {
      // Handle form submission with data
      console.log("Form Data:", data);

      // Make the API call
      const response = await axios.post("/outlet_panel/create", data);

      // Add the form data to the tableData state
      setTableData((prevData) => [...prevData, data]);

      // Reset the form after successful submission
      setValue("artist_name", "");
      setValue("genre", "");
      setValue("price_per_request", "");
      const getAllData = await axios.get("/outlet_panel").then((response)=>{
        console.log("data",response)
        setTableData(response.data.result)
       }).catch((err)=>{
        console.log("err",err)
       })
     

       alert('Artist Added successful');
       navigate('/dashboard/today');
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} primary>
          Active
        </Button>
      ) : (
        <Segment>
        <h3>Form Data</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label>Artist Name</label>
              <Controller
                name="artist_name"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} />}
              />
              {errors.artist_name && (
                <p className="error-message">{errors.artist_name.message}</p>
              )}
            </Form.Field>

            <Form.Field>
              <label>Genre</label>
              <Controller
                name="genre"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} />}
              />
              {errors.genre && (
                <p className="error-message">{errors.genre.message}</p>
              )}
            </Form.Field>

            <Form.Field>
              <label>Price Per Request</label>
              <Controller
                name="price_per_request"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} />}
              />
              {errors.price_per_request && (
                <p className="error-message">{errors.price_per_request.message}</p>
              )}
            </Form.Field>

            <Button type="submit" primary>
              Submit
            </Button>
          </Form>

    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Today Plan</Table.HeaderCell>
        <Table.HeaderCell>Artist Name</Table.HeaderCell>
        <Table.HeaderCell>Genre</Table.HeaderCell>
        <Table.HeaderCell>Price Per Request</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {tableData.map((item) => (
      <Table.Row key={item.id}>
        <Table.Cell>{item.id}</Table.Cell>
        <Table.Cell>{item.artist_name}</Table.Cell>
        <Table.Cell>{item.genre}</Table.Cell>
        <Table.Cell>{item.price_per_request}</Table.Cell>
      </Table.Row>
      ))}
    </Table.Body>
  </Table>
  </Segment>
      )}
    </div>
  );
};

export default Today;
