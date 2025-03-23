<!-- Image display, with responsive image size -->
<div class="carousel"> 
    {% for image in entry.images %}
        {% assign file = folder | append: "/" | append: image.first %}
        {% assign desc = image.last %}
        {% include lightbox.html src=file data="image-d" height="400" title=desc %}
    {% endfor %}
</div>
<br style="clear:both" />

{% capture blockquotes %}
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
{% endcapture %}
{{ blockquotes | markdownify }}

<!-- Handling the description, with the tips/warnings -->
{% assign desc = entry.description | split: "-warning-" %}
{% assign desc2 = entry.description | split: "-tip-" %}

{% if desc.size == 1 and desc2.size == 1 %}
{{ desc | first | markdownify }}
{% endif %}

{% if desc.size > 1 %}
{{ desc.first | markdownify }}
{% capture warning_block %}
> ##### WARNING
>
> {{ desc.last }}
{: .block-warning }
{% endcapture %}
{{ warning_block | markdownify }}
{% endif %}

{% if desc2.size > 1 %}
{{ desc2.first | markdownify }}
{% capture tip_block %}
> ##### TIP
>
> {{ desc2.last }}
{: .block-tip }
{% endcapture %}
{{ tip_block | markdownify }}
{% endif %}