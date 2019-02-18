---
layout: post
title: Jekyll Settings
date: 2019-02-12
author-id: 2
post-cover: /uploads/header-04-cover.jpg
preview-cover: /uploads/header-04-preview.jpg
tags: jekyll tips
---

Here's a handy guide to easily setting up your Jekyll website

# Add your favicons

1. Head over to <https://realfavicongenerator.net> to add your own favicons.
2. Load your favicons in the following location ```/assets/img/favicon.ico```

# Table of content

If you don't want to display table of content for a particular post/page you can disable them by adding ```toc: false``` to that post's or page YAML Front Matter.

# Enabling comments (via Disqus)

Optionally, if you have a Disqus account, you can tell Jekyll to use it to show a comments section below each post.

To enable it, add the following lines to your Jekyll site:

```yml
# Comments (via Disqus)
comments:
  status: false
  shortname: 'powershell-du-zero'
```

You can find out more about Disqus' shortnames [here](https://help.disqus.com/installation/whats-a-shortname).

If you don't want to display comments for a particular post you can disable them by adding ```comments: false``` to that post's YAML Front Matter.

# Social networks

You can add links to the accounts you have on other sites, with respective icon, by adding one or more of the following options in your config.

```yml
# Author settings
author:
  name: Thomas ILLIET
  avatar: demo/img/avatar-thomas-illiet.jpg
  bio: ''
  social:
    twitter:
      icon: fab fa-twitter
      link: https://twitter.com/PowershellZ
    github:
      icon: fab fa-github
      link: https://github.com/Powershell-du-Zero
    linkedin:
      icon: fab fa-linkedin
      link: https://www.linkedin.com/company/powershell-du-zero/
```

> To find more icon, you can visit the website [Font Awesome](https://fontawesome.com/)

# Enabling Google Analytics

To enable Google Analytics, add the following lines to your Jekyll site:

```yml
# Fill in your Google Analytics ID to track your website using GA
google_analytics: UA-NNNNNNNN-N
```

# Add tags

To add tags, create a new ```yml``` file in ```_blog_tags``` directory with the following lines :

```yml
---
title: Markdown
description: love it
permalink: "/tags/markdown/"
header-img: /uploads/header-01.jpg
---
```

The parameters "**description**" & "**header-img**" are optional, they are used to customize the pages of tags.
