# Facebook Photo Downloader

## Instructions

1) Go to any photo in the album you want to download. The url should look like this "https://www.facebook.com/photo.php?fbid=8532030814&set=a.665432525484.2233540.1310135&type=1". You don't want to be in the theatre (remove "&theatre" from the url to get out of it).
2) Run the bookmarklet
3) Follow instructions printed to the console (to use wget to download your images)


## FAQ

- How does it work?
This application directs your browser to visit each photo in an album and collects the download URLs, then puts the urls in a format that wget can use to download all of the photos. It shouldn't be blocked by facebook because it looks just like you do when navigating between photos.

- Why can't I use a tool such as PhotoGrabber to do this?
Many people set their privacy settings so that third party applications cannot access their albums, so third party apps such as PhotoGrabber will not download all photos available to you.

- Why can't I use Facebook's tool to download my own data
You can, but this only allows you to download your own albums, not those that belong to others.

## Disclaimer
- use at your own risk.
- only tested on Chrome but should work in any modern browser
