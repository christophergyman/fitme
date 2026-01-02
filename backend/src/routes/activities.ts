import { Router, Request, Response } from 'express';
import { getDatabase } from '../database/init.js';

const router = Router();

interface Activity {
  id: number;
  date: string;
  training_type: 'physical' | 'cardio' | 'none';
  diet: 'good' | 'bad' | null;
  created_at: string;
  updated_at: string;
}

interface ActivityInput {
  training_type?: 'physical' | 'cardio' | 'none';
  diet?: 'good' | 'bad' | null;
}

// GET /api/activities?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/', (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;
    const db = getDatabase();

    let query = 'SELECT * FROM activities';
    const params: string[] = [];

    if (start && end) {
      query += ' WHERE date >= ? AND date <= ?';
      params.push(start as string, end as string);
    }

    query += ' ORDER BY date ASC';

    const activities = db.prepare(query).all(...params) as Activity[];
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:date
router.get('/:date', (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const db = getDatabase();

    const activity = db.prepare('SELECT * FROM activities WHERE date = ?').get(date) as Activity | undefined;

    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// PUT /api/activities/:date
router.put('/:date', (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const { training_type, diet } = req.body as ActivityInput;
    const db = getDatabase();

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      return;
    }

    // Validate training_type
    if (training_type && !['physical', 'cardio', 'none'].includes(training_type)) {
      res.status(400).json({ error: 'Invalid training_type. Use physical, cardio, or none' });
      return;
    }

    // Validate diet
    if (diet !== undefined && diet !== null && !['good', 'bad'].includes(diet)) {
      res.status(400).json({ error: 'Invalid diet. Use good, bad, or null' });
      return;
    }

    // Upsert activity
    const stmt = db.prepare(`
      INSERT INTO activities (date, training_type, diet, updated_at)
      VALUES (?, ?, ?, datetime('now'))
      ON CONFLICT(date) DO UPDATE SET
        training_type = excluded.training_type,
        diet = excluded.diet,
        updated_at = datetime('now')
    `);

    stmt.run(date, training_type || 'none', diet ?? null);

    const activity = db.prepare('SELECT * FROM activities WHERE date = ?').get(date) as Activity;
    res.json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:date
router.delete('/:date', (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const db = getDatabase();

    const result = db.prepare('DELETE FROM activities WHERE date = ?').run(date);

    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
