public class TicketIdGenerator {
    private static final Object lock = new Object();
    private static int ticketIdCounter = 1;

    public static int getNextTicketId() {
        synchronized (lock) {
            return ticketIdCounter++;
        }
    }
}