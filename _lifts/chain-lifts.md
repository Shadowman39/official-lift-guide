---
title: Chain Lifts
author: Shadowman39
category: Jekyll
layout: post
data_file: chain
---
{% assign folder = page.data_file %}
<!-- Arrays to store grouped lifts for categories -->
{% assign main = site.data.chain.lifts | where: "category", "main" %}

These involve a chain, either the normal chain pieces or one that's made from normal connectors, that goes around gears and tensioned. Attached to the chain are ball claws to pick them up. The balls can leave either with a small pusher above the claw or pushed around the top gears until they fall out. 

> ##### TIP
>
> A motor can turn the gears at the top, bottom, or middle, but it operates smoother with the motor at the top.
{: .block-tip }


<!-- First loop through main lifts -->
{% for entry in main %}

---

## {{ entry.name }}

{%- include_relative image-display.md -%}

<!-- Loop through the sub categories -->
{%- assign subName = entry.name | downcase -%}
{%- assign sub = site.data.chain.lifts | where: "category", subName -%}
{% for entry in sub %}

---

### {{ entry.name }}

{%- include_relative image-display.md -%}
{% endfor %}
{% endfor %}