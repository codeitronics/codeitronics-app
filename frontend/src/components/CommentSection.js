// src/components/CommentSection.js
import React from 'react';

const CommentSection = ({ blogId }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Leave a Reply</h2>
      {/* Add form for new comment */}
      <form className="mt-4">
        <textarea className="w-full p-4 border rounded-md" placeholder="Write your comment here..." />
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
      </form>
      {/* Display existing comments */}
      <div className="mt-8">
        <p>No comments yet.</p>
      </div>
    </div>
  );
};

export default CommentSection;
