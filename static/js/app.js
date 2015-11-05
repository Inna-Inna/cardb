(function($, _){
    'use strict';
    var $minYearEl = $('#minYear'),
        $maxYearEl = $('#maxYear'),
        years = [],
        BASE_URL = 'http://www.carqueryapi.com/api/0.3/?callback=?';

    //setTimeout(function(){});

    $.getJSON(BASE_URL, {
        //callback: '?',
        cmd: 'getYears'
    }, function(data){

        years = fillYears(data);
        addOptions($minYearEl, years);

        $minYearEl.on('change', function(){
            var val = +$(this).val();
            if (val) {
                $maxYearEl.empty()
                    .prepend('<option value="0">Select Max Year</option>');
                addOptions($maxYearEl, years.filter(function (year) {
                    return year >= val;
                }));
                $maxYearEl.removeAttr('disabled');
            } else {
                resetOption($maxYearEl,'Select Max Year');
                $maxYearEl.attr('disabled', 'disabled');
            }
        });
    });

    function fillYears(data){
        var min = +data.Years.min_year,
            max = +data.Years.max_year,
            result = [];
        for (; max >= min; max --){
            result.push(max);
        }
        return result;
    }

    function addOptions($el, data){
        data.forEach(function(year){
           var template = '<option value="'+ year +'">'+ year +'</option>';
            $el.append(template);
        });
    }

    function resetOption($el, text){
        $el.empty()
            .prepend('<option value="0">'+text+'</option>');
    }
})(jQuery, _);
