/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from teaser
  function findFirstImage(teaser) {
    // Find the first img tag inside the teaser
    const img = teaser.querySelector('img');
    return img;
  }

  // Helper to extract text content (title, description, CTA)
  function extractTextContent(teaser) {
    // Use a fragment to collect references to existing nodes
    const fragment = document.createDocumentFragment();
    // Title
    const title = teaser.querySelector('.cmp-teaser__title');
    if (title) {
      fragment.appendChild(title);
    }
    // Description
    const desc = teaser.querySelector('.cmp-teaser__description');
    if (desc) {
      fragment.appendChild(desc);
    }
    // CTA(s)
    const actions = teaser.querySelector('.cmp-teaser__action-container');
    if (actions) {
      Array.from(actions.children).forEach((cta) => {
        fragment.appendChild(cta);
      });
    }
    // If nothing extracted, return empty string
    return fragment.childNodes.length > 0 ? fragment : '';
  }

  // 1. Find the cmp-carousel inside the block
  const cmpCarousel = element.querySelector('.cmp-carousel');
  if (!cmpCarousel) return;
  // 2. Find all carousel items
  const items = cmpCarousel.querySelectorAll('.cmp-carousel__item');

  // 3. Build the table rows
  const rows = [];
  // Header row as required exactly in example
  rows.push(['Carousel (carousel2)']);

  items.forEach((item) => {
    // Each slide contains a .cmp-teaser (or similar)
    const teaser = item.querySelector('.cmp-teaser');
    if (!teaser) return; // skip if missing
    // Get the image (should always be present per spec)
    const img = findFirstImage(teaser);
    // If there is no image, skip this slide as per block requirements
    if (!img) return;
    // Get text content (may be empty)
    const textContent = extractTextContent(teaser);
    // Each slide: image in first cell, text (fragment) in second cell
    rows.push([img, textContent]);
  });

  // 4. Create the block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
