/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the list of cards
  const imageList = element.querySelector('.image-list.list > ul.cmp-image-list');
  if (!imageList) return;

  // Find all immediate card items
  const items = Array.from(imageList.querySelectorAll(':scope > li.cmp-image-list__item'));

  // Build table rows
  const rows = [['Cards (cards8)']];

  items.forEach((item) => {
    // Image cell: use the whole image container for robustness
    const imageContainer = item.querySelector('.cmp-image-list__item-image');
    const imageCell = imageContainer || '';

    // Text cell: title as heading (linked if possible), then description
    let textCell = [];
    const titleLink = item.querySelector('.cmp-image-list__item-title-link');
    const titleEl = item.querySelector('.cmp-image-list__item-title');
    const descEl = item.querySelector('.cmp-image-list__item-description');

    if (titleEl) {
      const heading = document.createElement('h3');
      if (titleLink && titleLink.getAttribute('href')) {
        const a = document.createElement('a');
        a.href = titleLink.getAttribute('href');
        a.textContent = titleEl.textContent;
        heading.appendChild(a);
      } else {
        heading.textContent = titleEl.textContent;
      }
      textCell.push(heading);
    }
    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent;
      textCell.push(p);
    }

    rows.push([imageCell, textCell]);
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
