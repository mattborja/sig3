/*
 * JSON Syntax Highlighting
 * Copyright (c) 2025 by Absolute Development Inc (https://codepen.io/absolutedevelopment/pen/EpwVzN)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function jsonHighlight(e){return"string"!=typeof e&&(e=JSON.stringify(e,null,"\t")),(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,(function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"}))}

// Source: https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L152, http://ecma-international.org/ecma-262/7.0/#sec-patterns
const REGEX_ESC = /[\\^$.*+?()[\]{}|]/g,
      REGEX_ESC_REGEX = RegExp(REGEX_ESC.source);

// Source: https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L14273
function regexEscape(string) {
  string = string || '';

  return (string && REGEX_ESC_REGEX.test(string))
    ? string.replace(REGEX_ESC, '\\$&')
    : string;
}

function friendlyDate(dt) {
  return (new Date(dt)).toDateString();
}

function renderKeyDetails(json) {
  const FIELD_SORT_ORDER = ['date', 'type', 'comment', 'url', 'artifact'];
  const $targets = $('[data-sig3]');

  $targets.each((i, e) => {
     const $e = $(e).empty(); // Reset
     
     const val = $e.data('sig3');
     const parts = val.split(':');

     const fieldIdNotUnique = val;
     
     if (parts.length === 1) {
        const k = parts[0];
        const v = json[k];
        
        $e.text(v);
        return;
     }
     
     if (parts.length === 2) {
        const mode = parts[0];
        const k = parts[1];
        const v = json[k];
        
        if (mode === 'csv') {
           $e.text(v.join(', '));
           return;
        }

        // Combines .list-group-item rendering with .accordion-flush
        if (mode === 'accordion-fixed') {
          const items = v;

          const $accordion = $e;
          const accordionId = $accordion.attr('id');

          items.forEach((e, i) => {
            const item = items[i];
            const panelId = `accordion-${k}-panel-${i}`;

            const $accordionItem = $('<div />').addClass('accordion-item').appendTo($accordion);
            const $accordionHeader = $('<h2 />').addClass('accordion-header').appendTo($accordionItem);
            const $accordionHeaderButton = $('<button />').addClass('accordion-button collapsed text-uppercase')
                                                          .attr('type', 'button')
                                                          .data('bs-toggle', 'collapse')
                                                          .data('bs-target', `#${panelId}`)
                                                          .attr('aria-expanded', 'false')
                                                          .attr('aria-controls', panelId)
                                                          .text(`Exhibit #${i+1}: ${item.type}`)
                                                          .appendTo($accordionHeader);

            const $accordionPanel = $('<div />').addClass('accordion-collapse collapse')
                                                .attr('id', panelId)
                                                // .data('bs-parent', `#${accordionId}`)
                                                .appendTo($accordionItem);

            // Must be re-invoked if DOM has already loaded Bootstrap bindings
            const $collapse = new bootstrap.Collapse($accordionPanel, { toggle: false });
            $accordionHeaderButton.click(e => {
              $collapse.toggle();
            })
            
            const $accordionPanelBody = $('<div />').addClass('accordion-body')
                                                    .appendTo($accordionPanel);
            
            const $table = $('<table />').addClass('table')
                                         .appendTo($accordionPanelBody);
            const $tbody = $('<tbody />').appendTo($table);

            Object.keys(item).forEach(label => {
              const $tr = $('<tr />').appendTo($tbody);
              const $th = $('<th />').text(label).appendTo($tr);
              const $td = $('<td />').appendTo($tr);

              function _render(label, e) {
                switch (label) {
                  case 'artifact':
                    return $('<pre />').text(e);
                    break;
                  
                  case 'date':
                    return friendlyDate(e);
                    break;
                  
                  case 'url':
                    return $('<a />').attr('target', '_blank').attr('href', e).text(e);
                    break;
  
                  default:
                    return $('<span />').text(e);
                    break;
                }
              }

              // Support value arrays (e.g., url[])
              if (Array.isArray(item[label])) {
                item[label].forEach(e => {
                  $('<div />').html(_render(label, e)).appendTo($td);
                })
              }
              else
              {
                $('<div />').html(_render(label, item[label])).appendTo($td);
              }
            });
          });
        }
        
        if (mode === 'table') {
           const rows = v;
           const cols = rows.map(r => Object.keys(r))
                            .flat()
                            .filter((val, i, stack) => stack.indexOf(val) === i)
                            .sort((a, b) => FIELD_SORT_ORDER.indexOf(a) - FIELD_SORT_ORDER.indexOf(b));
           
           const $table = $e;
           const $thead = $('<thead />').appendTo($table);
           const $theadRow = $('<tr />').appendTo($thead);
           cols.forEach(c => {
              $('<th />').text(c).appendTo($theadRow);
           });

           function _formatTextBlock(val) {
            return $('<pre />')
                    .css('max-width', '400px')
                    .css('max-height', '200px')
                    .css('overflow', 'auto')
                    .css('text-wrap', 'balance')
                    .text(val);
           }
           
           const $tbody = $('<tbody />').appendTo($table);
           v.forEach((e, i) => {
              const $tr = $('<tr />').appendTo($tbody);
              cols.forEach(c => {
                 const $td = $('<td />').appendTo($tr);

                 // Leave column empty if cols list specifies extra properties not set in this row
                 if (!(c in rows[i]))
                    return;

                 const val = rows[i][c];
                 
                 if (c === 'artifact') {
                  _formatTextBlock(val).appendTo($td);

                  return;
                 }

                 if (c === 'url') {
                  if (Array.isArray(val)) {
                    const $ul = $('<ul />').appendTo($td);

                    val.forEach(url => {
                      $li = $('<li />').text(url).appendTo($ul);
                    });

                    return;
                  }

                  if (val.startsWith('data:')) {
                    _formatTextBlock(val).appendTo($td);
                    
                    return;
                  }
                 }
                 
                 // Default
                 $td.text(val);
              })
           });
        }
     }
  });  
}

(function (){
    const $form = $('form#registry-search');
    const $query = $form.find('input');
    const $modalBody = $('#registry-entry-modal .modal-body');

    const $modal = new bootstrap.Modal('#registry-entry-modal');

    const engine = {
      idx: []
    };

    // Format: fingerprint:tags_csv:label
    function _parseIDXEntry(line) {
      const parts = line.trim().split(':', 3);

      if (!parts.length === 3)
        return null;

      return {
        fpr: parts[0],
        tags: parts[1].split(',').map(t => t.trim()),
        label: parts[2]
      };
    }

    // Core entry search, load, and reporting
    $form.submit(e => {
        e.preventDefault();

        const q = $query.val();

        // Returns array of FPRs found by search criteria
        function _searchRegistry(q, minLength = 4) {
          if (!q || q.length < minLength)
            return [];

          const REGEX_Q = new RegExp(regexEscape(q), 'i');
          
          // Mode: Key ID (min. length 4) or full fingerprint (hexadecimal characters only)
          if (q.match(/^[0-9A-F]{4,}$/gi)) {
            const idsFound = engine.idx.filter(e => e.fpr.match(q));
            if (idsFound)
              return idsFound;
          }

          // Case-insensitive matching on any tag
          const idsFoundByTags = engine.idx.filter(e => e.tags.some(t => REGEX_Q.test(t)));
          if (idsFoundByTags.length)
            return idsFoundByTags;

          // Case-insensitive matching on label
          const idsFoundByLabel = engine.idx.filter(e => REGEX_Q.test(e.label));
          if (idsFoundByLabel.length)
            return idsFoundByLabel;

          return [];
        }

        let results = _searchRegistry(q);

        if (!results.length)
        {
          alert('No entry found for your search terms.\n\nPlease modify your query and try again.');
          
          return false;
        }

        if (results.length > 1)
        {
          const resultsModal = new bootstrap.Modal('#results-modal');
          const modalBody = $('#results-modal .modal-body').empty();

          const intro = $('<p><strong>Multiple entries found!</strong></p><p>Please click on the fingerprint you wish to view or refine your search with the UID information from the list below:</p>').appendTo(modalBody);

          const table = $('<table />').addClass('table table-hover table-striped').appendTo(modalBody);
          const thead = $('<thead />').appendTo(table);
          const theadRow = $('<tr><th scope="col">Fingerprint</th><th scope="col">UID</th></tr>').appendTo(thead);

          const tbody = $('<tbody />').addClass('table-group-divider').appendTo(table);

          results.forEach(e => {
            const $fpr = $('<a />').attr('href', `?fpr=${encodeURIComponent(e.fpr)}`)
                                   .text(e.fpr);

            $('<tr />')
              .append(
                $('<td />').append($fpr)
              )
              .append(
                $('<td />').text(e.label)
              )
              .appendTo(tbody);
          });

          resultsModal.show();

          return false;
        }

        const fpr = results[0].fpr;

        fetch(`dist/${fpr.toUpperCase()}.json`)
            .then(res => {
              if (!res.ok)
                throw 'No entry found for your search terms.\n\nPlease modify your query and try again.';

              return res.json();
            })
            .then(json => {
                $modalBody.html(renderKeyDetails(json));
                $modal.show();
            })
            .catch(e => {
                alert(e);
            });
    });

    // Optional registry index to enable fast substring searches across all indexed fingerprints
    const $serviceDegraded = $('<div />').addClass('text-danger text-small my-3')
                                         .html('<strong>Service Degraded.</strong> Some features may be temporarily unavailable.');
    
    fetch('/dist/registry.idx.txt')
      .then(res => {
        if (!res.ok)
        {
          $serviceDegraded.insertAfter($query);
          
          return false;
        }

        return res.text();
      })
      .then(raw => {
        if (!raw) {
          $serviceDegraded.insertAfter($query);

          return false;
        }

        // Return searchable fields indexed by fingerprint
        engine.idx = raw.trim().split('\n').map(_parseIDXEntry);

        // Invoke $form.submit() if valid FPR is requested via hash
        // Depends on engine.idx
        (function (){
          const FPR_REGEX = /(\?|&)fpr=([0-9A-F]+)([A-F0-9]{32}|[A-F0-9]{40}|[A-F0-9]{64})/; 

          const match = window.location.search.match(FPR_REGEX);
          if (!match)
            return;

          $query.val(`${match[2]}${match[3]}`);
          $form.submit();
        })();
      });
})();
