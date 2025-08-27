//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\controller\TicketingLogController.java

package com.example.TicketingSystem.controller;

import com.example.TicketingSystem.model.TicketingLog;
import com.example.TicketingSystem.model.Ticket;
import com.example.TicketingSystem.service.TicketingLogService;
import com.example.TicketingSystem.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001","http://localhost:3002"})
public class TicketingLogController {

    private final TicketingLogService logService;
    private final TicketService ticketService;

    // Health-check
    @GetMapping("/health-check")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is running");
    }

    // ---- Logs ----
    @PostMapping("/logs")
    public ResponseEntity<TicketingLog> createLog(@RequestBody TicketingLog log) {
        return ResponseEntity.ok(logService.saveLog(log));
    }

    @PostMapping("/logs/system-start")
    public ResponseEntity<TicketingLog> logSystemStart(@RequestBody TicketingLog log) {
        return ResponseEntity.ok(logService.saveLog(log));
    }

    @GetMapping("/logs")
    public ResponseEntity<List<TicketingLog>> getLogs() {
        return ResponseEntity.ok(logService.findAll());
    }

    // ---- Tickets ----
    @PostMapping("/tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        return ResponseEntity.ok(ticketService.createTicket(ticket));
    }
}
