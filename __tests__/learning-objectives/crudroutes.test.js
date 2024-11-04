/**
 * Generate tests for learning objective: [get your CRUD routes up and running in your router so that your server listens for requests and serves test/example responses]
 * Workshop context: [Hackathon - Build a Back End
You'll need to write some code to get this application running. Your server will function as an API like we've been building and also serve an HTML page.

You should see a website at http://localhost:3000 when the server is running. A very basic front-end (HTML/CSS/JS) is currently served. Don't change the front end yet. You'll start by building a back end that fits its needs.

Populate
First, using the table below as a guide, get your CRUD routes up and running in your router so that your server listens for requests and serves test/example responses for now.

Remember that you can test your routes with Postman or Thunder Client to ensure they're working.

Requirements table
Method	Path	Additional Info	Result	Response
GET	/api/recipes		all recipes	{ success: Boolean, payload: recipe array }
GET	/api/recipes/:id		recipes with a particular id if it exists	{ success: Boolean, payload: recipe }
POST	/api/recipes	{ body }	create a new recipe	{ success: Boolean, payload: recipe }
PATCH	/api/recipes/:id	{ body }	updated recipe	{ success: Boolean, payload: recipe }
DELETE	/api/recipes/:id		recipe deleted	{ success: Boolean, payload: recipe }
]
 * Success criteria:
 * 1. [get your CRUD routes up and running in your router so that your server listens for requests]
 * 2. [serves test/example responses]
 * Edge cases to consider:
 * - [e.g., what if the user provides an invalid id?]
 * - [e.g., what if the user provides an empty body?]
 * - [e.g., what if the user provides an invalid body?]
 * - [e.g., what if the user provides an invalid path?]
 * - [e.g., what if the user provides an invalid method?]
 * - [e.g., what if the user provides an invalid query?]
 * - [e.g., what if the user provides an invalid payload?]
 * - [e.g., what if the user provides an invalid response?]
 * - [e.g., what if the user provides an invalid status code?]
 * - [e.g., what if the user provides an invalid header?]
 * - [e.g., what if the user provides an invalid parameter?]
 * - [e.g., what if the user provides an invalid argument?]
 * 
 * Test using: [Jest]
 */

import request from 'supertest';
import app from '../../src/app'; // Adjust the path to your Express app

describe('Learning Objective: Get your CRUD routes up and running in your router so that your server listens for requests and serves test/example responses', () => {
  describe('Success Criterion: Get all recipes', () => {
    it('should get all recipes', async () => {
      const response = await request(app).get('/api/recipes');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.payload)).toBe(true);
    });
  });

  describe('Success Criterion: Get recipe by ID', () => {
    it('should get a recipe by ID', async () => {
      const response = await request(app).get('/api/recipes/1');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.payload).toHaveProperty('id', 1);
    });

    it('should return 404 for an invalid ID', async () => {
      const response = await request(app).get('/api/recipes/999');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Success Criterion: Create a new recipe', () => {
    it('should create a new recipe', async () => {
      const newRecipe = { name: 'New Recipe', ingredients: ['ingredient1', 'ingredient2'] };
      const response = await request(app).post('/api/recipes').send(newRecipe);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.payload).toMatchObject(newRecipe);
    });

    it('should return 400 for an invalid payload', async () => {
      const response = await request(app).post('/api/recipes').send({});
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Success Criterion: Update a recipe', () => {
    it('should update a recipe', async () => {
      const updatedRecipe = { name: 'Updated Recipe' };
      const response = await request(app).patch('/api/recipes/1').send(updatedRecipe);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.payload).toMatchObject(updatedRecipe);
    });

    it('should return 400 for an invalid payload', async () => {
      const response = await request(app).patch('/api/recipes/1').send({});
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Success Criterion: Delete a recipe', () => {
    it('should delete a recipe', async () => {
      const response = await request(app).delete('/api/recipes/1');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should return 404 for an invalid ID', async () => {
      const response = await request(app).delete('/api/recipes/999');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});