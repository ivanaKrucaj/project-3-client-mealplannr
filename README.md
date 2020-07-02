# Mealplannr
The Mealplanner app lets users create their own recipes and store them in their personalized mealplans with a corresponding shopping list (for ingredients).

## User Stories

-  **Signup:** As an anon I can sign up in the platform so that I can start creating and managing recipes and mealplans
-  **Login:** As a user I can login to the platform so that I can start creating and managing recipes and mealplans
-  **Logout:** As a user I can logout from the platform so no one else can modify my information
-  **Create recipe** As a user I can create my own recipes
-  **Submit recipe** As a user I can save recipes that I like on the platform
-  **Filter recipes** As a user I can filter through all the recipes provided by all users
-  **Edit recipes** As a user I can edit the recipes that I have created
-  **Check recipe details** As a user I can check a recipe's details: it's method, nutrition facts and ingredients
-  **Filter recipes** As a user I can filter through all the recipes provided by all users
-  **Save meal plan** As a user I can add recipes to the mealplan basket and save them under a specific meal plan name that I give
-  **Check meal plan details** As a user I can check a meal plan's details: its shopping list for all ingredients to purchase, and the recipes included
-  **Filter meal plans** As a user I can filter through all the meal plans that I have created
-  **Delete meal plan** As a user I can delete mealplans that I created
-  **Check my recipes** As a user I can check all the recipes that I have created

## Backlog

- Rate recipes
- recipe categories
- link Youtube (cooking) videos

<br>

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/home`                   | Header, Recipes                | public      | Home page                                                    |
| `/login`                  | LoginPage                      | anon only   | Login/signup form, link to login/signup, login               |
| `/logout`                 | n/a                            | user only   | Navigate to login after logout, expire session               |
| `/recipe/:recipe_id`      | Recipe                         | public      | Displays recipe details                                      |
| `/mealplan-basket`        | MealplanBasket                 | user only   | Displays recipes that are about to be stored inside a meal plan|
| `/create-recipe`          | CreateRecipe                   | user only   | Create a recipe page                                         |
| `/edit-recipe/:recipe_id` | UpdateRecipe                   | user only   | Edit a recipe created by user                                |
| `/my-recipes`             | MyRecipes                      | user only   | Displays all recipes created by user                         |
| `/mealplans`              | AllMealplans                   | user only   | Displays all meal plans by user                              |
| `/mealplan/:mealplan_id`  | MealplanDetails                | user only   | Displays meal plan details: shopping list and recipes        |


</br>

## Components

- Login

- Signup

- Logout

- Navbar

- Header

- Recipes

- Footer

- FilterRecipes

- AllMealplans

- CreateRecipe

- Recipe

- MealplanBasket

- MealplanDetails

- UpdateRecipe

- MyRecipes


# Server / Backend


## Models

UserModel

```javascript
{
  userName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
}
```


RecipeModel

```javascript
 {
   title: {type: String, required: true},
   image: {type: String, required: true},
   steps: {type: String, required: true},
   ingredients: {type: [
               { id: String,
                quantity: Number,
                quantity_unit: String,
                quantity_in_grams: Number,
                title: String,
                calories: Number,
                carbs: Number,
                fat: Number,
                protein: Number}
                ], 
                required: true
    },
   ingredientText: {type: String, required: true}
   number_of_portions: {type: Number, required: true},
   type: {type: String, required: true, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']},
   user: {type: Schema.Types.ObjectId, ref: 'User'}
 }
```


MealplanModel

```javascript
  title: { type: String, required: true},
  recipes: {type: Schema.Types.ObjectId, ref: 'Recipe'},
  shoppingList: {type: [{
               title: String,
               quantity_in_grams: String,
               bought: Boolean
           }
         ]
   },
   user: {type: Schema.Types.ObjectId, ref: 'User'}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/recipes    `              | [RecipeModel]                | 200            | 500          | Returns profile page           |
| GET         | `/recipe/:recipe_id`        | RecipeModel.findById()       | 200            | 404          | Displays specific recipe |
| POST        | `/signin`                   | {firstname, password}        | 200            | 401          | Forwards user to the  whatever component they clicked on   |
| POST        | `/logout`                   | (empty)                      | 204            | 400          | Logs out the user   |
| POST        | `/recipe`                   | RecipeModel.create()        |  201            | 400          | Adds new recipe to RecipeModel |
| PUT         | `/recipe/:recipe_id`        | RecipeModel.findByIdAndUpdate() | 201         | 404          | Displays and update recipe   |
| DELETE      | `/recipe/recipe_id`         | RecipeModel.findByIdAndDelete()| 200          | 404          | Deletes specific recipe        |
| GET         | `/mealplans`                | MealplanModel.find()          | 200           | 404          | Displays mealplans     |
| GET         | `/mealplan/:mealplan_id`    | MealplanModel.findById()     | 200            | 404          | Show specific mealplan |
| POST        | `/mealplan`                 | MealplanModel.create()       | 201            | 404          | Adds new mealplan to MealplanModel |
| DELETE      | `/mealplan/:mealplan_id`    | MealplanModel.findByIdAndDelete() | 200       | 404          | deletes specific mealplan          |
| GET         | `/mealplan/:mealplan_id/shopping_list/:shopping_list_id`| MealplanModel.findById()| 200 | 404 | Displays the shopping list of a specific mealplan |
| PUT         | `/mealplan/:mealplan_id/shopping_list/:shopping_list_id`| MealplanModel.findByIdAndUpdate()| 201 | 404 | Updates shopping list (checks boxes) of a specific mealplan   |


<br>


## Links

### GitHub Projects

[Link to GitHub projects](https://github.com/ivanaKrucaj/project-3-client-mealplannr/projects/1) 

### Git

[Client repository Link](https://github.com/ivanaKrucaj/project-3-client-mealplannr)

[Server repository Link](https://github.com/ivanaKrucaj/project-3-server-mealplannr)

[Deployed App Link](https://mealplannr.herokuapp.com/home)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1En3QaHptJI5fpgQEdvJj4lYvEDzZztTBlsQbKVWNHVQ/edit#slide=id.p)
