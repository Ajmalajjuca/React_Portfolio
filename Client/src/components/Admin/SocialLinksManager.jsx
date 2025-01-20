import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SocialLinksManager = ({ initialLinks = {}, onChange }) => {
  const [links, setLinks] = useState(
    Object.entries(initialLinks).map(([platform, url]) => ({
      platform,
      url
    })) || []
  );

  const addNewLink = () => {
    setLinks([...links, { platform: '', url: '' }]);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, idx) => idx !== index);
    setLinks(updatedLinks);
    
    // Convert to object format and trigger onChange
    const linksObject = updatedLinks.reduce((acc, { platform, url }) => {
      if (platform) acc[platform.toLowerCase()] = url;
      return acc;
    }, {});
    onChange(linksObject);
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = links.map((link, idx) => {
      if (idx === index) {
        return { ...link, [field]: value };
      }
      return link;
    });
    setLinks(updatedLinks);
    
    // Convert to object format and trigger onChange
    const linksObject = updatedLinks.reduce((acc, { platform, url }) => {
      if (platform) acc[platform.toLowerCase()] = url;
      return acc;
    }, {});
    onChange(linksObject);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
        <button
          onClick={addNewLink}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Link
        </button>
      </div>

      <div className="space-y-3">
        {links.map((link, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Platform (e.g., Twitter, LinkedIn)"
                value={link.platform}
                onChange={(e) => updateLink(index, 'platform', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="url"
                placeholder="https://"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => removeLink(index)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove link"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {links.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No social links added. Click "Add Link" to get started.
        </p>
      )}
    </div>
  );
};

export default SocialLinksManager;