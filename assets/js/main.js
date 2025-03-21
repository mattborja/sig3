(function (){
    const $form = $('form#registry-search');
    const $query = $form.find('input');

    $form.submit(e => {
        e.preventDefault();

        alert('Function temporarily unavailable. Please try again later.');
    });
})();