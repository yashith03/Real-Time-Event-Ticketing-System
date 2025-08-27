//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\model\TicketingLog.java

package com.example.TicketingSystem.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Model class representing a Ticketing Log.
 */
@Data
@Document(collection = "ticketing_logs") // Maps this class to the "ticketing_logs" collection in MongoDB
public class TicketingLog {

    @Id
    private String id;                    // Unique identifier for the log, automatically managed by MongoDB
    private LocalDateTime timestamp;      // Timestamp of the log entry
    private int totalTickets;         // Number of tickets per vendor
    private int ticketReleaseRate;        // Rate at which tickets are released
    private int customerRetrievalRate;    // Rate at which customers retrieve tickets
    private int maxTicketCapacity;        // Maximum ticket capacity
    private int vendors;               // Number of vendors
    private int standardCustomers;     // Number of standard customers
    private int vipCustomers;          // Number of VIP customers

}
