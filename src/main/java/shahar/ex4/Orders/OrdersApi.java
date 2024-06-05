package shahar.ex4.Orders;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * Controller class for handling orders.
 */
@Controller
@RequestMapping("/order")
public class OrdersApi {
    /**
     * Add order details to cookies.
     *
     * @param response   HttpServletResponse object.
     * @param orderForm  OrderData object containing order details.
     */
    private void addOrderCookies(HttpServletResponse response, OrderData orderForm) {
        addCookie(response, "firstName", orderForm.getFirstName());
        addCookie(response, "lastName", orderForm.getLastName());
        addCookie(response, "street", orderForm.getStreet());
        addCookie(response, "house", orderForm.getHouse());
        addCookie(response, "number", orderForm.getNumber());
        addCookie(response, "city", orderForm.getCity());
        addCookie(response, "phone", orderForm.getPhone());
    }

    /**
     * Add a cookie to the HttpServletResponse object.
     *
     * @param response HttpServletResponse object.
     * @param name     Name of the cookie.
     * @param value    Value of the cookie.
     */
    private void addCookie(HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, value);
        response.addCookie(cookie);
    }

    /**
     * Handle POST request to add a new order.
     *
     * @param orderForm OrderData object containing order details.
     * @param response  HttpServletResponse object.
     * @return ResponseEntity with the added order data.
     */
    @PostMapping(value = "")
    public ResponseEntity<?> postController(@RequestBody OrderData orderForm, HttpServletResponse response) {
        System.out.println("POST received - serializing LoginForm: " + orderForm.toString());
        addOrderCookies(response, orderForm);
        return ResponseEntity.ok(OrderRepo.addOrder(orderForm));
    }

    /**
     * Handle GET request to retrieve order details by ID.
     *
     * @param id Order ID.
     * @return ResponseEntity containing the order data.
     */
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<OrderData> getBook(@PathVariable final Long id) {
        OrderData b = OrderRepo.findOrderById(id);
        if (b == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Not Found");
        }
        return ResponseEntity.ok(b);
    }
}
