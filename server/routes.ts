import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub proxy API to avoid CORS issues and client-side rate limiting
  app.get('/api/github/user/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `GitHub API responded with ${response.status}` 
        });
      }
      
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      return res.status(500).json({ error: 'Failed to fetch GitHub user data' });
    }
  });

  app.get('/api/github/repos/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const sort = req.query.sort || 'updated';
      const perPage = req.query.per_page || 10;
      
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=${sort}&per_page=${perPage}`
      );
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `GitHub API responded with ${response.status}` 
        });
      }
      
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
    }
  });

  // API endpoint for contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      
      // In a real app, you'd store the message or send an email
      // For now, just return success
      console.log('Contact form submission:', { name, email, subject, message });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received successfully!' 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ error: 'Failed to process contact form submission' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
