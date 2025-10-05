package com.ecom.TwoWheelers.service;

import org.springframework.stereotype.Service;

@Service
public class EMIService {

    public double calculateEMI(double price, double downPayment, double annualInterestRate, int tenureMonths) {
        double loanAmount = price - downPayment;
        double monthlyRate = (annualInterestRate / 12) / 100;
        double emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths))
                / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        return Math.round(emi * 100.0) / 100.0;
    }
}
