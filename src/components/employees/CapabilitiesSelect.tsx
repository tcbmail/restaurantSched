import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const CapabilitiesSelect = () => {
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [newCapability, setNewCapability] = useState('');

  const addCapability = () => {
    if (newCapability && !capabilities.includes(newCapability)) {
      setCapabilities([...capabilities, newCapability]);
      setNewCapability('');
    }
  };

  const removeCapability = (capability: string) => {
    setCapabilities(capabilities.filter(c => c !== capability));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Add capability (e.g., Bartending, Grill, Host)"
          value={newCapability}
          onChange={(e) => setNewCapability(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addCapability()}
        />
        <button
          type="button"
          onClick={addCapability}
          className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {capabilities.map((capability) => (
          <span
            key={capability}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
          >
            {capability}
            <button
              type="button"
              onClick={() => removeCapability(capability)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CapabilitiesSelect;