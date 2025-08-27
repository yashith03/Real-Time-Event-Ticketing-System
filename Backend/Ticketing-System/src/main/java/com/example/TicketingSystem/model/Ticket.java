//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\model\Ticket.java


package com.example.TicketingSystem.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Ticket {
    private String id;              // Unique identifier for the ticket (MongoDB will manage this)
    private int ticketId;           // Custom ID for the ticket
    private BigDecimal price;       // Price of the ticket
    private String status;          // Status of the ticket (e.g., "Available", "Sold")
    private LocalDateTime createdAt; // Timestamp when the ticket was created

    // Constructor
    public Ticket(int ticketId, BigDecimal price) {
        this.ticketId = ticketId;
        this.price = price;
        this.createdAt = LocalDateTime.now(); // Set the creation timestamp to now
    }

    // Getter and Setter for 'ticketId'
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    // Getter and Setter for 'price'
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    // Getter and Setter for 'status'
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Getter and Setter for 'createdAt'
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Override 'toString' to give a string representation of the Ticket object
    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", price=" + price +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
