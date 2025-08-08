/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.aem-Grid');
  if (!grid) return;

  // Get all direct children (columns)
  const gridChildren = Array.from(grid.children);

  // Only include columns that have actual content (filter out possible empty wrappers)
  // We use the known classes for logo, navigation, search
  const columnOrder = ['image', 'navigation', 'search'];
  const contentRow = columnOrder.map(cls => {
    return gridChildren.find(el => el.classList.contains(cls)) || '';
  });

  // Check at least one column exists
  if (!contentRow.some(Boolean)) return;

  // The header row should be a single cell, exactly as specified
  const headerRow = ['Columns (columns9)'];

  // Build cells: first row is header (one cell), second row is N columns
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
