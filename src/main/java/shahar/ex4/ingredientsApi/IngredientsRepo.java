package shahar.ex4.ingredientsApi;

import java.util.HashMap;

public class IngredientsRepo {
    private final HashMap<String, String> ingredientsMap = new HashMap<>();

    IngredientsRepo(){
        ingredientsMap.put("Cheese","BaseCheese.png");
        ingredientsMap.put("Basil","Basil.png");
        ingredientsMap.put("Mushroom","Mushroom.png");
        ingredientsMap.put("Olive","Olive.png");
        ingredientsMap.put("Pineapple","Pineapple.png");
        ingredientsMap.put("Tomato","Tomato.png");
    }

    public HashMap<String, String> getMap(){
        return ingredientsMap;
    }
}
