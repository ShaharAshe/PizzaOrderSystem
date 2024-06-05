package shahar.ex4.IngredientsApi;

import java.util.HashMap;

/**
 * Repository class for managing pizza ingredients.
 */
public class IngredientsRepo {
    private final HashMap<String, String> ingredientsMap = new HashMap<>();

    /**
     * Constructor to initialize the ingredients map.
     */
    IngredientsRepo(){
        ingredientsMap.put("Cheese","BaseCheese.png");
        ingredientsMap.put("Basil","Basil.png");
        ingredientsMap.put("Mushroom","Mushroom.png");
        ingredientsMap.put("Olive","Olive.png");
        ingredientsMap.put("Pineapple","Pineapple.png");
        ingredientsMap.put("Tomato","Tomato.png");
    }

    /**
     * Get the map of ingredients.
     *
     * @return The HashMap containing pizza ingredients.
     */
    public HashMap<String, String> getMap(){
        return ingredientsMap;
    }
}
