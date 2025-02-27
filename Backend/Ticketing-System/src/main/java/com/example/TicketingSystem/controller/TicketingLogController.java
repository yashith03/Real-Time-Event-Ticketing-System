package com.example.TicketingSystem.controller;

import com.example.TicketingSystem.model.TicketingLog;
import com.example.TicketingSystem.model.Ticket;
import com.example.TicketingSystem.service.TicketingLogService;
import com.example.TicketingSystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling API requests related to tickets and ticket logs.
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TicketingLogController {

    private final TicketingLogService logService;
    private final TicketService ticketService;

    // Health-check endpoint
    @GetMapping("/health-check")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is running");
    }

    @PostMapping("/logs")
    public ResponseEntity<TicketingLog> createLog(@RequestBody TicketingLog log) {
        TicketingLog createdLog = logService.saveLog(log);
        return ResponseEntity.ok(createdLog);
    }

    @PostMapping("/tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Ticket createdTicket = ticketService.createTicket(ticket);
        return ResponseEntity.ok(createdTicket);
    }
    @PostMapping("/logs/system-start")
    public ResponseEntity<TicketingLog> logSystemStart(@RequestBody TicketingLog log) {
        TicketingLog createdLog = logService.saveLog(log);
        return ResponseEntity.ok(createdLog);
    }
    

}
