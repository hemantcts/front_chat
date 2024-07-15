import React, { useState } from 'react';

const NameModal = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-content">
        <input
          type="text" id="name" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NameModal;
