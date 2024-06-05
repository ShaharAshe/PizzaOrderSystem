package shahar.ex4.IngredientsApi;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * Controller for handling pizza ingredients API requests.
 */
@RestController
@RequestMapping("/new-pizza")
public class PizzaIngredients {
    IngredientsRepo rp = new IngredientsRepo();

    /**
     * Endpoint for retrieving pizza ingredients.
     *
     * @return A HashMap containing pizza ingredients.
     */
    @PostMapping(value = "")
    public HashMap<String,String> getRoot() {
        return rp.getMap();
    }
}