---
title: Arm Lifts
author: Shadowman39
category: Jekyll
layout: post
---

{% for entry in site.data.arm.lifts %}
___
### {{entry.name}}

<div class="desktop"> 
    <!-- Content to be displayed on desktop screens --> 
    <div style="display: inline; text-align: left; float: left">

        {% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" height="400" title="A picture." %}
        
        <div style="display: inline; text-align: right; float: right; padding-right: 10px; padding-left: 10px; width: 200px; height: 400px; overflow-y: auto">
            {% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" width="300" title="An even bigger picture." %}

            {% include lightbox.html src="arm/IMG_1275.JPG" data="image-1" width="300" title="An even bigger picture." %}

            {% include lightbox.html src="arm/IMG_1280.JPG" data="image-1" width="300" title="An even bigger picture." %}
        </div>
    </div>
    <br style="clear:both" />
</div>

<div class="mobile"> 
    <!-- Content to be displayed on mobile screens --> 
    <div class="carousel">
        <div>
            {% include lightbox.html src="arm/IMG_1280.JPG" data="image-m" height="200" title="An even bigger picture." %}
        </div>

        <div>
            {% include lightbox.html src="arm/IMG_1275.JPG" data="image-m" height="200" title="An even bigger picture." %}
        </div>

        <div>
            {% include lightbox.html src="arm/IMG_1280.JPG" data="image-m" height="200" title="An even bigger picture." %}
        </div>
    </div>
</div>

> - Builder: {{entry.author}}
> - [Instructions]({{entry.instructions}})

{{entry.description}}


{% endfor %}

 



