package com.example.TicketingSystem.service;

import com.example.TicketingSystem.model.TicketingLog;
import com.example.TicketingSystem.repository.TicketingLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service class for ticketing log operations.
 */
@Service
@RequiredArgsConstructor
public class TicketingLogService {

    private final TicketingLogRepository logRepository; // Repository for ticketing log persistence

    /**
     * Saves a new ticketing log to the database.
     * @param log TicketingLog object to be saved.
     * @return The saved TicketingLog object.
     */
    public TicketingLog saveLog(TicketingLog log) {
        return logRepository.save(log); // Save the ticketing log to MongoDB
    }
}
