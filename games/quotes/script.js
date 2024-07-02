var Wikiquote = (function() {
    var wqa = {};
    var API_URL = "https://en.wikiquote.org/w/api.php";

    wqa.queryTitles = function(titles, success, error) {
        $.ajax({
            url: API_URL,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "query",
                redirects: "",
                titles: titles
            },
            success: function(result, status) {
                var pages = result.query.pages;
                var pageId = -1;
                for(var p in pages) {
                    var page = pages[p];
                    if(!("missing" in page)) {
                        pageId = page.pageid;
                        break;
                    }
                }
                if(pageId > 0) {
                    success(pageId);
                } else {
                    error("No results");
                }
            },
            error: function(xhr, result, status){
                error("Error processing your query");
            }
        });
    };

    wqa.getSectionsForPage = function(pageId, success, error) {
        $.ajax({
            url: API_URL,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "parse",
                prop: "sections",
                pageid: pageId
            },
            success: function(result, status){
                var sectionArray = [];
                var sections = result.parse.sections;
                for(var s in sections) {
                    var splitNum = sections[s].number.split('.');
                    if(splitNum.length > 1 && splitNum[0] === "1") {
                        sectionArray.push(sections[s].index);
                    }
                }
                if(sectionArray.length === 0) {
                    sectionArray.push("1");
                }
                success({ titles: result.parse.title, sections: sectionArray });
            },
            error: function(xhr, result, status){
                error("Error getting sections");
            }
        });
    };

    wqa.getQuotesForSection = function(pageId, sectionIndex, success, error) {
        $.ajax({
            url: API_URL,
            dataType: "jsonp",
            data: {
                format: "json",
                action: "parse",
                noimages: "",
                pageid: pageId,
                section: sectionIndex
            },
            success: function(result, status){
                var quotes = result.parse.text["*"];
                var quoteArray = [];
                var $lis = $(quotes).find('li:not(li li)');
                $lis.each(function() {
                    $(this).children().remove(':not(b)');
                    var $bolds = $(this).find('b');
                    if($bolds.length > 0) {
                        quoteArray.push($bolds.html());
                    } else {
                        quoteArray.push($(this).html());
                    }
                });
                success({ titles: result.parse.title, quotes: quoteArray });
            },
            error: function(xhr, result, status){
                error("Error getting quotes");
            }
        });
    };

    wqa.getRandomQuote = function(titles, success, error) {
        var errorFunction = function(msg) {
            error(msg);
        };

        var chooseQuote = function(quotes) {
            var randomNum = Math.floor(Math.random()*quotes.quotes.length);
            success({ titles: quotes.titles, quote: quotes.quotes[randomNum] });
        };

        var getQuotes = function(pageId, sections) {
            var randomNum = Math.floor(Math.random()*sections.sections.length);
            wqa.getQuotesForSection(pageId, sections.sections[randomNum], chooseQuote, errorFunction);
        };

        var getSections = function(pageId) {
            wqa.getSectionsForPage(pageId, function(sections) { getQuotes(pageId, sections); }, errorFunction);
        };

        wqa.queryTitles(titles, getSections, errorFunction);
    };

    return wqa;
}());

var authors = [
    "Aristotle", "Socrates", "Plato", "Kierkegaard", "Johann Georg Hamann", "Alhazen", "Hendy Adams"
];

var quoteText;
var quoteAuthor;

var setHtml = function(quote) {
    $('#quote').html(
        "<blockquote class='quote-text'>" + quote.quote + "</blockquote>" +
        "<small class='author'> - " + quote.titles + "</small>"
    );
};

var getQuote = function() {
    Wikiquote.getRandomQuote(authors[Math.floor(Math.random() * authors.length)], function (quote) {
        quoteText = quote.quote;
        quoteAuthor = quote.titles;
        setHtml(quote);
    }, function (e) {
        console.error("Error fetching quote");
    });
};

$(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
});