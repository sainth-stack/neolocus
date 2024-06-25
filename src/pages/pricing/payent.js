import axios from 'axios';
import React, { useEffect } from 'react';

const PaymentCard = ({ openPayment }) => {
    const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    };

    React.useEffect(() => {
        loadRazorpayScript();
    }, []);

    const getInfo = async (openPayment) => {
        console.log(openPayment)
        try {
            var formData = new FormData();
            formData.append('amount', openPayment?.price);
            const response = await axios.post(
                `http://3.132.248.171:4500/paymentinfo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            return response?.data?.paymentinfo
        } catch (err) {
            console.log(err)
        }
    }

    const handlePayment = async (openPayment) => {
        // e.preventDefault();
        const data = await getInfo(openPayment)
        const options = {
            key: data.razorpay_merchant_key, // Replace with your actual test key
            amount: data.razorpay_amount, // Amount in paise (20000 paise = 200 INR)
            currency: data.currency,
            name: "merchant1",
            handler: async function (response) {
                var formData = new FormData();
                formData.append('razorpay_order_id', response.razorpay_order_id);
                formData.append('razorpay_payment_id', response.razorpay_payment_id);
                formData.append('razorpay_signature', response.razorpay_signature);
                try {
                    const result = await axios.post(
                        'http://3.132.248.171:4500/paymenthandler/',
                        formData
                    );
                    console.log(result)
                    if (result.status === 200) {
                        alert('Payment successful!');
                    } else {
                        alert('Payment failed!');
                    }
                } catch (error) {
                    console.log(error);
                    alert('Payment failed!');
                }
            },
            order_id: data.razorpay_order_id, // Replace with your actual order ID
            // callback_url: data.callback_url,
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    useEffect(() => {
        if (Object.keys(openPayment).length > 0) {
            handlePayment(openPayment)
        }
    }, [openPayment])

    return (
        <div>

        </div>
    );
};

export default PaymentCard;
