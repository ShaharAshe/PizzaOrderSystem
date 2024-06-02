package shahar.ex4.Orders;

import java.io.Serializable;
import java.util.ArrayList;

public class OrderData implements Serializable {
    private Long orderNumber;
    private ArrayList<String> ingredients;
    private String firstName;
    private String lastName;
    private String street;
    private String house;
    private String number;
    private String city;
    private String phone;
    private String price;

    public OrderData() {}
    public OrderData(Long orderNumber,
                     ArrayList<String> ingredients,
                     String firstName,
                     String lastName,
                     String street,
                     String house,
                     String number,
                     String city,
                     String phone,
                     String price) {
        checkNotNull(orderNumber);
        checkNotNull(ingredients);
        checkNotEmpty(firstName);
        checkNotEmpty(lastName);
        checkNotEmpty(street);
        checkNotEmpty(house);
        checkNotEmpty(number);
        checkNotEmpty(city);
        checkNotEmpty(phone);
        checkNotEmpty(price);

        this.orderNumber = orderNumber;
        this.ingredients = ingredients;
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.house = house;
        this.number = number;
        this.city = city;
        this.phone = phone;
        this.price = price;
    }

    private void checkNotNull(Object o) {
        if (o == null) {
            throw new IllegalArgumentException("Null argument");
        }
    }

    public void checkNotEmpty(String s) {
        if (s == null || s.isEmpty()) {
            throw new IllegalArgumentException("Empty argument");
        }
    }

    public Long getOrderNumber() {
        return orderNumber;
    }
    public void setOrderNumber(Long orderNumber) {
        checkNotNull(orderNumber);
        this.orderNumber = orderNumber;
    }

    public ArrayList<String> getIngredients(){
        return this.ingredients;
    }
    public void setIngredients(ArrayList<String> ingredients){
        this.ingredients = ingredients;
    }

    public String getFirstName(){
        return this.firstName;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public String getLastName(){
        return this.lastName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public String getStreet(){
        return this.street;
    }
    public void setStreet(String street){
        this.street = street;
    }

    public String getHouse(){
        return this.house;
    }
    public void setHouse(String house){
        this.house = house;
    }

    public String getNumber(){
        return this.number;
    }
    public void setNumber(String number){
        this.number = number;
    }

    public String getCity(){
        return this.city;
    }
    public void setCity(String city){
        this.city = city;
    }

    public String getPhone(){
        return this.phone;
    }
    public void setPhone(String phone){
        this.phone = phone;
    }

    public String getPrice(){
        return this.price;
    }
    public void setPrice(String price){
        this.price = price;
    }

    @Override
    public String toString() {
        return "OrderFormData [ingredients = "+this.ingredients+", firstName = "+this.firstName+", lastName = "+this.lastName+", street = "+this.street+", house = "+this.house+", number = "+this.number+", city = "+this.city+", phone = "+this.phone+", price = "+this.price+"]";
    }
}