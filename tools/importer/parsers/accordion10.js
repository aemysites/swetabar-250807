/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion block
  // The main accordion might be nested deep inside the provided `element`
  const accordionBlock = element.querySelector('.cmp-accordion');
  if (!accordionBlock) return;

  // Extract all accordion items
  const items = Array.from(accordionBlock.querySelectorAll('.cmp-accordion__item'));
  if (items.length === 0) return;

  // Start the block table with the correct header
  const rows = [['Accordion']];

  items.forEach((item) => {
    // Title cell: use the .cmp-accordion__title span content as plain text
    let titleSpan = item.querySelector('.cmp-accordion__title');
    let titleCell = titleSpan ? titleSpan.textContent.trim() : '';

    // Content cell: the .cmp-accordion__panel, possibly with containers/grids
    let panel = item.querySelector('.cmp-accordion__panel');
    let contentCell = '';
    if (panel) {
      // Look for all descendant .cmp-container nodes (usually only one per panel)
      const containers = panel.querySelectorAll('.cmp-container');
      let contentEls = [];
      if (containers.length > 0) {
        containers.forEach((container) => {
          // Put all non-.cmp-container children in the output cell
          Array.from(container.children).forEach((child) => {
            // Only add if not another .cmp-container
            if (!child.classList.contains('cmp-container')) {
              contentEls.push(child);
            }
          });
        });
      } else {
        // Fallback: if no containers, use all children of .cmp-accordion__panel
        contentEls = Array.from(panel.children);
      }
      if (contentEls.length === 1) {
        contentCell = contentEls[0];
      } else if (contentEls.length > 1) {
        contentCell = contentEls;
      } else {
        contentCell = '';
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Replace the accordion block with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordionBlock.replaceWith(table);
}
