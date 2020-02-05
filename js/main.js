document.onload = llamdas();

var selectOption = "";

function llamdas() {
    inptutAddEvents();
    getMarvelData();
}

function inptutAddEvents() {
    $('#characterOpt').click(function () {
        selectOption = 'characters';
    });

    $('#comicOpt').click(function () {
        selectOption = 'comics';
    });

    $('#searchInp').change(filteredSearch);
}

function getMarvelData() {

    var dataCharacter = [];
    $.ajax({
        url: 'https://gateway.marvel.com:443/v1/public/characters?apikey=9fb583ddab8f0da73c341063826d73d5',
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function () {
            $('#spinner1').show();
        },
        complete: function(){
            $('#spinner1').hide();
        },
        success: function (response) {
            dataCharacter = response.data;

            var dataLen = dataCharacter.results.length;
            var listCharacter = dataCharacter.results;

            for (var index = 0; index < dataLen; index++) {
                var divCol = $('<div class="col mb-4"></div>');
                var divCard = $('<div class="card" style="width: 18rem; height: 25rem"></div');
                var pathImg = listCharacter[index].thumbnail.path + '.' + listCharacter[index].thumbnail.extension;
                var imgCard = $("<img src=" + pathImg + " class='card-img-top'>");
                var divCBody = $('<div class="card-body"><h4 class="card-title">' + listCharacter[index].name + '</h4></div>');
                divCard.append(imgCard).append(divCBody);
                divCol.append(divCard);
                $('#dataContent').append(divCol);
            };
        }
    });
}

function filteredSearch() {

    var input = $('#searchInp').val();
    var urlSearch = "";

    switch (selectOption) {
        case 'characters':
            urlSearch = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + input + '&apikey=9fb583ddab8f0da73c341063826d73d5';
            break;
        case 'comics':
            urlSearch = 'https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=' + input + '&apikey=9fb583ddab8f0da73c341063826d73d5';
            break;
    }

    var dataSerach = [];
    var list;
    var listLenght;
    $.ajax({
        url: urlSearch,
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function () {
            $('#spinner2').show();
        },
        complete: function(){
            $('#spinner2').hide();
        },
        success: function (response) {
            $('#filteredContent').empty();
            dataSerach = response.data;

            var dataLen = dataSerach.results.length;
            var listFiltered = dataSerach.results;
            if (selectOption == 'characters') {
                for (var index = 0; index < dataLen; index++) {
                    var divCol = $('<div class="col mb-4"></div>');
                    var divCard = $('<div class="card" style="width: 10rem height: 18rem"></div');
                    var pathImg = listFiltered[index].thumbnail.path + '.' + listFiltered[index].thumbnail.extension;
                    var imgCard = $("<img src=" + pathImg + " class='card-img-top'>");
                    var divCBody = $('<div class="card-body"><h4 class="card-title">' + listFiltered[index].name + '</h4></div>');
                    divCard.append(imgCard).append(divCBody);
                    divCol.append(divCard);
                    $('#filteredContent').append(divCol);
                };
            } else {
                for (var index = 0; index < dataLen; index++) {
                    var divCol = $('<div class="col mb-4"></div>');
                    var divCard = $('<div class="card" style="width: 18rem height: 25rem"></div');
                    var pathImg = listFiltered[index].thumbnail.path + '.' + listFiltered[index].thumbnail.extension;
                    var imgCard = $("<img src=" + pathImg + " class='card-img-top'>");
                    var divCBody = $('<div class="card-body"><h4 class="card-title">' + listFiltered[index].title + '</h4></div>');

                    if (listFiltered[index].description != null) {
                        var cBodyText;
                        if (listFiltered[index].description.length > 20) {
                            cBodyText = $('<p class="card-text">' + listFiltered[index].description + '</p>');
                            cBodyText.shorten({
                                "showChars": 20,
                                "moreText": "Ver mas...",
                                "lessText": "Ver menos...",
                            });
                        } else {
                            cBodyText = $('<p class="card-text">' + listFiltered[index].description + '</p>');
                        }
                        divCBody.append(cBodyText);
                    }
                    divCard.append(imgCard).append(divCBody);
                    divCol.append(divCard);
                    $('#filteredContent').append(divCol);
                }
            }  
        }
    })


}