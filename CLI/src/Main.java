import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static volatile boolean running = true;
    public static AtomicInteger ticketsBought = new AtomicInteger(0);
    private static CountDownLatch allTicketsSoldLatch;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to the Advanced Ticketing System!");

        mainLoop: while (true) {
            try {
                // Initial Configuration
                System.out.print("Enter the total number of Tickets: ");
                int totalTickets = scanner.nextInt();

                System.out.print("Enter ticket release rate (seconds): ");
                int ticketReleaseRate = scanner.nextInt();

                System.out.print("Enter customer retrieval rate (seconds): ");
                int customerRetrievalRate = scanner.nextInt();

                System.out.print("Enter maximum ticket capacity in the pool: ");
                int maxTicketCapacity = scanner.nextInt();

                System.out.print("Enter number of Vendors: ");
                int vendors = scanner.nextInt();

                System.out.print("Enter number of STANDARD Customers: ");
                int standardCustomers = scanner.nextInt();

                System.out.print("Enter number of VIP Customers: ");
                int vipCustomers = scanner.nextInt();

                int numCustomers = standardCustomers + vipCustomers;

                // Calculate tickets per vendor (distribute evenly)
                int ticketsPerVendor = totalTickets / vendors;
                int remainingTickets = totalTickets % vendors;

                scanner.nextLine(); // Clear the buffer after numeric inputs

                running = true;
                ticketsBought.set(0);

                TicketPool ticketPool = new TicketPool(maxTicketCapacity);
                allTicketsSoldLatch = new CountDownLatch(totalTickets);

                Thread[] vendorThreads = new Thread[vendors];
                for (int i = 0; i < vendors; i++) {
                    // Add extra ticket to last vendor if there are remaining tickets
                    int vendorTickets = ticketsPerVendor;
                    if (i == vendors - 1) {
                        vendorTickets += remainingTickets;
                    }

                    Vendor vendor = new Vendor(ticketPool, vendorTickets, ticketReleaseRate, allTicketsSoldLatch);
                    vendorThreads[i] = new Thread(vendor, "Vendor-" + (i + 1));
                    vendorThreads[i].start();
                }

                Thread[] customerThreads = new Thread[numCustomers];
                for (int i = 0; i < numCustomers; i++) {
                    Customer.CustomerType customerType = (i < vipCustomers) ?
                            Customer.CustomerType.VIP : Customer.CustomerType.STANDARD;

                    Customer customer = new Customer(
                            ticketPool,
                            customerRetrievalRate,
                            allTicketsSoldLatch,
                            customerType,
                            "Customer-" + (i + 1)
                    );
                    customerThreads[i] = new Thread(customer, "Customer-" + (i + 1));
                    customerThreads[i].start();
                }

                // Monitor thread with modified behavior
                Thread monitorThread = new Thread(() -> {
                    try {
                        System.out.println("Press Enter to stop the program...");
                        System.in.read();
                        running = false;
                        // Ensure all tickets are considered sold to trigger completion
                        while (allTicketsSoldLatch.getCount() > 0) {
                            allTicketsSoldLatch.countDown();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
                monitorThread.start();

                try {
                    allTicketsSoldLatch.await();
                    running = false;
                    Thread.sleep(500);

                    logTicketDetails(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity,
                            vendors, standardCustomers, vipCustomers);

                    // Wait for threads to finish
                    for (Thread vendorThread : vendorThreads) {
                        vendorThread.join(1000); // Add timeout to prevent hanging
                    }
                    for (Thread customerThread : customerThreads) {
                        customerThread.join(1000); // Add timeout to prevent hanging
                    }

                    System.out.println("Program Stopped");
                    System.out.println("----------------------------");

                    // Ask for continuation
                    while (true) {
                        System.out.println("Do you want to add another configuration (press \"y\" to continue or press \"n\" to exit)");
                        String Input = scanner.nextLine().trim();

                        if (Input.equalsIgnoreCase("y")) {
                            break;
                        } else if (Input.equalsIgnoreCase("n")) {
                            System.out.println("Program terminated. Thank you!");
                            scanner.close();
                            System.exit(0);
                        } else {
                            System.out.println("Invalid input. Please enter 'y' to continue or 'n' to exit.");
                        }
                    }

                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break mainLoop;
                }

            } catch (Exception e) {
                System.out.println("Invalid input. Please enter valid numeric values.");
                scanner.nextLine(); // Clear the scanner buffer
            }
        }
        scanner.close();
    }

    private static void logTicketDetails(int totalTickets, int ticketReleaseRate, int customerRetrievalRate,
                                         int maxTicketCapacity, int vendors, int standardCustomers, int vipCustomers) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("src/ticket_details.txt", true))) {
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd [HH:mm]");
            String formattedDateTime = now.format(formatter);

            writer.write("Log Date and Time: " + formattedDateTime + "\n");
            writer.write("Ticket Details\n");
            writer.write("Total Tickets: " + totalTickets + "\n");
            writer.write("Ticket Release rate (s): " + ticketReleaseRate + "\n");
            writer.write("Customer Retrieval rate (s): " + customerRetrievalRate + "\n");
            writer.write("Maximum Ticket Capacity in the pool: " + maxTicketCapacity + "\n");
            writer.write("Number of vendors: " + vendors + "\n");
            writer.write("Number of STANDARD customers: " + standardCustomers + "\n");
            writer.write("Number of VIP customers: " + vipCustomers + "\n");
            writer.write("Total tickets sold: " + totalTickets + "\n");
            writer.write("-------------------------------------------------\n");
            System.out.println("Ticket details logged to ticket_details.txt");
        } catch (IOException e) {
            System.err.println("Error writing to log file: " + e.getMessage());
        }
    }
}