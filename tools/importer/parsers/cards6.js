/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must have two columns: block name and empty cell
  const headerRow = ['Cards (cards6)', ''];
  const cells = [headerRow];

  // Find all card items in the list
  const items = element.querySelectorAll('ul.cmp-image-list > li.cmp-image-list__item');

  items.forEach((item) => {
    // First cell: image (use the clickable image link for accessibility)
    const imageLink = item.querySelector('.cmp-image-list__item-image-link');
    const firstCell = imageLink || '';

    // Second cell: text content
    const textParts = [];
    // Title as heading
    const titleLink = item.querySelector('.cmp-image-list__item-title-link');
    if (titleLink) {
      const h3 = document.createElement('h3');
      h3.appendChild(titleLink);
      textParts.push(h3);
    }
    // Description
    const desc = item.querySelector('.cmp-image-list__item-description');
    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textParts.push(p);
    }
    cells.push([firstCell, textParts]);
  });

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
