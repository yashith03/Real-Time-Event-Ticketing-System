package com.example.TicketingSystem.service;

import com.example.TicketingSystem.model.Ticket;
import com.example.TicketingSystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Service class for ticket operations.
 */
@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository; // Repository for ticket persistence

    /**
     * Creates a new ticket and saves it to the database.
     * @param ticket Ticket object to be created.
     * @return The saved Ticket object.
     */
    public Ticket createTicket(Ticket ticket) {
        ticket.setCreatedAt(LocalDateTime.now()); // Set the current timestamp
        return ticketRepository.save(ticket);    // Save the ticket to MongoDB
    }
}
