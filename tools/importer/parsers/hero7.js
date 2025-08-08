/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Hero'];

  // Extract the image (background image)
  let imageEl = null;
  const teaserImageDiv = element.querySelector('.cmp-teaser__image');
  if (teaserImageDiv) {
    const img = teaserImageDiv.querySelector('img');
    if (img) {
      imageEl = img;
    }
  }

  // Extract the content (title and description)
  const contentDiv = element.querySelector('.cmp-teaser__content');
  const contentNodes = [];
  if (contentDiv) {
    // Title
    const titleEl = contentDiv.querySelector('.cmp-teaser__title');
    if (titleEl) contentNodes.push(titleEl);
    // Description: May contain child nodes (like <p>)
    const descDiv = contentDiv.querySelector('.cmp-teaser__description');
    if (descDiv) {
      Array.from(descDiv.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE || child.nodeType === Node.TEXT_NODE) {
          contentNodes.push(child);
        }
      });
    }
  }

  const tableRows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentNodes.length > 0 ? contentNodes : '']
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
