<!-- Image display, with responsive image size -->
<div class="carousel"> 
    {% for image in entry.images %}
        {% assign file = folder | append: "/" | append: image.first %}
        {% assign desc = image.last %}
        {% include lightbox.html src=file data="image-d" height="400" title=desc %}
    {% endfor %}
</div>
<br style="clear:both" />

<!-- Replacing the blockquotes section -->
<div class="entry-metadata">
    {% if entry.author %}
    <div class="meta-item meta-inventor">
        <span class="meta-icon"><i class="fa fa-user fa-lg"></i></span>
        <span class="meta-label">Inventor:</span>
        <span class="meta-value">{{ entry.author | markdownify | remove: '<p>' | remove: '</p>' }}</span>
    </div>
    {% endif %}

    {% if entry.featured %}
    <div class="meta-item meta-featured">
        <span class="meta-icon"><i class="fa fa-star fa-lg"></i></span>
        <span class="meta-label">Featured:</span>
        <span class="meta-value">{{ entry.featured | markdownify | remove: '<p>' | remove: '</p>' }}</span>
    </div>
    {% endif %}

    {% if entry.instructions %}
    <a href="{{entry.instructions}}" class="meta-item action-link instruction-link">
        <span class="meta-icon"><i class="fa fa-book fa-lg"></i></span>
        <span class="meta-label">Instructions</span>
    </a>
    {% endif %}

    {% if entry.video %}
    <a href="{{entry.video}}" class="meta-item action-link video-link">
        <span class="meta-icon"><i class="fa fa-play-circle fa-lg"></i></span>
        <span class="meta-label">Watch Video</span>
    </a>
    {% endif %}
</div>

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