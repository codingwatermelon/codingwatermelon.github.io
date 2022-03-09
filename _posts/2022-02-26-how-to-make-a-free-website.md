---
layout: post
title: "How to make a free website using Github Pages"
date: 2022-02-26 13:32:40 -1000
categories: howto, webdev
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/J42rPZZiqQE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
### Preliminary Notes
- Estimated time to complete
    - **1-2 hours**
- Documentation
    - [Minima template documentation](https://github.com/jekyll/minima)
    - [Gridster template documentation](https://ickc.github.io/gridster-jekyll-theme/)
- My repository
    - [artist portfolio site](https://jessacruz.github.io/)
    - [artist portfolio repository](https://github.com/jessacruz/jessacruz.github.io)

---

### Introduction
Have you heard of Squarespace? Or maybe Wix? What if I told you that there’s a way to make a websi te like you can with these services, but for free? This tutorial will show you how you can make a website using this cool thing called Github specifically, Github Pages.

This is the same way that I’m hosting my text tutorials, but you could host a plethora of other things using this service, just make sure to adhere to [the Github Pages terms of usage](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

There a bunch of different site templates out there that you can use (see [here](https://jekyllthemes.io/github-pages-themes) and [here](http://jekyllthemes.org/) for the sites that I used), from barebones to pretty complex, and after getting over the small learning curve that’s involved with this project, you’ll be on your way to making your very own website, and all for the low price of absolutely **FREE**.

Feel free to reach out to me if anything is unclear in this tutorial via the Youtube comments section!

## How it works
The concept of a free hosted website is a little bit bonkers, but the kind folks at Github have had this around for a while now. They offer a service called **Github Pages**, which I think was originally to allow programmers to set up websites for testing as well as for hosting their portfolios. As long as you’re not posting illicit or illegal things or running your online business on your Github Pages site, then they don’t really care about what you’re hosting  — check out the full list of restrictions here under Prohibited Usage.

The default Github Pages site is really simple, but that’s where Jekyll comes in. Jekyll is a whole website builder on its own, but it integrates with Github Pages to allow you to use customizable templates, so that you don’t have to build an entire website from the ground up (kinda like Wix or Squarespace).

Disclaimer: I’m not knocking on services like Wix or Squarespace here as there is definitely a time and place for that kind of thing, but if you’re like me and you don’t want to pay subscription or domain name fees to have a website and you also don’t want to build a website from the ground up, then Github Pages makes a lot of sense.

### Instructions

**Requirements**
- A Github account
    - Sign up for Github and get Github Desktop
- An open heart and mind
- Yeah, not much else
    - If you’re using a prebuilt template and you don’t plan on customizing anything, you really don’t even need any web development experience. Also, since Github is hosting the site, you also don’t need to manage a server or any associated software for the site, which is amazing.

**Tutorial**
{:start="1"}
1. Install Jekyll
- Sources:
  - GitHub Pages docs:
    - [https://pages.github.com/](https://pages.github.com/)
    - [https://docs.github.com/en/pages/quickstart](https://docs.github.com/en/pages/quickstart)
    - [https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)\
  - Jekyll installation docs:
    - [https://jekyllrb.com/docs/](https://jekyllrb.com/docs/)
    - [https://jekyllrb.com/docs/installation/](https://jekyllrb.com/docs/installation/)
    - [https://jekyllrb.com/docs/installation/windows/](https://jekyllrb.com/docs/installation/windows/)
  - Theme docs:
    - [Minimal Mistakes Theme doc](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
    - [Gridster Theme doc](https://ickc.github.io/gridster-jekyll-theme/gridster-documentation/)
- To set up a nice looking Github Pages site, we’re going to use Jekyll, a type of static website template that Github Pages can interpret and display. To use Jekyll, we have to install a bunch of dependencies. Installing the dependencies varies on which OS you’re using, which thankfully they have documented out pretty nicely. In this tutorial, we’re going to be using Windows, but not really Windows. Since the native Windows installation of Jekyll isn’t recommended, we should use WSL, which is short for Windows Subsystem for Linux, which allows us to use Linux within Windows. To enable that, read [these instructions](https://docs.microsoft.com/en-us/windows/wsl/install) provided by Microsoft.
- Once you have WSL set up, now you can install the dependencies for Jekyll. I tried going with the documented route, but was getting errors when running the gem update command. To fix that, I installed a more recent version of Ruby, which seemed to fix some of the errors.
- Once you’ve updated `gem`, you can finally install Jekyll and something else called bundler which is also necessary. This process takes some time, so it’s a great time to think about life.
- Verify that you’ve installed Jekyll by running `jekyll -v`, then we’re good to go to the next step

{:start="2"}
2. Setup Github repository
    - Now, we’re going to set up the Github repository. This is where your site is going to be hosted. You will have to name it your github name.github.io. Once that’s done, we’ll make a new directory for the project in WSL and then clone into the repository, then create a new jekyll site. This part may take some time, and as you can see I had some permissions errors when I was building mine. If you don’t know much about Linux permissions, they’re pretty simple, and I’d recommend you watch [this video](https://www.youtube.com/watch?v=D-VqgvBMV7g).
    {% highlight shell %}
    jekyll new --skip-bundle .

    vim Gemfile

    Add "#" to the beginning of the line that starts with gem "jekyll" to comment out this line.

    Add the github-pages gem by editing the line starting with # gem "github-pages". Change this line to:

    gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins

    Replace GITHUB-PAGES-VERSION with the latest supported version of the github-pages gem. You can find this version here: "Dependency versions."
    https://pages.github.com/versions/

    bundle install
    {% endhighlight %}
    - After that’s done, edit the `_config.yml` and add some of your info. This file contains some of the front facing site configurations.
    - You’re going to need to set up an authorization token to push your site up to Github, which you can read more about why this is necessary at this blog post [https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/). It basically is a way to authenticate yourself as the owner or authorized editor of your project without having to use your password. To do this, follow [these steps](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Save this for later in a text file, but don’t worry if you lose it because you can generate a new one using the same steps.
    - Now, push your edits up to Github using these commands
        `git add .`
        `git commit -m ""`, where -m refers to the message or comment to be associated with your edit
        `git push -u origin master` (in this case, I specify the master branch, but you could change this to be a different branch if you wanted to host your site elsewhere in the repository. Read more about that here ("[Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/articles/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source)")
    - In the last command, you have to use that authorization token we generated earlier as it won’t let you use your regular Github password. Just paste that into the terminal using right click to paste, then you’re good to go.
    - You may have to wait up to 10 minutes for the site to be published, but it’ll eventually get there and you’ll have your brand-spanking new website there just waiting to be customized further.

{:start="3"}
3. Customize site
    - Some of you may want to stop here, because this is pretty much the way I’ve kept my blog aside from removing some unnecessary buttons and text. I’ll share some of my configurations with you [here](https://github.com/codingwatermelon/codingwatermelon.github.io) if you want to replicate my nice clean blog. Also, this default theme is called Minimal Mistakes and you can find more about customizing it here: [https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
    - If you want to continue further and make a site like this, then stay tuned. Otherwise, check out how to make posts on my blog (https://github.com/codingwatermelon/codingwatermelon.github.io/tree/gh-pages/_posts).
    - To make this artist portfolio site, I started with a base template provided by this site ([https://jekyllthemes.io/github-pages-themes](https://jekyllthemes.io/github-pages-themes)). There are some really cool looking templates, so if you’re willing to spend some bucks on a better base template, then this is a good site to start with. I’m not willing to spend bucks, so I started with the Gridster template that they provide [https://jekyllthemes.io/theme/gridster-jekyll-theme](https://jekyllthemes.io/theme/gridster-jekyll-theme) (https://github.com/DigitalMindCH/gridster-jekyll-theme).
    - All you have to do is clone the repository, then copy paste the contents into your own repository.
    - Then, the harder part is that you have to figure out how to customize it. With any of these templated sites, you have to figure out how it’s structured. Luckily, there’s documentation. Oh wait. There isn’t. Thank goodness somebody uploaded a copy of the original documentation , because it would’ve made this a lot harder to figure out even though it was still relatively difficult — I’ll blame that on my lack of web development skills.
    - The main things I had to do was to figure out how SVGs work and replace the default logo, figure out how how to remove text from the posts, and change around some of the site functionality. You might argue that it would’ve been easier to start this whole thing from scratch, but it’s far too late for that.
    - So, on to **task 1** — creating my own SVG. I have a PNG and need to convert it to vector graphics (which, by the way, are super cool). Here are some videos and articles that I used to help me with that ([http://web.simmons.edu/~grovesd/comm328/modules/svg/creating-svgs](http://web.simmons.edu/~grovesd/comm328/modules/svg/creating-svgs), [https://www.youtube.com/watch?v=Ih0lhVLseu4](https://www.youtube.com/watch?v=Ih0lhVLseu4&list=LL&index=6)).
        - Positioning the SVG was hard because with the initial default settings, it was cutting off my logo. I had to play around with the sizing of it using this article ([https://css-tricks.com/scale-svg/](https://css-tricks.com/scale-svg/)), and you can actually use Inspect Element to make changes to it on the client side without having to upload it to Github and waiting for the changes to go through. I found that scaling my numbers up by 2/3s and positioning it accordingly made it perfect.
        - Then, I wanted to animate it, so it would do something when you hover over it. It turns out you have to edit the actual css parts of the site rather than through the usual templated parts — I’m assuming this is because when the site is built, code is not rendered the same in Github Pages as it would be if it were built like it was supposed to. It’s a little bit harder to navigate this file since it has everything on one line, but it can be “beautified” using my text editor [Atom](https://atom.io/).
        - Now the text shows up and when you hover over the SVG, which is a nice little touch.
    - **Task 2** — removing text from the posts. This one was easier because all you have to do is modify the template that are used by each post, which in this case is located towards the bottom of `article-index.html`
      - [https://stackoverflow.com/questions/6169666/how-to-resize-an-image-to-fit-in-the-browser-window](https://stackoverflow.com/questions/6169666/how-to-resize-an-image-to-fit-in-the-browser-window)
      - [https://www.w3schools.com/howto/howto_css_image_center.asp](https://www.w3schools.com/howto/howto_css_image_center.asp)
    - **Task 3** — creating an easy way to upload photos. This one requires me to make a script to resize photos upon posting.
      - I had to do a lot of tweaking to the base templated site and thankfully it’s all documented in my [Github commit trail](https://github.com/jessacruz/jessacruz.github.io/commits/revertback).

{:start="4"}
4. Using and maintaining the site
    - Now the site is complete, we just need to maintain it by uploading new posts to the posts directory and images to the images directory. And that’s basically it!

### Conclusion
I learned a lot during this project and I hope you did too! Github Pages is definitely a cool service that Github offers and I want more people to take advantage of it. Let me know if you have any ideas for other things that you would want to see in a Github Pages site and I'll be sure to reply! Leave a like if you liked this video and thanks very much for watching!
