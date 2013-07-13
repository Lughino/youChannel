(function() {
            function createPlayer(jqe, video, options) {
                var ifr = $('iframe', jqe);
                if (ifr.length === 0) {
                    ifr = $('<iframe scrolling="no" id="ytplayer" type="text/html" width="150" height="110" frameborder="0">');
                    ifr.addClass('player');
                }
                var src = 'http://www.youtube.com/embed/' + video.id;
                if (options.playopts) {
                    src += '?';
                    for (var k in options.playopts) {
                        src+= k + '=' + options.playopts[k] + '&';
                    }  
                    src += '_a=b';
                }
                ifr.attr('src', src);
                jqe.append(ifr);
            }

            function createCarousel(jqe, videos, options) {
                var car = $('ul.carousel', jqe);
                if (car.length === 0) {
                    car = $('<ul/>');
                    car.addClass('carousel');
                    jqe.append(car);

                }
                $.each(videos, function(i,video) {
                    options.list(car, video, options);
                });
            }

            function createList(jqe, video, options) {
                var li = $('<li/>');    
                jqe.append(li);
                li.append(options.player(li, video, options));
                li.append('<span>'+ video.title +'</span>');
            }

            var defoptions = {
                autoplay: false,
                user: null,
                carousel: createCarousel,
                player: createPlayer,
                list: createList,
                loaded: function() {},
                playopts: {
                    autoplay: 0,
                    egm: 1,
                    autohide: 1,
                    fs: 0,
                    showinfo: 0,
                    controls: 0,
                    enablejsapi: 1,
                    modestbranding: 1,
                    rel: 0,
                    html5: 1,
                    //origin:'http://localhost'
                }
            };

            function onReady() {
                this.addEventListener('onStateChange', function(e) {
                    console.log('State is:', e.data);
                });
            }

            $.fn.extend({
                youChannel: function(options) {
                    var md = $(this);
                    md.addClass('youtube');
                    var allopts = $.extend(true, {}, defoptions, options);
                    allopts.maindiv = md;
                    $.getJSON('http://gdata.youtube.com/feeds/users/' + allopts.user + '/uploads?alt=json-in-script&format=5&callback=?', null, function(data) {
                        var feed = data.feed;
                        var videos = [];
                        $.each(feed.entry, function(i, entry) {
                            var video = {
                                title: entry.title.$t,
                                id: entry.id.$t.match('[^/]*$')
                            };
                            videos.push(video);
                        });
                        allopts.allvideos = videos;
                        allopts.carousel(md, videos, allopts);
                        allopts.loaded(videos, allopts);
                    });
                } 
            });

        })();
