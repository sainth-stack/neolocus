import axios from 'axios';
import React, { useEffect } from 'react';

const PaymentCard = ({ openPayment }) => {
    console.log(openPayment);
    const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    };

    React.useEffect(() => {
        loadRazorpayScript();
    }, []);

    const getInfo = async () => {
        try {
            var formData = new FormData();
            formData.append('amount', 100);
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

    const handlePayment = async (e) => {
        e.preventDefault();
        const data = await getInfo()
        const options = {
            key: data.razorpay_merchant_key, // Replace with your actual test key
            amount: data.razorpay_amount, // Amount in paise (20000 paise = 200 INR)
            currency: data.currency,
            name: "merchant1",
            handler: function (response) {
                // Handle the response here without navigating away
                console.log(response);
                alert('Payment successful!');
            },
            order_id: data.razorpay_order_id, // Replace with your actual order ID
            callback_url: data.callback_url,
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    useEffect(() => {

    })

    return (
        <div style={styles.card}>
            <h1 style={styles.title}>Buy Me a Chai ☕</h1>
            <small style={styles.muted}>
                If you like my work, you can support me by donating ₹200
            </small>
            <div style={styles.btnContainer}>
                <button style={styles.btn} onClick={handlePayment}>Donate❤️</button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: 'white',
        padding: '25px',
        border: '1px solid #bbbbbb',
        borderRadius: '5px',
        boxShadow: '1px 1px 10px 0px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        letterSpacing: '1px',
    },
    muted: {
        color: '#8e7f7f',
        display: 'block',
        marginBottom: '10px',
        textAlign: 'center',
    },
    btnContainer: {
        padding: '20px',
        textAlign: 'center',
    },
    btn: {
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '4px 8px',
        backgroundColor: '#ffaaa7',
        color: 'white',
        fontSize: '1.2em',
        fontWeight: '600',
        letterSpacing: '1px',
    },
};

export default PaymentCard;
