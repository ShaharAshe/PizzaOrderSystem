package shahar.ex4.Orders;

import java.util.*;

public class OrderRepo {
    private static final List<OrderData> orderList = new ArrayList<>();
    private static Long ordeindex = 0L;
    public static synchronized void addOrder(OrderData od) {
        od.setOrderNumber(++ordeindex);
        orderList.add(od);
    }

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

    public static OrderData findLastOrder() {
        System.out.println(orderList);
        if (orderList.isEmpty()) {
            return null;
        }
        return orderList.get(orderList.size() - 1);
    }
}
