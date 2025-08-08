/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must match exactly
  const headerRow = ['Cards (cards4)'];

  // Find all cards (li elements)
  const cards = element.querySelectorAll('ul.cmp-image-list > li.cmp-image-list__item');

  // For each card, extract image and text content
  const rows = Array.from(cards).map((li) => {
    const article = li.querySelector('article.cmp-image-list__item-content');
    
    // Image cell: <img> inside .cmp-image-list__item-image-link
    let imgEl = null;
    const imgLink = article.querySelector('.cmp-image-list__item-image-link');
    if (imgLink) {
      imgEl = imgLink.querySelector('img');
    }

    // Text content cell: Title, Description
    const textContent = [];
    // Title: use the text from .cmp-image-list__item-title, style as <strong>
    const titleSpan = article.querySelector('.cmp-image-list__item-title');
    if (titleSpan && titleSpan.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleSpan.textContent.trim();
      textContent.push(strong);
    }
    // Description: .cmp-image-list__item-description
    const desc = article.querySelector('.cmp-image-list__item-description');
    if (desc && desc.textContent.trim()) {
      if (textContent.length > 0) {
        textContent.push(document.createElement('br'));
      }
      textContent.push(desc);
    }
    // Compose the row: [image, [title, description]]
    return [imgEl, textContent];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
