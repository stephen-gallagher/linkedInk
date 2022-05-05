import { useState } from 'react';

export default function UserDashboardButtons({
  setShowComponent,
  backgroundColor,
  setBackgroundColor,
}) {
  const [backgroundEditor, setBackgroundEditor] = useState(false);

  return (
    <div className="d-flex flex-column">
      <button
        onClick={() => setShowComponent('userAppointments')}
        className="btn btn-primary mb-3"
      >
        {' '}
        Appointments
      </button>
      <button
        onClick={() => setShowComponent('userCollections')}
        className="btn btn-primary mb-3"
      >
        {' '}
        Collections
      </button>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowComponent('editDashboard')}
      >
        Edit dashboard
      </button>
      {!backgroundEditor && (
        <button
          className="btn btn-primary"
          onClick={() => setBackgroundEditor(true)}
        >
          {' '}
          Profile Color
        </button>
      )}
      {backgroundEditor && (
        <div>
          <input
            className="form-control"
            style={{ width: '150px' }}
            type="text"
            name="color"
            value={backgroundColor}
            required
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => setBackgroundEditor(false)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
