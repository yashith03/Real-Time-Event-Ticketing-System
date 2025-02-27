

import java.util.concurrent.CountDownLatch;

public class Customer implements Runnable {
    public enum CustomerType {
        VIP, STANDARD
    }

    private TicketPool ticketPool;
    private int retrievalRate;
    private CountDownLatch allTicketsSoldLatch;
    private CustomerType customerType;
    private String customerName;

    public Customer(TicketPool ticketPool, int retrievalRate, CountDownLatch allTicketsSoldLatch,
                    CustomerType customerType, String customerName) {
        this.ticketPool = ticketPool;
        this.retrievalRate = retrievalRate;
        this.allTicketsSoldLatch = allTicketsSoldLatch;
        this.customerType = customerType;
        this.customerName = customerName;
    }

    @Override
    public void run() {
        while (Main.running) {
            try {
                // If all tickets are sold, break the loop
                if (allTicketsSoldLatch.getCount() == 0) {
                    break;
                }

                // Buy a ticket
                Ticket ticket = ticketPool.buyTicket(customerType);

                // Decrement the latch
                allTicketsSoldLatch.countDown();

                // Sleep between ticket retrievals
                Thread.sleep(retrievalRate * 1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println(customerName + " was interrupted.");
                break;
            }
        }
    }
}