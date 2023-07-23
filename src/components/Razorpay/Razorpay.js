import React,{useState} from 'react'
// import { Button} from 'semantic-ui-react';
import axois from "axios";

function Razorpay() {
  const [amount, setAmount] = useState("");

  const loadScript = (src) =>{
    return new Promise((resolve) =>{
      const script = document.createElement("script");
      script.src = src;
      script.onload = () =>{
        resolve(true);
      };
      document.body.appendChild(script);
    });
  };


  async function handleClick (){

    if (amount <= 0 || amount > 10000000) {
      alert("Please enter an amount between 1 and 10,000,000 INR.");
      return;
    }

       let orderId = "OD" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

       const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

       if(!res){
        alert("Razorpay SDK failed to load . Are you online?");
        return;
       }

       let paymentRes = {
           order_id : orderId,
           amount: amount,
           currency:"INR",
           payment_capture: 1,
       };
       
       try {
       let result = await axois.post("/category/create",
       paymentRes
       );

       if(!result.data.data){
        alert("server error . Are you online?");
        return
       }else{
        let options ={
          key:"rzp_test_VXPeRqGwFHLUCq",
          currency: result.data.data.currency,
          amount: result.data.data.amount * 100,
          order_id : result.data.id,
          name : "Song Request",
          description:"Test Transaction!!",
          handler: async function(response){
            console.log("response",response)
            const result_1 = await axois.post("/category/create",
            response.razorpay_payment_id
            );
            console.log("result_1",result_1)
              // if(result_1){
              // const finalList = {
              //     orderId: orderId,
              //     payment: result_1.data.method,
              //     // addressId: newCart.addressId,
              //     // shippingPrice: newCart.shippingPrice, 
              //     total: result_1.data.amount / 100,
              //     // cart: newCart.cart,
              //     status: result_1.data.status,
              //     razorpay_payment_id: response.razorpay_payment_id,
              //     razorpay_order_id: response. razorpay_order_id,
              // };
              // }
          },
          prefill:{
            email : "jitu35334@gmail.com",
            contact : 9555700163,
          },
          notes:{
            address: "Tagtalk Corporate Office",
          },
          theme: {
            color: "#000000",
          },
        };
        let paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
       }catch (error) {
        console.log("error", error);
        alert("Server error. Are you online?");
      }
  }

  return (
    <div>
    <h1>Welcome back to Payment Bill</h1>
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)} // Update the amount state when the input changes
      placeholder="Enter amount"
    />
    <button onClick={handleClick}>Pay Now</button>
  </div>
  )
}

export default Razorpay;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Form, Input } from 'semantic-ui-react';

// const Razorpay = () => {
//   const [amount, setAmount] = useState('');

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!amount) {
//       alert('Please fill in all the fields');
//       return;
//     }

//     try {
//       // Make a POST request to your backend API to create a Razorpay order
//       const response = await axios.post('/category/customer_order', { amount });
//       console.log("response",response)
//       const { data } = response;

//       // Initialize the Razorpay checkout form
//       const options = {
//         key: 'rzp_test_VXPeRqGwFHLUCq',
//         amount: data.amount,
//         currency: data.currency,
//         name: 'Your Company',
//         description: 'Song Request Payment',
//         order_id: data.id,
//         handler: function (response) {
//           console.log(response);
//           // Handle the payment success or failure
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error(error);
//       // Handle any error during the process
//     }
//   };

//   return (
//     <div>
//       <h1>Customer Song Request</h1>
//       <Form onSubmit={handlePayment}>
//         <Form.Field>
//           <label>Amount (in INR)</label>
//           <Input
//             type="number"
//             placeholder="Enter the payment amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </Form.Field>
//         <Button type="submit">Pay Now</Button>
//       </Form>
//     </div>
//   );
// };

// export default Razorpay;