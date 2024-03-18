<!-- Image display, either desktop or mobile layout -->
<div class="desktop"> 
    <!-- Content to be displayed on desktop screens -->
    <div class="carousel"> 
        {% for image in entry.images %}

            {% assign file = folder | append: "/" | append: image.first %}
            {% assign desc = image.last %}
            {% include lightbox.html src=file data="image-d" height="400" title=desc %}
        {% endfor %}
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

> - Inventor: {{entry.author}}

{%- if entry.featured -%}
<br>
> - Featured in {{entry.featured}}
{% endif %}

{%- if entry.instructions -%}
<br>
> - [Instructions]({{entry.instructions}})
{% endif %}

{%- if entry.video -%}
<br>
> - [Video]({{entry.video}})
{% endif %}

<!-- Handling the description, with the tips/warnings -->
{% assign desc = entry.description | split: "-warning-" %}
{% assign desc2 = entry.description | split: "-tip-" %}

{% if desc.size == 1 and desc2.size == 1 %}
{{desc}}
{% endif %}

{% if desc.size > 1 %}
{{desc.first}}
> ##### WARNING
>
> {{desc.last}}
{: .block-warning }
{% endif %}

{% if desc2.size > 1 %}
{{desc2.first}}
> ##### TIP
>
> {{desc2.last}}
{: .block-tip }
{% endif %}

