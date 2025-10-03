package com.ecom.TwoWheelers.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "djmx7x7uo",
                "api_key", "273581971282457",
                "api_secret", "OFeBtdizBaWDSUPn3o6KML5WVIA",
                "secure", true
        ));
    }
}