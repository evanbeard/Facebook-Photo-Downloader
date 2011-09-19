(function(){
    // load jquery and don't clobber $ namespace
    var s=document.createElement('script');s.src='http://code.jquery.com/jquery-1.1.2.js';document.getElementsByTagName('head')[0].appendChild(s);
    var jQuery = $.noConflict(true);

    var printInstructions = function() {
        var message = "Below a list of urls will be" +
            " printed of all of your images. You should save these" + 
            " to a file with each URL on a new line and then run" +
            " \"wget -i download-file-list.txt\". If your files do not" +
            " all have .jpg extensions you can add .jpg to all files in a directory" +
            " with this command: \"find . -type f -exec mv '{}' '{}'.jpg \;\"";
        console.log(message);
    }

    // set of downloads links already visited
    var seenDownloadLinks = {};
    
    // delay before paging through to the next photo
    // to download it (adding delay appears more like a human).
    var CHANGE_PHOTO_DELAY = 1000; // in ms
    
    var processImages = function(){
        // go to next photo (we call a FB js function). 
        PhotoPermalink.pagerClick("prev")
        
        // get second link in the actions box which is the
        // download link
        var downloadLink = jQuery(jQuery('#fbPhotoPageActions').children()[1]).attr('href');
        
        if(!seenDownloadLinks[downloadLink]) {
            // haven't seen this image yet
            seenDownloadLinks[downloadLink] = true;
            
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
})();

