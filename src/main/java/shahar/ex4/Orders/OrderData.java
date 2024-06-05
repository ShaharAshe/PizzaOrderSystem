package shahar.ex4.Orders;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * Represents an order data model.
 */
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

    /**
     * Constructs an OrderData object.
     */
    public OrderData() {}

    /**
     * Constructs an OrderData object with the given parameters.
     *
     * @param orderNumber Unique identifier for the order.
     * @param ingredients List of ingredients included in the order.
     * @param firstName   First name of the customer.
     * @param lastName    Last name of the customer.
     * @param street      Street address of the customer.
     * @param house       House/apartment number of the customer.
     * @param number      Additional details about the address.
     * @param city        City of the customer.
     * @param phone       Phone number of the customer.
     * @param price       Price of the order.
     */
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

    /**
     * Checks if the given object is not null.
     *
     * @param o The object to check.
     */
    private void checkNotNull(Object o) {
        if (o == null) {
            throw new IllegalArgumentException("Null argument");
        }
    }

    /**
     * Checks if the given string is not null or empty.
     *
     * @param s The string to check.
     */
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

    // Getters and setters for each field

    /**
     * Returns the list of ingredients included in the order.
     *
     * @return The list of ingredients.
     */
    public ArrayList<String> getIngredients(){
        return this.ingredients;
    }

    /**
     * Sets the list of ingredients for the order.
     *
     * @param ingredients The list of ingredients to set.
     */
    public void setIngredients(ArrayList<String> ingredients){
        this.ingredients = ingredients;
    }

    /**
     * Returns the first name of the customer.
     *
     * @return The first name of the customer.
     */
    public String getFirstName(){
        return this.firstName;
    }

    /**
     * Sets the first name of the customer.
     *
     * @param firstName The first name of the customer.
     */
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    /**
     * Returns the last name of the customer.
     *
     * @return The last name of the customer.
     */
    public String getLastName(){
        return this.lastName;
    }

    /**
     * Sets the last name of the customer.
     *
     * @param lastName The last name of the customer.
     */
    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    /**
     * Returns the street address of the customer.
     *
     * @return The street address of the customer.
     */
    public String getStreet(){
        return this.street;
    }

    /**
     * Sets the street address of the customer.
     *
     * @param street The street address of the customer.
     */
    public void setStreet(String street){
        this.street = street;
    }

    /**
     * Returns the house/apartment number of the customer.
     *
     * @return The house/apartment number of the customer.
     */
    public String getHouse(){
        return this.house;
    }

    /**
     * Sets the house/apartment number of the customer.
     *
     * @param house The house/apartment number of the customer.
     */
    public void setHouse(String house){
        this.house = house;
    }

    /**
     * Returns additional details about the address of the customer.
     *
     * @return Additional details about the address.
     */
    public String getNumber(){
        return this.number;
    }

    /**
     * Sets additional details about the address of the customer.
     *
     * @param number Additional details about the address.
     */
    public void setNumber(String number){
        this.number = number;
    }

    /**
     * Returns the city of the customer.
     *
     * @return The city of the customer.
     */
    public String getCity(){
        return this.city;
    }

    /**
     * Sets the city of the customer.
     *
     * @param city The city of the customer.
     */
    public void setCity(String city){
        this.city = city;
    }

    /**
     * Returns the phone number of the customer.
     *
     * @return The phone number of the customer.
     */
    public String getPhone(){
        return this.phone;
    }

    /**
     * Sets the phone number of the customer.
     *
     * @param phone The phone number of the customer.
     */
    public void setPhone(String phone){
        this.phone = phone;
    }

    /**
     * Returns the price of the order.
     *
     * @return The price of the order.
     */
    public String getPrice(){
        return this.price;
    }

    /**
     * Sets the price of the order.
     *
     * @param price The price of the order.
     */
    public void setPrice(String price){
        this.price = price;
    }

    /**
     * Returns a string representation of the order data.
     *
     * @return A string representation of the order data.
     */
    @Override
    public String toString() {
        return "OrderFormData [ingredients = "+this.ingredients+", firstName = "+this.firstName+", lastName = "+this.lastName+", street = "+this.street+", house = "+this.house+", number = "+this.number+", city = "+this.city+", phone = "+this.phone+", price = "+this.price+"]";
    }
}