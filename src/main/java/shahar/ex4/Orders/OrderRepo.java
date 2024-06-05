package shahar.ex4.Orders;

import java.util.*;

/**
 * Repository class for managing orders.
 */
public class OrderRepo {
    private static final List<OrderData> orderList = new ArrayList<>();
    private static Long ordeindex = 0L;

    /**
     * Add a new order to the order repository.
     *
     * @param od OrderData object containing order details.
     * @return OrderData object representing the added order.
     */
    public static synchronized OrderData addOrder(OrderData od) {
        od.setOrderNumber(++ordeindex);
        orderList.add(od);

        return orderList.get(orderList.size() - 1);
    }

    /**
     * Find an order by its ID.
     *
     * @param id Order ID.
     * @return OrderData object representing the found order, or null if not found.
     */
    public static OrderData findOrderById(Long id) {
        OrderData order = null;
        // some code to find a book in our database
        for (OrderData k : orderList) {
            if (k.getOrderNumber().equals(id)) {
                order = new OrderData(
                        k.getOrderNumber(),
                        k.getIngredients(),
                        k.getFirstName(),
                        k.getLastName(),
                        k.getStreet(),
                        k.getHouse(),
                        k.getNumber(),
                        k.getCity(),
                        k.getPhone(),
                        k.getPrice()
                );
                System.out.println("send");
                break;
            }
        }
        return order;
    }

    /**
     * Find the last order in the repository.
     *
     * @return OrderData object representing the last order, or null if the repository is empty.
     */
    public static OrderData findLastOrder() {
        System.out.println(orderList);
        if (orderList.isEmpty()) {
            return null;
        }
        return orderList.get(orderList.size() - 1);
    }
}
