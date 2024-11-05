import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { uploadMedia } from '../../../services/uploadService';

const BlogForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const editor = useRef(null);
  const [isEditMode, setIsEditMode] = useState(isEdit);
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    content: initialData.content || '',
    featureImage: initialData.featureImage || null,
    contentImages: initialData.contentImages || [],
    url: initialData.url || '',
    categories: initialData.categories || '',
    tags: initialData.tags || '',
    authorName: initialData.authorName || 'CodeITronics',
    status: initialData.status || 'Draft',
    date: initialData.date || new Date().toISOString().split('T')[0],
  });
  const [imagePreview, setImagePreview] = useState(initialData.featureImage || null);
  const [contentImageUrls, setContentImageUrls] = useState(initialData.contentImages || []);

  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prevData) => ({ ...prevData, url: slug }));
  }, [formData.title]);

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'featureImage' && files.length) {
      const uploadedUrl = await uploadMedia(files[0], 'blog/featureImages');
      setFormData({ ...formData, featureImage: uploadedUrl });
      setImagePreview(uploadedUrl);
    } else if (name === 'contentImages' && files.length) {
      const uploadedContentImages = await Promise.all(
        Array.from(files).map(file => uploadMedia(file, 'blog/contentImages'))
      );
      setFormData({ ...formData, contentImages: uploadedContentImages });
      setContentImageUrls(uploadedContentImages);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsEditMode(false);
  };
  // Configuration for JoditEditor
  const editorConfig = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    width: 'auto',
    height: '650', // Fixed height for 30 rows equivalent
    minHeight: 100,
    direction: '',
    language: 'auto',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colors: {
        greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
        palette: ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
        full: [
            '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
            '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
            '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
            '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
            '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
            '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
        ]
    },
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 300,
    removeButtons: [],
    disablePlugins: ['pasteStorage'], // Ensuring paste functionality is allowed
    extraButtons: [],
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    clipboard: {
        matchVisual: true, // Preserve visual appearance on paste
    },
    allowPasteFromWord: true, // Allows pasting from Word or other external sources
    askBeforePasteHTML: false, // Disable prompt when pasting HTML
    askBeforePasteFromWord: false, // Disable prompt for pasting from Word
    useSearch: false, // Disables search for cleaner paste experience
    cleanHTML: {
        allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'span', 'a', 'img', 'blockquote'], // Allow list tags
        removeEmptyNodes: false, // Keeps nodes even if empty
    },
    buttons: [
        'source', '|',
        'bold',
        'strikethrough',
        'underline',
        'italic', '|',
        'ul', // Unordered list button
        'ol', // Ordered list button
        'outdent', 'indent', '|',
        'font',
        'fontsize',
        'brush',
        'paragraph', '|',
        'image',
        'video',
        'table',
        'link', '|',
        'align', 'undo', 'redo', '|',
        'hr',
        'eraser',
        'copyformat', '|',
        'symbol',
        'fullsize',
        'print',
        'about'
    ],
    buttonsXS: [
        'bold',
        'image', '|',
        'brush',
        'paragraph', '|',
        'align', '|',
        'undo', 'redo', '|',
        'eraser',
        'dots'
    ],
    toolbarSticky: true, // Keeps the toolbar fixed at the top
    events: {},
    textIcons: false,
  };



  return (
    <div className="relative">
      {!isEditMode && (
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-blue-600 hover:underline"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </button>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Title */}
        <div>
          <label className="font-bold text-sm">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-2 w-full rounded-md border"
            placeholder="Enter blog title"
            disabled={!isEditMode}
          />
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Content Section - 3/4 */}
          <div className="col-span-3">
            <label className="font-bold text-sm">Content</label>
            {isEditMode ? (

      // Apply this config to your JoditEditor component
<JoditEditor ref={editor} config={editorConfig} value={formData.content} onBlur={handleEditorChange} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: formData.content }} className="mt-2 text-gray-700"></div>
            )}
          </div>

          {/* Sidebar Section - 1/4 */}
          <div className="col-span-1 space-y-4">
            
            {/* Feature Image */}
            <div>
              <label className="font-bold text-sm">Feature Image</label>
              <input
                type="file"
                name="featureImage"
                onChange={handleInputChange}
                className="mt-2 w-full"
                disabled={!isEditMode}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Feature Preview" className="mt-4 h-24 rounded-lg" />
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="font-bold text-sm">URL Slug</label>
              <input
                type="text"
                name="url"
                value={formData.url}
                readOnly
                className="mt-2 w-full rounded-md border bg-gray-100"
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-bold text-sm">Category</label>
              <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-md border"
                placeholder="e.g., Web Development"
                disabled={!isEditMode}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="font-bold text-sm">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-md border"
                placeholder="e.g., JavaScript, React"
                disabled={!isEditMode}
              />
            </div>

            {/* Status */}
            <div>
              <label className="font-bold text-sm">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-md border"
                disabled={!isEditMode}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Author Name */}
            <div>
              <label className="font-bold text-sm">Author Name</label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-md border"
                placeholder="Author name"
                disabled={!isEditMode}
              />
            </div>

            {/* Date */}
            <div>
              <label className="font-bold text-sm">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-md border"
                disabled={!isEditMode}
              />
            </div>
          </div>
        </div>

        {/* Content Images */}
        <div>
          <label className="font-bold text-sm">Content Images</label>
          <input
            type="file"
            name="contentImages"
            onChange={handleInputChange}
            multiple
            className="mt-2 w-full"
            disabled={!isEditMode}
          />
          {contentImageUrls.map((url, index) => (
            <div key={index} className="mt-2 flex items-center space-x-2">
              <img src={url} alt="Content" className="h-16 rounded-lg" />
              <a href={url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                Full Image URL
              </a>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {isEditMode && (
          <div className="mt-6 flex gap-x-4">
            <button type="button" className="bg-gray-200 px-3 py-2 rounded-md" onClick={() => setIsEditMode(false)}>
              Cancel
            </button>
            <button type="button" className="bg-yellow-500 text-white px-3 py-2 rounded-md">
              Preview
            </button>
            <button type="submit" className="bg-gray-500 text-white px-3 py-2 rounded-md">
              Save
            </button>
            <button type="submit" className="bg-indigo-600 text-white px-3 py-2 rounded-md">
              Save and Publish
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
