# SBA 318: Express Server Application

## Introduction
Here I have created a Jokes RESTful API as an assessment that measures my understanding of Node and Express and my capability to implement their features in a practical manner

## Objectives
For this project, I developed a _RESTful API_ server application using Node and Express. The implementation incorporates third-party middlewares from Express, employs a template engine for rendering views, and enhances interactivity by integrating a self-made API through HTML forms.

## Implementation:

Welcome to Joke Api: Feel free to explore all routes

 Home page:  
        <code>GET <a href="http://localhost:3000">/</a></code></br>
        Access API route: 
        <code>GET <a href="http://localhost:3000/api" target="_blank">/api</a></code></br>
        <hr>
        Explore (Read) users: 
        <code>GET <a href="http://localhost:3000/api/users" target="_blank">/api/users</a></code></br>
        Create a user: 
        POST /api/users</br>
        Get user by id: 
        <code>GET <a href="http://localhost:3000/api/users/:id" target="_blank">/api/users/:id</a></code></br>
        Update user by id: 
        PATCH /api/users/:id</br>
        Delete user by id: 
        DELETE /api/users/:id</br>
        Retrieves all jokes by a user with the specified id: 
        <code>GET <a href="http://localhost:3000/api/users/:id/jokes" target="_blank">/api/users/:id/jokes</a></code> <br>

Explore (Read) Jokes: 
        <code>GET <a href="http://localhost:3000/api/jokes" target="_blank">/api/jokes</a></code></br>
        Create a joke: 
        POST /api/jokes</br>
        Read a joke by id: 
        <code>GET <a href="http://localhost:3000/api/jokes/:id" target="_blank">/api/jokes/:id</a></code></br>
        Update a joke: 
        PATCH /api/jokes/:id</br>
        Delete a joke
        DELETE /api/jokes/:id</br>
        </code>
        Retrieve all jokes by a user with the specified userId:
        <code>GET <a href="http://localhost:3000/api/jokes?userId={VALUE}" target="_blank">/api/jokes?userId={VALUE}</a></code>
        <hr>
        GET <code><a href="http://localhost:3000/api/comments">/comments</a></code> <br>
        POST /comments <br>
        <code>GET <a href="http://localhost:3000/api/comments/:id" target="_blank">/api/comments/:id</a></code></br>
        Update a comment: 
        PATCH /api/comments/:id</br>
        Delete a comment
        DELETE /api/comments/:id</br>

Thank you for your time. I hope these jokes bring a smile to your face!
