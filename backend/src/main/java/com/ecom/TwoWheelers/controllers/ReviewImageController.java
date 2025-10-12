package com.ecom.TwoWheelers.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewImageController {

    private static final String UPLOAD_DIR = "uploads/reviews/";

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("files") MultipartFile[] files) {
        List<String> urls = new ArrayList<>();
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();

        for (MultipartFile file : files) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File dest = new File(dir, fileName);
            try {
                file.transferTo(dest);
                urls.add("/" + UPLOAD_DIR + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(urls);
    }
}
