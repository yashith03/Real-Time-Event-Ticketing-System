//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\repository\TicketingLogRepository.java


package com.example.TicketingSystem.repository;

import com.example.TicketingSystem.model.TicketingLog;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for TicketingLog persistence.
 */
public interface TicketingLogRepository extends MongoRepository<TicketingLog, String> {}
