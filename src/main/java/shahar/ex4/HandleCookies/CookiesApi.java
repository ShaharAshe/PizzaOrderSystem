package shahar.ex4.HandleCookies;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import shahar.ex4.Orders.OrderData;
import shahar.ex4.Orders.OrderRepo;

@Controller
@RequestMapping("/cookies")
public class CookiesApi {
    @PostMapping(value = "/get")
    public ResponseEntity<?> getCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            return ResponseEntity.ok(cookies);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No cookies found");
        }
    }
}
