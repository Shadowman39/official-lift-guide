require(['gitbook', 'jquery'], function(gitbook, $) {
    var SITES = {
        'facebook': {
            'label': 'Facebook',
            'icon': 'fa fa-facebook',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fshadowman39.github.io%2Fofficial-lift-guide%2F');
            }
        },
        'twitter': {
            'label': 'X',
            'icon': 'fa fa-twitter',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://twitter.com/intent/tweet?url=https%3A%2F%2Fshadowman39.github.io%2Fofficial-lift-guide%2F&text=Check%20out%20the%20Official%20Lift%20Guide!');
            }
        },
        'reddit': {
            'label': 'Reddit',
            'icon': 'fa fa-reddit',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://www.reddit.com/submit?url=https%3A%2F%2Fshadowman39.github.io%2Fofficial-lift-guide%2F&title=Official%20Lift%20Guide');
            }
        },
        'pinterest': {
            'label': 'Pinterest',
            'icon': 'fa fa-pinterest',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fshadowman39.github.io%2Fofficial-lift-guide%2F&description=Official%20Lift%20Guide');
            }
        },
        'github': {
            'label': 'Github',
            'icon': 'fa fa-github',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://github.com');
            }
        },
        'telegram': {
            'label': 'Telegram',
            'icon': 'fa fa-telegram',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://t.me');
            }
        },
        'google': {
            'label': 'Google+',
            'icon': 'fa fa-google-plus',
            'onClick': function(e) {
                e.preventDefault();
                window.open('https://plus.google.com/share?url='+encodeURIComponent(location.href));
            }
        },
        'weibo': {
            'label': 'Weibo',
            'icon': 'fa fa-weibo',
            'onClick': function(e) {
                e.preventDefault();
                window.open('http://service.weibo.com/share/share.php?content=utf-8&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title));
            }
        },
        'instapaper': {
            'label': 'Instapaper',
            'icon': 'fa fa-instapaper',
            'onClick': function(e) {
                e.preventDefault();
                window.open('http://www.instapaper.com/text?u='+encodeURIComponent(location.href));
            }
        },
        'vk': {
            'label': 'VK',
            'icon': 'fa fa-vk',
            'onClick': function(e) {
                e.preventDefault();
                window.open('http://vkontakte.ru/share.php?url='+encodeURIComponent(location.href));
            }
        }
    };



    gitbook.events.bind('start', function(e, config) {
        var opts = config.sharing;

        // Create dropdown menu
        var menu = $.map(opts.all, function(id) {
            var site = SITES[id];

            return {
                text: site.label,
                onClick: site.onClick
            };
        });

        // Create main button with dropdown
        if (menu.length > 0) {
            gitbook.toolbar.createButton({
                icon: 'fa fa-share-alt',
                label: 'Share',
                position: 'right',
                dropdown: [menu]
            });
        }

        // Direct actions to share
        $.each(SITES, function(sideId, site) {
            if (!opts[sideId]) return;

            var onClick = site.onClick;
            
            // override target link with provided link
            var side_link = opts[`${sideId}_link`]
            if (side_link !== undefined && side_link !== "") {
                onClick = function(e) {
                    e.preventDefault();
                    window.open(side_link);
                }
            }

            gitbook.toolbar.createButton({
                icon: site.icon,
                label: site.text,
                position: 'right',
                onClick: onClick
            });
        });
    });
});
