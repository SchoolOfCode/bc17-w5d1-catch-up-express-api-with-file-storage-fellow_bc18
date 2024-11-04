/**
 * Generate tests for learning objective: Populate CRUD routes for recipes API
 * Workshop context: Setting up server routes to handle CRUD operations for recipes
 * Success criteria:
 * 1. Implement GET /api/recipes to return all recipes
 * 2. Implement GET /api/recipes/:id to return a recipe by ID
 * 3. Implement POST /api/recipes to create a new recipe
 * 4. Implement PATCH /api/recipes/:id to update a recipe by ID
 * 5. Implement DELETE /api/recipes/:id to delete a recipe by ID
 * Edge cases to consider:
 * - Non-existent recipe IDs
 * - Invalid request bodies
 * - Empty recipe list
 * 
 * Test using: Jest and Supertest
 * Additional dependencies: supertest
 */

import request from 'supertest';
import app from '../../app';

describe('Learning Objective: Populate CRUD routes for recipes API', () => {
  describe('Success Criterion: Implement GET /api/recipes', () => {
	it('should return all recipes', async () => {
	  const response = await request(app).get('/api/recipes');
	  expect(response.status).toBe(200);
	  expect(response.body.success).toBe(true);
	  expect(Array.isArray(response.body.payload)).toBe(true);
	});
  });

  describe('Success Criterion: Implement GET /api/recipes/:id', () => {
	it('should return a recipe by ID', async () => {
	  const response = await request(app).get('/api/recipes/1');
	  expect(response.status).toBe(200);
	  expect(response.body.success).toBe(true);
	  expect(response.body.payload).toHaveProperty('id', 1);
	});

	it('should return 404 for non-existent recipe ID', async () => {
	  const response = await request(app).get('/api/recipes/999');
	  expect(response.status).toBe(404);
	  expect(response.body.success).toBe(false);
	});
  });

  describe('Success Criterion: Implement POST /api/recipes', () => {
	it('should create a new recipe', async () => {
	  const newRecipe = { name: 'Test Recipe', ingredients: ['ingredient1', 'ingredient2'] };
	  const response = await request(app).post('/api/recipes').send(newRecipe);
	  expect(response.status).toBe(201);
	  expect(response.body.success).toBe(true);
	  expect(response.body.payload).toMatchObject(newRecipe);
	});

	it('should return 400 for invalid request body', async () => {
	  const response = await request(app).post('/api/recipes').send({});
	  expect(response.status).toBe(400);
	  expect(response.body.success).toBe(false);
	});
  });

  describe('Success Criterion: Implement PATCH /api/recipes/:id', () => {
	it('should update a recipe by ID', async () => {
	  const updatedRecipe = { name: 'Updated Recipe' };
	  const response = await request(app).patch('/api/recipes/1').send(updatedRecipe);
	  expect(response.status).toBe(200);
	  expect(response.body.success).toBe(true);
	  expect(response.body.payload).toMatchObject(updatedRecipe);
	});

	it('should return 404 for non-existent recipe ID', async () => {
	  const response = await request(app).patch('/api/recipes/999').send({ name: 'Non-existent' });
	  expect(response.status).toBe(404);
	  expect(response.body.success).toBe(false);
	});
  });

  describe('Success Criterion: Implement DELETE /api/recipes/:id', () => {
	it('should delete a recipe by ID', async () => {
	  const response = await request(app).delete('/api/recipes/1');
	  expect(response.status).toBe(200);
	  expect(response.body.success).toBe(true);
	});

	it('should return 404 for non-existent recipe ID', async () => {
	  const response = await request(app).delete('/api/recipes/999');
	  expect(response.status).toBe(404);
	  expect(response.body.success).toBe(false);
	});
  });
});