import { useState, useEffect } from 'react';
import type { Activity, ActivityInput, TrainingType, DietType } from '../../types';
import { formatDisplayDate } from '../../utils/dateUtils';
import './ActivityModal.css';

interface ActivityModalProps {
  dateString: string;
  activity: Activity | null;
  onSave: (date: string, input: ActivityInput) => Promise<Activity | null>;
  onDelete: (date: string) => Promise<boolean>;
  onClose: () => void;
}

export function ActivityModal({ dateString, activity, onSave, onDelete, onClose }: ActivityModalProps) {
  const [trainingType, setTrainingType] = useState<TrainingType>(activity?.training_type || 'none');
  const [diet, setDiet] = useState<DietType>(activity?.diet || null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTrainingType(activity?.training_type || 'none');
    setDiet(activity?.diet || null);
  }, [activity]);

  const handleSave = async () => {
    setSaving(true);
    await onSave(dateString, { training_type: trainingType, diet });
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    setSaving(true);
    await onDelete(dateString);
    setSaving(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h2 className="modal-date">{formatDisplayDate(dateString)}</h2>

        <div className="form-group">
          <label className="form-label">Training Type</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="training"
                value="physical"
                checked={trainingType === 'physical'}
                onChange={() => setTrainingType('physical')}
              />
              <span className="radio-label">Physical Training</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="training"
                value="cardio"
                checked={trainingType === 'cardio'}
                onChange={() => setTrainingType('cardio')}
              />
              <span className="radio-label">Cardio</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="training"
                value="none"
                checked={trainingType === 'none'}
                onChange={() => setTrainingType('none')}
              />
              <span className="radio-label">None</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Diet</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="diet"
                value="good"
                checked={diet === 'good'}
                onChange={() => setDiet('good')}
              />
              <span className="radio-label">Good</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="diet"
                value="bad"
                checked={diet === 'bad'}
                onChange={() => setDiet('bad')}
              />
              <span className="radio-label">Bad</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="diet"
                value=""
                checked={diet === null}
                onChange={() => setDiet(null)}
              />
              <span className="radio-label">Not tracked</span>
            </label>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          {activity && (
            <button className="btn btn--danger" onClick={handleDelete} disabled={saving}>
              Clear Day
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
