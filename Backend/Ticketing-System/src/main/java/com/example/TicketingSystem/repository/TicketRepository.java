//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\repository\TicketRepository.java

package com.example.TicketingSystem.repository;

import com.example.TicketingSystem.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for Ticket persistence.
 */
public interface TicketRepository extends MongoRepository<Ticket, String> {}
