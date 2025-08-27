//D:\Downloads\Real-Time-Event-Ticketing-System\Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\thread\Vendor.java


package com.example.TicketingSystem.thread;

import com.example.TicketingSystem.model.Ticket;
import com.example.TicketingSystem.model.TicketPool;
import com.example.TicketingSystem.utils.TicketIdGenerator;

import java.math.BigDecimal;

public class Vendor implements Runnable {
    private final TicketPool ticketPool;
    private final int totalTickets;
    private final int ticketReleaseRate;

    public Vendor(TicketPool ticketPool, int totalTickets, int ticketReleaseRate) {
        this.ticketPool = ticketPool;
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
    }

    @Override
    public void run() {
        for (int i = 0; i < totalTickets; i++) {
            int ticketId = TicketIdGenerator.getNextTicketId();
            Ticket ticket = new Ticket(ticketId, new BigDecimal("100.00"));
            ticketPool.addTicket(ticket);

            try {
                Thread.sleep(ticketReleaseRate * 1000L);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
}
