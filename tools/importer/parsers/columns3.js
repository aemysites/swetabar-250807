/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main teaser element
  const cmpTeaser = element.querySelector('.cmp-teaser');
  if (!cmpTeaser) return;

  // Get the two main children: content and image
  const contentCol = cmpTeaser.querySelector('.cmp-teaser__content');
  const imageCol = cmpTeaser.querySelector('.cmp-teaser__image');

  // For columns3 block, we must always have 3 columns in the content row
  // Fill missing columns with empty divs for structure
  const colA = contentCol || document.createElement('div');
  const colB = imageCol || document.createElement('div');
  const colC = document.createElement('div'); // No third column in source, so empty

  // Construct the cells array: first row is header (single column),
  // second row is three columns as required by columns3
  const headerRow = ['Columns (columns3)'];
  const contentRow = [colA, colB, colC];

  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
