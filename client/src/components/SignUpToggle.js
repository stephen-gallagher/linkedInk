import React from 'react';

export default function SignUpToggle({ onChange }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" onChange={onChange} />
      <span className="switch" />
    </label>
  );
}
