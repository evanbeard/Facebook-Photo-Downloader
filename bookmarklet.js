javascript:(function(){

    // the below selector will need to be updated as fb changes
    // their page
    var DOWNLOAD_LINK_CONTAINER_SELECTOR = '#fbPhotoPageActions',

    // the anchor text for the download link. we have to find the
    // download link by its anchor text because it currently has no
    // id or class, and it's not always at the same relative position
    // in the container for every photo. You must update this string
    // if you are using a non-english language in facebook
    DOWNLOAD_LINK_ANCHOR_TEXT = 'Download',
    
    // delay before paging through to the next photo
    // to download it (adding delay appears more like a human).
    CHANGE_PHOTO_DELAY = 200, // in ms
    
    JQUERY_LINK = 'http://code.jquery.com/jquery-1.5.1.js';
    
    var printInstructions = function() {
        var message = "Below a list of urls will be" +
            " printed of all of your images. You should save these" + 
            " to a file with each URL on a new line and then run" +
            " \"wget -i download-file-list.txt\". If your files do not" +
            " all have .jpg extensions you can add .jpg to all files in a directory" +
            " with this command: \"find . -type f -exec mv '{}' '{}'.jpg \;\"";
        console.log(message);
    }

    var run = function(jQuery) {

        // set of downloads links already visited
        var seenDownloadLinks = {};
        
        var processImages = function(){

            var downloadLinkContainer = jQuery(DOWNLOAD_LINK_CONTAINER_SELECTOR);

            // downloadLink is the link to the photo on FB's CDN
            var downloadLink = downloadLinkContainer.find(
                "a:contains('" + DOWNLOAD_LINK_ANCHOR_TEXT + "')").attr('href');
            
            // if we don't have a download link maybe the page hasn't
            //  finished loading, so we'll wait another CHANGE_PHOTO_DELAY ms
            if(!downloadLink) {
                setTimeout(function(){processImages()},
                           CHANGE_PHOTO_DELAY);
                return;
            }
            
            // if we haven't seen this image yet
            if(!seenDownloadLinks[downloadLink]) {
                seenDownloadLinks[downloadLink] = true;
                
                // go to next photo (we call a FB js function). 
                PhotoPermalink.pagerClick("prev")
                
                // recurse after a set delay
                setTimeout(function(){processImages()},
                           CHANGE_PHOTO_DELAY);
                
            } else {
                // we saw an image we've already seen
                // so we're finished looping through images
                printInstructions();

                // print results
                var result = "";
                jQuery.each(seenDownloadLinks, function(url, v) { 
                    result += "\n" + url;
                });
                console.log(result);
            }
        }
        processImages();

    }

    // load jquery and don't clobber $ namespace
    var s = document.createElement('script');
    s.src = JQUERY_LINK;
    document.getElementsByTagName('head')[0].appendChild(s);
    s.onload = function() {
        var jQuery = $.noConflict(true);
        jQuery(document).ready(run);
    }

})();

