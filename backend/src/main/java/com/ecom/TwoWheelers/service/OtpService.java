package com.ecom.TwoWheelers.service;

import com.ecom.TwoWheelers.model.OtpVerification;
import com.ecom.TwoWheelers.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;
    private final SmsService smsService; // use Twilio or any SMS provider

    public void sendOtp(Long userId, String phone) {
        int otp = new Random().nextInt(900000) + 100000; // 6-digit OTP
        OtpVerification record = new OtpVerification(null, userId, otp, LocalDateTime.now().plusMinutes(5), false);
        otpRepository.save(record);
        smsService.sendSms(phone, "Your OTP is: " + otp);
    }

    public boolean verifyOtp(Long userId, int otp) {
        OtpVerification record = otpRepository.findTopByUserIdOrderByIdDesc(userId)
                .orElseThrow(() -> new RuntimeException("OTP not found"));
        if (record.getOtp() == otp && record.getExpiryTime().isAfter(LocalDateTime.now())) {
            record.setVerified(true);
            otpRepository.save(record);
            return true;
        }
        return false;
    }
}
