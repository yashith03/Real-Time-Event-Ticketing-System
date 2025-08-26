

import java.math.BigDecimal;
import java.util.concurrent.CountDownLatch;

public class Vendor implements Runnable {
    private TicketPool ticketPool;
    private int totalTickets;
    private int ticketReleaseRate;
    private CountDownLatch allTicketsSoldLatch;

    public Vendor(TicketPool ticketPool, int totalTickets, int ticketReleaseRate, CountDownLatch allTicketsSoldLatch) {
        this.ticketPool = ticketPool;
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.allTicketsSoldLatch = allTicketsSoldLatch;
    }

    @Override
    public void run() {
        for (int i = 1; i <= totalTickets && Main.running; i++) {
            // Use TicketIdGenerator to get a unique ticket ID
            int ticketId = TicketIdGenerator.getNextTicketId();
            Ticket ticket = new Ticket(ticketId,new BigDecimal("100"));
            ticketPool.addTicket(ticket);

            try {
                Thread.sleep(ticketReleaseRate * 1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println(Thread.currentThread().getName() + " was interrupted.");
                break;
            }
        }
    }
}