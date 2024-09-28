var authors = [
    "Albert Einstein",
    "Martin Luther King Jr.",
    "Mahatma Gandhi",
    "Nelson Mandela",
    "Mother Teresa",
    "Leonardo da Vinci",
    "Abraham Lincoln",
    "Margaret Thatcher",
    "Charles Darwin",
    "Thomas Edison",
    "Isaac Newton",
    "Galileo Galilei",
    "Marie Curie",
    "Leo Tolstoy",
    "Jane Austen",
    "Stephen Hawking",
    "Bill Gates",
    "Eleanor Roosevelt",
    "Mark Twain",
    "Oscar Wilde",
    "J.R.R. Tolkien",
    "Edgar Allan Poe",
    "Maya Angelou",
    "Toni Morrison",
    "Chinua Achebe",
    "Haruki Murakami",
    "Gabriel García Márquez",
    "Arundhati Roy",
    "Chimamanda Ngozi Adichie",
    "Salman Rushdie",
    "Ai Weiwei",
    "Malala Yousafzai",
    "Tove Jansson",
    "Mika Waltari"
];

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

var quoteText;
var quoteAuthor;

var setHtml = function(quote) {
    $('#quote').html("<span class='quote-text'>" + quote.quote + "</span");
    $('#author').text(quote.titles);
    $('#quote-loader').hide();
    $('#quote-container').show();
};

var getQuote = function() {
    $('#quote-loader').show();
    $('#quote-container').hide();
    // const quoteBox = document.getElementById('quote');
    var quote = null;
    var getNewQuote = function() {
        Wikiquote.getRandomQuote(authors[Math.floor(Math.random() * authors.length)], function (newQuote) {
            if (newQuote.quote.length < 130 && newQuote.quote.length > 2 && /[a-zA-Z]{3}/.test(newQuote.quote)) {
                quoteText = newQuote.quote;
                quoteAuthor = newQuote.titles;
                setHtml(newQuote);
            } else {
                // quoteText = newQuote.quote;
                // quoteAuthor = newQuote.titles;
                // setHtml(newQuote);
                getNewQuote();
            }
        }, function (e) {
            console.error("Error fetching quote");
        });
    };
        getNewQuote();
};

$(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
});

$('#share-quote').on('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'Quotes - paavopaavopaavo',
            text: quoteText + ' - ' + quoteAuthor,
        }).then(function() {
            console.log('Shared successfully');
        }).catch(function(error) {
            console.error('Error sharing:', error);
        });
    } else {
        // Fallback option
        alert('Sharing is not supported in this browser. Please copy the quote manually.');
    }
});

// Add event listener for the "copy" button
document.getElementById('copy-quote').addEventListener('click', function() {
    document.getElementById('copy-quote').innerHTML = '<i class="fa-regular fa-copy"></i> Copied!';
    var quoteText = document.querySelector('.quote-text').innerText;
    var quoteAuthor = document.getElementById('author').innerText;
    var quote = quoteText + ' - ' + quoteAuthor;
    // Copy the quote to the clipboard
    navigator.clipboard.writeText(quote).then(function() {
        console.log('Quote copied to clipboard');
    }).catch(function(error) {
        console.error('Error copying quote:', error);
        // Fallback option
        alert('Copying to clipboard is not supported in this browser. Please copy the quote manually.');
    });
});