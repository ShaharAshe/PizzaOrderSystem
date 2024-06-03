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
    @PostMapping(value = "/set")
    public ResponseEntity<String> setCookie(HttpServletResponse response) {
        OrderData lastOrder = OrderRepo.findLastOrder();

        assert lastOrder != null;
        Cookie firstNameCookie = new Cookie("firstName", lastOrder.getFirstName());
        Cookie lastNameCookie = new Cookie("lastName", lastOrder.getLastName());
        Cookie streetCookie = new Cookie("street", lastOrder.getStreet());
        Cookie houseCookie = new Cookie("house", lastOrder.getHouse());
        Cookie numberCookie = new Cookie("number", lastOrder.getNumber());
        Cookie cityCookie = new Cookie("city", lastOrder.getCity());
        Cookie phoneCookie = new Cookie("phone", lastOrder.getPhone());

        response.addCookie(firstNameCookie);
        response.addCookie(lastNameCookie);
        response.addCookie(streetCookie);
        response.addCookie(houseCookie);
        response.addCookie(numberCookie);
        response.addCookie(cityCookie);
        response.addCookie(phoneCookie);

        return ResponseEntity.ok("Cookies have been set");
    }

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
