
package com.example.TicketingSystem.utils;

import java.util.concurrent.atomic.AtomicInteger;

public class TicketIdGenerator {
    private static final AtomicInteger counter = new AtomicInteger(1);

    public static int getNextTicketId() {
        return counter.getAndIncrement();
    }
}
