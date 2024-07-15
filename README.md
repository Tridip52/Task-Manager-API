# Task-Manager-API
Implemented a RESTful API with the following endpoints:

GET /tasks: Retrieve all tasks.
GET /tasks/:id: Retrieve a single task by its ID.
POST /tasks: Create a new task.
PUT /tasks/:id: Update an existing task by its ID.
DELETE /tasks/:id: Delete a task by its ID.

Validations
Used an in-memory data store (e.g., an array) to store the tasks.
Implemented proper error handling for invalid requests and sent appropriate response codes.
Added input validation for task creation and updates. Validated that the title and description are not empty, and that the completion status is a boolean value.


node Version: v20.10.0
npm Version: 10.2.3 
