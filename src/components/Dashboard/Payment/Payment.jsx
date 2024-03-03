import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
    const stripePromise=loadStripe(import.meta.env.VITE_REACT_PAYMENT_KEY)
    return (
        <Elements stripe={stripePromise}>
            <Checkout/>
        </Elements>
    );
};

export default Payment;