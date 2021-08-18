$(document).ready(function() {

    const postcodeHandler = function() {
        if ($('#address1').val() === '' && $('#address2').val() === '' && $('#address3').val() === '') {
            $('#error-message').html('<div class="alert alert-warning alert-dismissible fade show mb-0" role="alert"><h6 class="my-1">You forgot to enter an address!</h6><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
        }
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent($('#address1').val() + $('#address2').val() + $('#address3').val()) + '&key=AIzaSyCL5RWE56oOU3Xalk9Y_Q3wxn8gz3tzLQw',
            type: 'GET',
            success: function(data) {
                if (data['status'] !== 'OK') {
                    $('#example-modal-label').text('Postcode not found?')
                    $('#modal-message').html('<h5 class="mb-0">No postcode found for that address... Please try again!');
                    if ($('#address1').val() !== '' || $('#address2').val() !== '' || $('#address3').val() !== '') {
                        $('#example-modal').modal();
                    }
                    setTimeout(function() {
                        $('#address1, #address2, #address3').val('');
                        $('#error-message').html('');
                    }, 500);
                }
                $.each(data['results'][0]['address_components'], function(key, value) {
                    if (value['types'][0] === 'postal_code') {
                        $('#example-modal-label').text('Postcode found!')
                        $('#modal-message').html('<h5 class="mb-0">The postcode for that address is: <span>' + value['long_name'] + '</span></h5>')
                    }
                })
                if ($('#address1').val() !== '' || $('#address2').val() !== '' || $('#address3').val() !== '') {
                    $('#example-modal').modal();
                }
                setTimeout(function() {
                    $('#address1, #address2, #address3').val('');
                    $('#error-message').html('');
                }, 500);
            }
        });
    }

    $('#btn-find-postcode').click(postcodeHandler);
    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            postcodeHandler();
        }
    });
});