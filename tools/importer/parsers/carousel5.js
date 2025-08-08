/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column
  const headerRow = ['Carousel (carousel5)'];

  // Slide row: two columns
  // 1. Image column
  let imageEl = '';
  const img = element.querySelector('.cmp-teaser__image img');
  if (img) imageEl = img;

  // 2. Text column: title, desc, cta
  const textContent = [];
  const content = element.querySelector('.cmp-teaser__content');
  if (content) {
    const title = content.querySelector('.cmp-teaser__title');
    if (title) textContent.push(title);
    const desc = content.querySelector('.cmp-teaser__description');
    if (desc) textContent.push(desc);
    const ctas = content.querySelectorAll('.cmp-teaser__action-link');
    ctas.forEach(cta => textContent.push(cta));
  }

  // Table structure:
  // First row: header (1 column)
  // Second row: [image, text] (2 columns)
  // This is allowed per the block definition/example, as the first row is a header row
  const tableRows = [
    headerRow,
    [imageEl, textContent.length ? textContent : '']
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
