{% assign folder = page.data_file | string %}
<!-- The main group of lifts that show up in the table of contents -->
{% assign main = site.data[folder].lifts | where: "category", "main" %}

<!-- First loop through main lifts -->
{% for entry in main %}
<div class="card">

{{ "## " | append: entry.name | markdownify }}

{%- include_relative image-display.md -%}

<!-- Loop through the sub categories -->
{%- assign subName = entry.name | downcase -%}
{%- assign sub = site.data[folder].lifts | where: "category", subName -%}
{% for entry in sub %}

{{ "---" | markdownify }}

{{ "### " | append: entry.name | markdownify }}

{%- include_relative image-display.md -%}
{% endfor %}
</div>
{% endfor %}