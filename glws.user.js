// ==UserScript==
// @name        GLWS Market Button
// @include     http://steamcommunity.com/market/listings/730/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require		https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    	GM_addStyle
// @grant		GM_xmlhttpRequest
// ==/UserScript==
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'toolbar=yes,location=yes,directories=yes,status=yes,menubar=no,scrollbars=yes,resizable=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

waitForKeyElements ("#searchResultsRows div.market_listing_table_header", addButtons);

function addButtons(){
    $('.market_listing_row').each( function(e) {				
        $(this).find('.market_listing_wear').empty();
        var rowID = $(this).attr('id');
        if(rowID == "market_buyorder_info") {
            return;
        }
        var listingID = rowID.replace('listing_', '');
        var assetID = unsafeWindow.g_rgListingInfo[listingID].asset.id;
        var inspectLink = unsafeWindow.g_rgListingInfo[listingID].asset.market_actions[0].link;
        inspectLink = inspectLink.replace('steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20', '');
        inspectLink = inspectLink.replace('%listingid%', listingID);
        inspectLink = inspectLink.replace('%assetid%', assetID);
        var url = "https://beta.glws.org/#" + inspectLink;
        $(this).append("<div style='width: 130px; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; z-index: 999;' class='market_listing_right_cell market_listing_action_buttons'><a id='"+listingID+"-float' class='btn_green_white_innerfade btn_small' href='javascript:void(0);'><span>Open GLWS</span></a></div>");
        $("#"+listingID+"-float").click(function() { PopupCenter(url, "GLWS", 800, 600); });
    });
}


