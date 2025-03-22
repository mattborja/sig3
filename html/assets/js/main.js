(function (){
    const $form = $('form#registry-search');
    const $query = $form.find('input');
    const $pre = $('#registry-entry-details pre > code');

    const $modal = new bootstrap.Modal('#registry-entry-details');

    $form.submit(e => {
        e.preventDefault();

        const fpr = $query.val().toUpperCase();
        const src = `dist/${fpr}.json`;

        fetch(src)
            .then(res => {
              if (!res.ok)
                throw res.statusText

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
                
                $pre.html(formatted);
                
                $modal.show();
            })
            .catch(e => {
                alert(e);
            });
    });
})();
