package com.ecom.TwoWheelers.controller;

import com.ecom.TwoWheelers.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/{userId}")
    public Object getUserDashboard(@PathVariable Long userId) {
        return dashboardService.getDashboard(userId);
    }
}
