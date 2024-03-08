---
title: Arm Lifts
author: Shadowman39
category: Jekyll
layout: post
data_file: arm
---
{% assign folder = page.data_file %}


{% for entry in site.data.arm.lifts %}

___
### {{entry.name}}


<div class="desktop"> 
    <!-- Content to be displayed on desktop screens --> 
    <div style="display: inline; text-align: left; float: left">

        {% assign file = folder | append: "/" | append: entry.images.first.first %}
        {% assign desc = entry.images.first.last %}
        {% include lightbox.html src=file data="image-1" height="400" title=desc %}
        
        <div style="display: inline; text-align: right; float: right; padding-right: 10px; padding-left: 10px; width: 200px; height: 400px; overflow-y: auto">

            {% for image in entry.images offset:1 %}

                {% assign file = folder | append: "/" | append: image.first %}
                {% assign desc = image.last %}
                {% include lightbox.html src=file data="image-1" width="300" title=desc %}
            {% endfor %}
        </div>
    </div>
    <br style="clear:both" />
</div>

<div class="mobile"> 
    <!-- Content to be displayed on mobile screens --> 
    <div class="carousel">
        {% for image in entry.images %}
            {% assign file = folder | append: "/" | append: image.first %}
            {% assign desc = image.last %}
            <div>
                {% include lightbox.html src=file data="image-m" height="200" title=desc %}
            </div>
        {% endfor %}
    </div>
</div>

> - Builder: {{entry.author}}
> - [Instructions]({{entry.instructions}})

{{entry.description}}


{% endfor %}

 



