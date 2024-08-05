import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import PaymentCard from "./payent";
import "./pricing.css";

// Load Stripe outside of a component to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe("your-publishable-key-here");

const Pricing = () => {
    const [openPayment, setOpenPayment] = useState({})
    const items = [
        {
            name: 'Free Plan',
            value: '$0',
            btnText: 'Current Plan',
            desc: "No credit card required",
            list: [
                { text: '5 Generations', status: true },
                { text: 'High resolution outputs', status: false },
                { text: 'Otamat watermark free', status: false },
                { text: 'Commercial License', status: false }
            ]
        },
        {
            name: 'Basic Plan',
            value: '$5 /per month',
            btnText: 'Choose Basic Plan',
            desc: "Cancel Anytime",
            mostPopular: true,
            list: [
                { text: '50 generations per month', status: true },
                { text: 'High resolution outputs', status: true },
                { text: 'Otamat watermark free', status: true },
                { text: 'Commercial License', status: false }
            ]
        },
        {
            name: 'Pro Plan',
            value: '$10 /per month',
            btnText: 'Choose Pro Plan',
            mostPopular: false,
            desc: "Cancel Anytime",
            list: [
                { text: '500 generations per month', status: true },
                { text: 'High resolution outputs', status: true },
                { text: 'Otamat watermark free', status: true },
                { text: 'Commercial License', status: true }
            ]
        }
    ];

  const handleCheckout = async (item) => {
    setOpenPayment({
      price: item.mostPopular ? 100 : 200,
      plan: item.mostPopular ? "basic" : "popular",
    });
  };

  const PricingCard = ({ item }) => {
    return (
      <div
        className="card cards d-flex flex-column gap-3"
        style={{
          padding: "40px",
          border: item.mostPopular ? "2px solid rgb(72, 136, 200)" : "none",
          marginTop: item.mostPopular ? "-20px" : "0",
        }}
      >
        <div
          style={{ fontSize: "26px", fontWeight: 700 }}
          className="text-center"
        >
          {item.name}
        </div>
        <div
          style={{ fontSize: "26px", fontWeight: 700 }}
          className="text-center"
        >
          {item.value}
        </div>
        {item.mostPopular && (
          <span className="most text-light  ">Most Popular</span>
        )}
        <button
          onClick={() =>
            item.btnText !== "Current Plan" && handleCheckout(item)
          }
          style={{
            border: "none",
            background:
              item.btnText === "Current Plan"
                ? "rgb(72, 136, 200)"
                : "rgb(241 241 241)",
            padding: "8px 10px",
            color:
              item.btnText === "Current Plan" ? "white" : "rgb(72, 136, 200)",
            fontSize: "20px",
            borderRadius: "40px",
          }}
        >
          {item.btnText}
        </button>
        <div className="text-center">{item.desc}</div>
        <hr />
        {item.list.map((item2, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            {item2.status ? (
              <TiTick color="rgb(72, 136, 200)" />
            ) : (
              <RxCross2 color="red" />
            )}
            <div style={{ fontSize: "16px", fontWeight: 600 }}>
              {item2.text}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",

          background: "rgb(255 252 245)",
        }}
      >
        <p
          style={{ fontSize: "30px", marginTop: "5rem" }}
          className="pricing-plan  "
        >
          Pricing Plan
        </p>
        <div className="d-flex gap-3 flex-wrap">
          {items.map((item, index) => (
            <PricingCard key={index} item={item} />
          ))}
        </div>
      </div>
      <PaymentCard openPayment={openPayment} />
    </Elements>
  );
};

export default Pricing;
