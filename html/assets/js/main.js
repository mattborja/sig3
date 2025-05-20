/*
 * JSON Syntax Highlighting
 * Copyright (c) 2025 by Absolute Development Inc (https://codepen.io/absolutedevelopment/pen/EpwVzN)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function jsonHighlight(e){return"string"!=typeof e&&(e=JSON.stringify(e,null,"\t")),(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,(function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"}))}

(function (){
    const $form = $('form#registry-search');
    const $query = $form.find('input');
    const $code = $('#registry-entry-details code');

    const $modal = new bootstrap.Modal('#registry-entry-details');

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
      }).then(raw => {
        if (!raw) {
          $serviceDegraded.insertAfter($query);

          return false;
        }

        // Return searchable fields indexed by fingerprint
        engine.idx = raw.trim().split('\n').map(_parseIDXEntry);
      });

    // Core entry search, load, and reporting
    $form.submit(e => {
        e.preventDefault();
        const q = $query.val();

        // Returns array of FPRs found by search criteria
        function _searchRegistry(q, minLength = 4) {
          if (!q || q.length < minLength)
            return [];
          
          // Mode: Key ID (min. length 4) or full fingerprint (hexadecimal characters only)
          if (q.match(/^[0-9A-F]{4,}$/gi)) {
            const idsFound = engine.idx.filter(e => e.fpr.match(q));
            if (idsFound)
              return idsFound;
          }

          const idsFoundByTags = engine.idx.filter(e => e.tags.includes(q));
          if (idsFoundByTags.length)
            return idsFoundByTags;

          const idsFoundByLabel = engine.idx.filter(e => e.label.search(q) > -1);
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
          alert(
            "Multiple entries found!\n\nPlease highlight and copy from the list below, the fingerprint you wish to refine your search with:\n"
            + '- ' + results.map(e => `${e.fpr} (${e.label})`).join("\n- ")
          );

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
                const formatted = JSON.stringify(json, null, 2);
                const highlighted = jsonHighlight(formatted);

                $code.html(highlighted);
                
                $modal.show();
            })
            .catch(e => {
                alert(e);
            });
    });
})();
