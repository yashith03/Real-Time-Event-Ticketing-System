//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\thread\Customer.java

package com.example.TicketingSystem.thread;

import com.example.TicketingSystem.model.Ticket;
import com.example.TicketingSystem.model.TicketPool;

import java.util.concurrent.CountDownLatch;

public class Customer implements Runnable {
    public enum CustomerType {
        VIP, STANDARD
    }

    private final TicketPool ticketPool;
    private final int retrievalRate;
    private final CountDownLatch allTicketsSoldLatch;
    private final CustomerType customerType;

    public Customer(TicketPool ticketPool, int retrievalRate, CountDownLatch allTicketsSoldLatch,
                    CustomerType customerType) {
        this.ticketPool = ticketPool;
        this.retrievalRate = retrievalRate;
        this.allTicketsSoldLatch = allTicketsSoldLatch;
        this.customerType = customerType;
    }

    @Override
    public void run() {
        while (allTicketsSoldLatch.getCount() > 0) {
            try {
                Ticket ticket = ticketPool.buyTicket(customerType);
                if (ticket != null) {
                    allTicketsSoldLatch.countDown();
                }
                Thread.sleep(retrievalRate * 1000L);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
}
