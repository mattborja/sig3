/*
 * JSON Syntax Highlighting
 * Copyright (c) 2025 by Absolute Development Inc (https://codepen.io/absolutedevelopment/pen/EpwVzN)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function jsonHighlight(e){return"string"!=typeof e&&(e=JSON.stringify(e,null,"\t")),(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,(function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"}))}

function renderKeyDetails(json) {
  const $targets = $('[data-sig3]');

  $targets.each((i, e) => {
     const $e = $(e).empty(); // Reset
     
     const val = $e.data('sig3');
     const parts = val.split(':');
     
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
        
        if (mode === 'table') {
           const rows = v;
           const cols = rows.map(r => Object.keys(r))
                            .flat()
                            .filter((val, i, stack) => stack.indexOf(val) === i)
                            .sort((a, b) => {
                               const order = ['date', 'type', 'comment', 'url', 'artifact'];
                               
                               return order.indexOf(a) - order.indexOf(b);
                             });
           
           const $table = $('<table />').addClass('table table-sm').appendTo($e);
           
           const $thead = $('<thead />').appendTo($table);
           const $theadRow = $('<tr />').appendTo($thead);
           cols.forEach(c => {
              $('<th />').text(c).appendTo($theadRow);
           });
           
           const $tbody = $('<tbody />').appendTo($table);
           v.forEach((e, i) => {
              const $tr = $('<tr />').appendTo($tbody);
              cols.forEach(c => {
                 const $td = $('<td />').appendTo($tr);
                 const val = rows[i][c];
                 const blockMode = (c === 'artifact') || (c === 'url' && !!val && val.startsWith('data:'));
                 
                 if (blockMode) {
                    const $div = $('<pre />').css('max-width', '400px').css('max-height', '200px').css('overflow', 'auto').css('text-wrap', 'balance').text(val).appendTo($td);
                    return;
                 }
                 
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
          const resultsModal = new bootstrap.Modal('#results-modal');
          const modalBody = $('#results-modal .modal-body').empty();

          const intro = $('<p><strong>Multiple entries found!</strong></p><p>Please highlight and copy a fingerprint or UID from the list below to refine your search with:</p>').appendTo(modalBody);

          const table = $('<table />').addClass('table table-hover table-striped').appendTo(modalBody);
          const thead = $('<thead />').appendTo(table);
          const theadRow = $('<tr><th scope="col">Fingerprint</th><th scope="col">UID</th></tr>').appendTo(thead);

          const tbody = $('<tbody />').addClass('table-group-divider').appendTo(table);

          results.forEach(e => {
            $('<tr />')
              .append(
                $('<td />').text(e.fpr)
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
                // TODO: Update schema to meet rendering requirements (e.g., uid, email_sha256, etc.)
                // Example: const json = {"status":{"schema":{"valid":true,"errors":[]},"keyVersion":{"valid":true,"meta":{"ver":4,"deprecated":false},"errors":[]},"filename":{"valid":true,"errors":[]}},"valid":true,"source":{"fingerprint":"99BB608E30380C451952D6BBA1C7E813F160A407","uid":"Matt Borja","email_sha256":"sha256(email)","refs":[{"date":"2024-11-27","comment":"Signed artifact demonstrating private key use: `echo -n '3ED3 3CCE 4BED 165C 9107 3D9F 65B8 8DAC 23AF 5BCD E520 F723 C1E6 2A69 B369 F278' | gpg --clearsign --local-user D41A83E1C6B701619D0D812FC3F69D1BE6BCBD16`","artifact":"-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA512\n\n3ED3 3CCE 4BED 165C 9107 3D9F 65B8 8DAC 23AF 5BCD E520 F723 C1E6 2A69 B369 F278\n-----BEGIN PGP SIGNATURE-----\n\niHUEARYKAB0WIQTUGoPhxrcBYZ0NgS/D9p0b5ry9FgUCZ0dD0AAKCRDD9p0b5ry9\nFvonAQCHwAHRduopWn8I534GNRXQ0+dX5JO2ztnFxnlwZd+NMAD/Wr0NWLEc+eCf\nQm2UHkDp8lKswj6kXxTi9GI3elvpQgE=\n=L95q\n-----END PGP SIGNATURE-----\n","type":"key"},{"date":"2024-10-06","comment":"Cross-signed (sig 3) by own previous key F30FF4FC936584574EE3251833688C2EDC08CD38","type":"user","url":"data:text/gpg;base64,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O0fn"},{"date":"2025-03-07","comment":"Self-attestation of own key under GitHub vigilant mode: 1) B5690EEEBB952194 is signing this commit via GitHub web interface, 2) commit author is authenticated as GitHub user @mattborja, AND 2) commit author affirms ownership of this selfsame key (A1C7E813F160A407)","type":"user","url":"https://github.com/mattborja/identity/commit/bf06562979a0eb3ef5a9da8d92edb8c7dd886ec7"},{"date":"2025-03-07","comment":"Backward claim of signed commit under GitHub vigilant mode: 1) C3F69D1BE6BCBD16 (signing subkey of A1C7E813F160A407) is signing this commit via command line Git, 2) commit author is SSH authenticated as GitHub user @mattborja, AND 2) commit author affirms ownership of the selfsame commit ID (https://github.com/mattborja/identity/commit/bf06562979a0eb3ef5a9da8d92edb8c7dd886ec7)","type":"user","url":"https://github.com/mattborja/identity/pull/46/commits/3bfb7244b68846bed074e9fbc78faefd1a839fda"},{"date":"2025-01-17","comment":"Listed on LinkedIn profile as Download Public PGP Key link","type":"user","url":"https://www.linkedin.com/in/mattborja"},{"date":"2025-01-17","comment":"LinkedIn profile showing identity verification by CLEAR using government ID","type":"user","url":"https://www.linkedin.com/help/linkedin/answer/a1359065"},{"date":"2025-01-01","comment":"Industry certification requiring strong identity verification during proctored high stakes exam with Global Information Assurance Certification (https://www.giac.org/knowledge-base/proctor/)","type":"csp","url":"https://www.credly.com/badges/c0ee1538-53dd-43a0-bf9e-7724e374ff43"},{"date":"2025-01-01","comment":"Credly profile showing both user photo and industry certification with link to ORCiD profile (https://orcid.org/0009-0008-5528-9362)","type":"user","url":"https://www.credly.com/users/mattborja"},{"date":"2025-01-01","comment":"ORCiD profile referenced by Credly profile listing verified email domains, websites, social links, and GPG fingerprints in Keywords section using Uniform Resource Name format: urn:identity:gpg:<fingerprint>","type":"user","url":"https://orcid.org/0009-0008-5528-9362"}],"tags":["SIG3"]},"id":"A1C7E813F160A407","version":4,"deprecated":false,"@timestamp":"2025-05-24T18:32:53.276Z","@level":"INFO","@message":"A1C7E813F160A407 successfully validated!"};

                $modalBody.html(renderKeyDetails(json));
                $modal.show();
            })
            .catch(e => {
                alert(e);
            });
    });
})();
