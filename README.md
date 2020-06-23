# Mealplannr
The Mealplanner app lets users create their own recipes and store them in their individualized mealplans with a corresponding shopping list (for ingredients).

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my backlog
-  **Login:** As a user I can login to the platform so that I can start creating and managing my backlog
-  **Logout:** As a user I can logout from the platform so no one else can modify my information
-  **Create recipe** As a user I can create my own recipes
-  **Save recipe** As a user I can save recipes that I like on the platform
-  **Create mealplan** As a user I can create a mealplan holding recipes from the platform
-  **Delete mealplan** As a user I can delete mealplans that I created
-  **Check shopping list** As a user I can check all the ingredients I need to purchase for cooking recipes of my mealplan

## Backlog

- Rate recipes
- recipe categories
- link Youtube (cooking) videos

<br>

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/home`                   | Navbar, Home                   | public `<Route>`            | Home page                                                     |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | Login/signup form, link to login/signup, login                |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |


</br>

## Components

- LoginPage

- NavBar

- FooterBar

- Home


# Server / Backend


## Models

UserModel

```javascript
{
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
}
```



RecipeModel

```javascript
 {
   title: {type: String, required: true},
   description: {type: String, required: true},
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
   number_of_portions: {type: Number, required: true},
   type: {type: String, required: true, enum: ['breakfast', 'lunch', 'dinner', 'snack']},
   user: {type: Schema.Types.ObjectId,ref:'User'}
 }
```

MealplanModel

```javascript
  title: { type: String, required: true},
  from_date: {type: Date,required: true},
  to_date: {type: Date, required: true},
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
| PATCH       | `/mealplan/:mealplan_id`    | MealplanModel.findByIdAndUpdate | 201         | 404          | Finds and updates specific mealplan |
| GET         | `/mealplan/:mealplan_id/shopping_list/:shopping_list_id`|                | 200     | 404             | Displays the shopping list of a specific mealplan |
| PUT         | `/mealplan/:mealplan_id/shopping_list/:shopping_list_id`|                 | 201    | 404   | Updates shopping list of a specific mealplan   |


<br>


## Links

### GitHub Projects

[Link to GitHub projects](https://github.com/ivanaKrucaj/project-3-client-mealplannr/projects/1) 

### Git

[Client repository Link](https://github.com/ivanaKrucaj/project-3-client-mealplannr)

[Server repository Link](https://github.com/ivanaKrucaj/project-3-server-mealplannr)

[Deployed App Link](#)

### Slides

[Slides Link](#)
