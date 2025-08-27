//Backend\Ticketing-System\src\main\java\com\example\TicketingSystem\model\TicketPool.java


package com.example.TicketingSystem.model;

import com.example.TicketingSystem.thread.Customer.CustomerType;

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

    public Ticket buyTicket(CustomerType customerType) {
        lock.lock();
        try {
            while (ticketQueue.isEmpty()) {
                notEmpty.await();
            }

            Ticket ticket = ticketQueue.poll();
            notFull.signal();
            String customerTypeStr = customerType == CustomerType.VIP ? "VIP Customer" : "STANDARD Customer";
            System.out.println(customerTypeStr + " bought Ticket ID " + ticket.getTicketId());
            return ticket;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Thread interrupted while buying a ticket.");
        } finally {
            lock.unlock();
        }
    }

    public void addTicket(Ticket ticket) {
        lock.lock();
        try {
            while (ticketQueue.size() >= maximumCapacity) {
                notFull.await();
            }
            ticketQueue.add(ticket);
            notEmpty.signal();
            System.out.println("Ticket ID " + ticket.getTicketId() + " added to the pool.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Thread interrupted while adding a ticket.");
        } finally {
            lock.unlock();
        }
    }
}
