package shahar.ex4.Orders;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Controller
@RequestMapping("/order")
public class OrdersApi {
    @PostMapping(value = "")
    public ResponseEntity<?> postController(@RequestBody OrderData orderForm) {
        System.out.println("POST received - serializing LoginForm: " + orderForm.toString());
        OrderRepo.addOrder(orderForm);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping(value = "/last")
    public ResponseEntity<?> getLastOrder() {
        return ResponseEntity.ok(OrderRepo.findLastOrder());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<OrderData> getBook(@PathVariable final Long id) {
        OrderData b = OrderRepo.findOrderById(id);
        if (b == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Not Found");
        }
        return ResponseEntity.ok(b);
    }
}
