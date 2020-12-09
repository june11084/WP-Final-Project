$(document).ready(function () {
    $('button').click(function () {
        alert("yelp reached")
        // Clear before adding in case the user clicks the button twice
        $('#results').empty();

        // Get the search term and location from the input elements
        const searchTerm = $('input[name=search_term]').val();
        const location = $('input[name=location]').val();

        //This API enables cross-origin requests to anywhere
        // This will probably be very confusing for you to understand as to why we need another url in front of the actual url
        // However, browsers like Chrome prevents non-cross-origin requests, so this is a workaround for that
        corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/';

        $.ajax({
            url: corsAnywhereURL + 'https://api.yelp.com/v3/businesses/search',
            dataType: 'json',
            data: {'term': searchTerm, 'location': location},
            method: 'GET',
            headers: {
                'Authorization':'Bearer R2gFPcNg1KkOib427cLS6AoTewOjhyBG25hO02kJA-kg5JG4WUSFQD-w0BP588FkVFpbPliemjEjs_NYXUjDfiBNX_hAmGz78tD47dB0XF39AA99irMsBM1UGfzCX3Yx',
            },
            success: function(data) {
                //console.log(data);
                // Grab the results from the API JSON return
                const totalResults = data.total;
                // If our results are greater than 0, continue
                if (totalResults > 0){
                    // Iterate through the JSON array of 'businesses' returned by the API
                    $.each(data.businesses, function(i, item) {

                        // Store each business's object in a variable
                        const phone = item.display_phone;
                        const image = item.image_url;
                        const name = item.name;
                        const rating = item.rating;
                        const price = item.price;
                        const distance = displayDistance(item.distance);
                        const reviewCount = item.review_count;
                        const address = item.location.address1;
                        const city = item.location.city;
                        const zipcode = item.location.zip_code;
                        const transactions = item.transactions;

                        // Append our result into our page
                        $('#results').append('                    ' +
                            '<div class="card mb-3">\n' +
                            '                        <div class="row no-gutters">\n' +
                            '                            <div class="col-md-4">\n' +
                            `                                <img src="${image}" class="card-img" alt="business-image">\n` +
                            '                            </div>\n' +
                            '                            <div class="col-md-8">\n' +
                            '                                <div class="card-body">\n' +
                            '                                    <div class="row">\n' +
                            '                                        <div class="col-md-9">\n' +
                            `                                            <h3 class="card-title">${name}</h3>\n` +
                            '                                        </div>\n' +
                            '                                        <div class="col-md-3">\n' +
                            `                                            <small class="text-muted">${distance}</small>\n` +
                            '                                            <br>\n' +
                            `                                            <small class="text-success font-weight-bold">${price}</small>\n` +
                            '                                        </div>\n' +
                            '                                    </div>\n' +
                            '                                    <div class="row justify-content-start no-gutters">\n' +
                            '                                        <div class="col-md-5 col-12">\n' +
                            `                                           <div id="rating-${i}"></div>\n` +
                            '                                        </div>\n' +
                            '                                        <div class="col-md-7 col-12">\n' +
                            `                                            <p class="card-text text-muted">${reviewCount} reviews</p>\n` +
                            '                                        </div>\n' +
                            '                                    </div>\n' +
                            `                                    <p class="card-text text-muted">${address} <br>${city}, ${zipcode}</p>\n` +
                            `                                    <p class="card-text text-muted">Phone: ${phone}</p>\n` +
                            `                                      <div id="transaction-${i}"></div>\n` +
                            '                                </div>\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                    </div');
                        ratingGenerator(parseInt(rating), i);
                        transactionGenerator(transactions, i);
                    });
                } else {
                    // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                    $('#results').append('<h5>We discovered no results!</h5>');
                }

            }
        });
    });

    // A function to convert from meters to miles
    function displayDistance(distance) {
        const milesPerMeter = 0.000621371;
        const distanceInMiles= distance * milesPerMeter;
        return distanceInMiles.toFixed(2) + 'mi';
    }

    function ratingGenerator(rating, index) {
        // 5-star rating generated via fa-star from fontAwesome
        for (let i = 0; i < 5; i++) {
            if (i < rating){
                $('#rating-'+index).append('<span class="fa fa-star checked"></span>');
            }
            else{
                $('#rating-'+index).append('<span class="fa fa-star"></span>');
            }
        }
    }

    // A function to generate badge-pill for different transaction information of each business
    function transactionGenerator(transactions, index) {
        for (const transaction of transactions) {
            $('#transaction-'+index).append(`<span class="badge badge-pill badge-primary">${transaction}</span>`);
        }
    }


});