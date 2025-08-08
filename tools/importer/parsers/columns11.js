/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest .aem-Grid that contains the main row of columns in the footer
  const mainGrid = element.querySelector('.aem-Grid.aem-Grid--12');
  if (!mainGrid) return;

  // According to the HTML provided, the main footer columns are:
  // - Logo (.image)
  // - Navigation (.navigation)
  // - Title (.title)
  // - Social buttons (.buildingblock)
  // Only these should be in the columns block. Remaining (separator/text) should be outside.
  const columns = [];
  // The order in the HTML is: image, navigation, title, buildingblock, separator, text
  const selectors = [
    '.image',
    '.navigation',
    '.title',
    '.buildingblock'
  ];
  selectors.forEach(sel => {
    const col = mainGrid.querySelector(sel);
    if (col) columns.push(col);
  });

  if (columns.length === 0) return; // Only build block if columns present

  // Create the block table for Columns (columns11)
  const headerRow = ['Columns (columns11)'];
  const contentRow = columns;
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Find the separator (if present) and copyright text block (after the columns)
  const separator = mainGrid.querySelector('.separator');
  const copyright = mainGrid.querySelector('.text');

  // Replace the element with: columns block, then separator, then copyright (if present)
  // Only append separator/text if they exist
  const nodesToInsert = [block];
  if (separator) nodesToInsert.push(separator);
  if (copyright) nodesToInsert.push(copyright);
  element.replaceWith(...nodesToInsert);
}
