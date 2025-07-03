import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";

const Paypal = ({ amount, onSuccess, onError }) => {
    const [paypalError, setPaypalError] = useState(null);
    const [isReady, setIsReady] = useState(false);

    // Validate amount
    const validAmount = parseFloat(amount) > 0 ? amount.toString() : "1.00";

    // Log client ID for debugging
    useEffect(() => {
        const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
        if (!clientId) {
            console.error("PayPal client ID is missing");
            setPaypalError("PayPal configuration error");
        } else {
            console.log("PayPal client ID is configured");
            setIsReady(true);
        }
    }, []);

    if (paypalError) {
        return <div className="p-4 text-red-600 bg-red-100 rounded">Error: {paypalError}</div>;
    }

    return (
        <PayPalScriptProvider options={{
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: "USD",
            intent: "capture"
        }}>
            {isReady && (
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        try {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: validAmount, // Using validated amount
                                            currency_code: "USD"
                                        }
                                    }
                                ]
                            });
                        } catch (err) {
                            console.error("Error creating PayPal order:", err);
                            setPaypalError("Failed to create PayPal order");
                            onError(err);
                            return null;
                        }
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture()
                            .then((details) => {
                                console.log("Payment successful:", details);
                                onSuccess(details);
                            })
                            .catch((err) => {
                                console.error("Error capturing PayPal order:", err);
                                onError(err);
                            });
                    }}
                    onError={(err) => {
                        console.error("PayPal error", err);
                        setPaypalError("PayPal encountered an error");
                        onError(err);
                    }}
                    onCancel={() => {
                        console.log("Payment cancelled");
                    }}
                />
            )}
        </PayPalScriptProvider>
    );
};

export default Paypal;
