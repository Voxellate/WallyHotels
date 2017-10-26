/**
 * Created by Lucas on 10/11/2017.
 */

//Load the API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Replace the ytplayer element with an <iframe>
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'qvBX9VgPGSg'
    });
}

function vidChange (id) {
    player.loadVideoById({videoId:id})
}