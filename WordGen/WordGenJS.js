var div = document.getElementById("answer");
var key = document.getElementById("key");

var gen = function()
{
    if(key.value == "") return;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            const json = JSON.parse(xmlHttp.responseText);
            div.innerHTML = "<br>";

            json.forEach(word => div.innerHTML += "<b>" + word + "-</b>" + getWordDetails(word));
        }
    }

    xmlHttp.open("GET", "https://random-word-api.herokuapp.com/word?key=" + key.value + "&number=10", true); // true for asynchronous
    xmlHttp.send(null);
}

var getWordLink = function(word)
{
    return "<a href='https://www.google.com/search?q=site%3Awashingtonpost.com+intext%3A" + word + "' target='_blank'>articles</a> : ";
}

var getWordDef = function(word)
{
    return "<a href='https://www.dictionary.com/browse/" + word + "' target='_blank'>definition</a> : ";
}

var getWordSyn = function(word)
{
    return "<a href='https://www.thesaurus.com/browse/" + word + "' target='_blank'>synonyms and antonyms</a> ";
}

var getWordDetails = function(word)
{
    return " " + getWordLink(word) + getWordDef(word) + getWordSyn(word) + "<br><br>";
}

document.getElementById("button").addEventListener("click", function(){gen();});