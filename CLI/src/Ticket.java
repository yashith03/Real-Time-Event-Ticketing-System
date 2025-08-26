

import java.math.BigDecimal;

public class Ticket {
    private int ticketId;

    private BigDecimal ticketPrice;

    public Ticket(int ticketId, BigDecimal ticketPrice) {
        this.ticketId = ticketId;

        this.ticketPrice = ticketPrice;
    }

    public int getTicketId() {
        return ticketId;
    }

    public BigDecimal getTicketPrice() {
        return ticketPrice;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", ticketPrice=" + ticketPrice +
                '}';
    }
}