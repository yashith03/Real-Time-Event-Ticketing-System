


import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class TicketPool {
    private final Queue<Ticket> ticketQueue;
    private final int maximumCapacity;
    private final ReentrantLock lock = new ReentrantLock(true);
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public TicketPool(int maximumCapacity) {
        this.maximumCapacity = maximumCapacity;
        this.ticketQueue = new LinkedList<>();
    }

    public Ticket buyTicket(Customer.CustomerType customerType) {
        lock.lock();
        try {
            // Wait while ticket queue is empty
            while (ticketQueue.isEmpty()) {
                try {
                    notEmpty.await();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Thread interrupted while buying ticket.");
                }
            }

            // Remove and return the ticket
            Ticket ticket = ticketQueue.poll();
            notFull.signal(); // Signal that space is available

            String customerTypeStr = customerType == Customer.CustomerType.VIP ? "VIP Customer" : "STANDARD Customer";
            System.out.println(customerTypeStr + " " + Thread.currentThread().getName().replace("Customer-", "") +
                    " has bought a ticket from the pool. Current size is " + ticketQueue.size() +
                    " :Ticket{ticketId=" + ticket.getTicketId() + ", ticket price " + ticket.getTicketPrice() + "}");
            return ticket;
        } finally {
            lock.unlock();
        }
    }

    public void addTicket(Ticket ticket) {
        lock.lock();
        try {
            // Wait while ticket queue is at maximum capacity
            while (ticketQueue.size() >= maximumCapacity) {
                try {
                    System.out.println(Thread.currentThread().getName() +
                            " is waiting. Ticket pool is at maximum capacity.");
                    notFull.await();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Thread interrupted while adding ticket.");
                }
            }

            ticketQueue.add(ticket);
            notEmpty.signal(); // Signal that a ticket is available

            System.out.println(Thread.currentThread().getName() +
                    " has added a ticket to the Pool. Current size is " + ticketQueue.size());
        } finally {
            lock.unlock();
        }
    }
}