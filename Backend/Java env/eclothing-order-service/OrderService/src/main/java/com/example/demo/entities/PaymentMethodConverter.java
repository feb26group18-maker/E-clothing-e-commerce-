
package com.example.demo.entities;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PaymentMethodConverter
        implements AttributeConverter<PaymentMethod, String> {

    @Override
    public String convertToDatabaseColumn(PaymentMethod paymentMethod) {

        if (paymentMethod == null) {
            return null;
        }

        switch (paymentMethod) {

            case Cash_On_Delivery:
                return "Cash On Delivery";

            case UPI:
                return "UPI";

            case Credit_Card:
                return "Credit Card";

            case Debit_Card:
                return "Debit Card";

            default:
                throw new IllegalArgumentException(
                        "Unknown payment method: " + paymentMethod
                );
        }
    }

    @Override
    public PaymentMethod convertToEntityAttribute(String value) {

        if (value == null) {
            return null;
        }

        switch (value) {

            case "Cash On Delivery":
                return PaymentMethod.Cash_On_Delivery;

            case "UPI":
                return PaymentMethod.UPI;

            case "Credit Card":
                return PaymentMethod.Credit_Card;

            case "Debit Card":
                return PaymentMethod.Debit_Card;

            default:
                throw new IllegalArgumentException(
                        "Unknown payment method: " + value
                );
        }
    }
}
