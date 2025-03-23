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
      digests: {}
    };

    // Optional digest index to enable fast substring searches across all indexed fingerprints
    fetch('/dist-all.shza256.txt')
      .then(res => {
        if (!res.ok)
        {
          // Append warning
          $('<div />')
            .addClass('text-danger text-small my-3').html('<strong>Service Degraded.</strong> Support for partial fingerprint matching is currently unavailable.')
            .insertAfter($query);
          
          return false;
        }

        return res.text();
      }).then(raw => {
        if (!raw)
          return;

        function _baseFPRValue(f) {
          const matches = f.matchAll(/\/?([0-9A-F]+)\.?/g);
          
          for (const match of matches)
            return match[1];
        }

        engine.digests = Object.fromEntries(raw.trim().split('\n').map(line => line.split(/\s+/)).map(e => [ _baseFPRValue(e[1]), { digest: `sha256:${e[0]}` } ]));
      });

    // Core entry search, load, and reporting
    $form.submit(e => {
        e.preventDefault();
        const q = $query.val();

        function _searchDigests(q, returnInputIfNotFound = true) {
          if (!q)
            return null;

          const sanitized = q.replace(/\s/g, '');
          const regex = new RegExp(`${RegExp.escape(sanitized)}`, 'i');

          const found = Object.keys(engine.digests).filter(k => regex.test(k));

          return found.length ? found[0] : (returnInputIfNotFound ? q : null);
        }

        const fpr = _searchDigests(q);

        if (!fpr)
        {
          alert('No entry found for your search terms.\n\nPlease modify your query and try again.');
          
          return false;
        }

        fetch(`dist/${fpr.toUpperCase()}.json`)
            .then(res => {
              if (!res.ok)
                throw 'No entry found for your search terms.\n\nPlease modify your query and try again.';

              return res.json();
            })
            .then(json => {
                const sorted = {
                  id: json.id,
                  valid: json.valid,
                  status: json.status,
                  source: json.source,
                  ...json
                };

                const formatted = JSON.stringify(sorted, null, 2);
                const highlighted = jsonHighlight(formatted);

                $code.html(highlighted);
                
                $modal.show();
            })
            .catch(e => {
                alert(e);
            });
    });
})();
