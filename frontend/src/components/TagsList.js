// src/components/TagsList.js
import React from 'react';
import { Link } from 'react-router-dom';

const TagsList = () => {
  // Placeholder tags, replace with data fetching logic
  const tags = ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Tags</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link
            key={index}
            to={`/tags/${tag.toLowerCase()}`}
            className="text-blue-500 hover:underline bg-gray-200 px-2 py-1 rounded"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsList;
