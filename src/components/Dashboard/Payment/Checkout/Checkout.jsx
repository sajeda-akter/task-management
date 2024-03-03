import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Label, TextInput } from "flowbite-react";
import TitleSection from "../../../Hooks/TitleSection";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";

const Checkout = () => {
  const axiosSecure = useAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();
  const payments = useLoaderData();
  const salary = payments?.salary;
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
 
//  date for payments,

const date=moment().format('DD-MM-YYYY')

//  payment intent create
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { salary }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, salary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: payments?.email,
            name: payments?.user,
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const paymentsDetails = {
          user: payments?.user,
          email: payments?.email,
          salary,
          date,
          transactionId:paymentIntent.id
        };
        axiosSecure.post("/payment", paymentsDetails).then(() => {
          Swal.fire({
            title: "Successfully payment",
            html: `<p>Your transaction id <span style="color: green;"> ${paymentIntent.id}</span> </p> `,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(err=>{

          Swal.fire({
            // title: "Successfully payment",
            html: ` <span style="color: red;"> ${err.response.data.message}</span>  `,
            icon: "error",
            showConfirmButton: false,
            timer: 5000,
          });
          console.log(err.response.data.message)
        })
      }
    }
  };

  return (
    <div className="mt-10 ">
      <TitleSection pageName={"FinTask || payment"} />
      <h1 className="border-y-2 border-[#508D69] text-[#4E9F3D] font-bold px-2 w-56 text-2xl mb-12 pb-2 mx-auto text-center ">
        Payment Here
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 p-10 lg:p-12 w-10/12 mx-auto rounded-md"
      >
        <div className="mb-5 flex lg:flex-row flex-col gap-10">
          <div className="lg:w-96">
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Employee Email" />
            </div>
            <TextInput
              className=""
              id="email1"
              type="email"
              placeholder=""
              defaultValue={payments.email}
              readOnly
              required
            />
          </div>
          <div className="lg:w-96">
            <div className="mb-2 block">
              <Label htmlFor="salary" value="Employee Salary" />
            </div>
            <TextInput
              id="salary"
              defaultValue={payments.salary}
              name="salary"
              type="text"
              placeholder="Enter employee salary"
              required
            />
          </div>
        </div>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#508D69",
                "::placeholder": {
                  color: "#508D69",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="border-2 border-[#508D69] hover:bg-slate-200 font-medium uppercase w-20  mt-6 rounded-md p-2 text-center"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
};

export default Checkout;
