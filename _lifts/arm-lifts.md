---
title: Arm Lifts
author: Shadowman39
category: Jekyll
layout: post
---

Some text here.

{% include lightbox.html src="arm/IMG_1275.JPG" data="image-1" width="50" title="A picture." %}
{% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" width="200" title="A bigger picture." %}


{% for entry in site.data.arm.lifts %}
___
### {{entry.name}}
> - Builder: {{entry.author}}
> - [Instructions]({{entry.instructions}})

{{entry.description}}

{% endfor %}

<div style="display: inline; text-align: left; float: left">
{% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" height="400" title="A picture." %}
    <div style="display: inline; text-align: right; float: right; padding-right: 10px; padding-left: 10px; width: 200px; height: 400px; overflow-y: auto">
        {% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" width="300" title="An even bigger picture." %}

        {% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" width="300" title="An even bigger picture." %}

        {% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" width="300" title="An even bigger picture." %}
    </div>
</div>
