"use client";

import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type CheckoutFormProps = {
    product: {};
    clientSecret: string;
};

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
    return (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
            <Form />
        </Elements>
    );
};

const Form = () => {
    const stripe = useStripe();
    const element = useElements();
    return <PaymentElement />;
};
