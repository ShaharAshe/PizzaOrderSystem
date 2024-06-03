package shahar.ex4.IngredientsApi;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/new-pizza")
public class PizzaIngredients {
    IngredientsRepo rp = new IngredientsRepo();
    @PostMapping(value = "")
    public HashMap<String,String> getRoot() {
        return rp.getMap();
    }
}