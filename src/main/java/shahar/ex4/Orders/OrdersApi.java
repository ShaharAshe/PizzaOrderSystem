package shahar.ex4.Orders;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/order")
public class OrdersApi {
    @PostMapping(value = "")
    public ResponseEntity<?> postController(@RequestBody OrderData orderForm) {
        System.out.println("POST received - serializing LoginForm: " + orderForm.toString());

        return ResponseEntity.ok(HttpStatus.OK);
    }
}
