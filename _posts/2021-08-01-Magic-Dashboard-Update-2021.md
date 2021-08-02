---
layout: post
title: "2021 Update on Magic Dashboard"
date: 2021-08-01 10:52:40 -1000
categories: update
---

### Introduction
This is a quick update regarding my first Raspberry Pi project posted on this site, the "Magic Dashboard". After about a year of operating smoothly, I noticed some performance issues with running it on my Raspberry Pi Zero; recently, it seems to have completely frozen to the point that I can't even SSH into it to try to troubleshoot. This post will detail the steps I took to get it back into a working state.

If you have any questions, you can DM me at [@masterofsome__](https://instagram.com/masterofsome__) on Instagram.

***

### Steps taken
{:start="1"}
1. **Create image of MagicDashboard**
  - If you're worried about losing any data that you might have stored on your Raspberry Pi (e.g., custom scripts, pictures, etc.) or if you just want to make a backup image so that you don't have to start from scratch if your SD card fails, you can create an image of your Raspberry Pi.
  - I used **dd** on MacOS to create a backup image for my Magic Dashboard image ([see instructions here](https://www.cyberciti.biz/faq/how-to-create-disk-image-on-mac-os-x-with-dd-command/)). There is a Windows version of the same thing (Win Disk Imager), but the site is a little sketchy and I can't recommend using it. This process took almost 12 hours, and my SD card is only 32 GB large, so you can use that as comparison for how long it might take in your case.
  - `dd if=/dev/DISK of=image.dd bs=4`

  - Note: You should make copies of your data (e.g., custom scripts, pictures, etc.) as often as you can to avoid data loss. You can do so in a variety of different ways, and the main way that I maintain my data is to have the master copies on my main PC and copy them over to my Raspberry Pis when needed using WinSCP (Windows) or Filezilla (MacOS). You can also use Github to store your scripts, which has the added benefit of source control in the case that you're making multiple versions of scripts.

{:start="2"}
2. **Create better scheduled executions**
  - I had issues SSH'ing into the Pi because the MagicMirror software was starting up each time it was rebooting, so I only had a small window to access the Pi and disable this before it would get frozen again. To counteract this, I changed the automated cron jobs to start the software at 7 AM (which is a little earlier than I usually wake up) and to perform a reboot at 12 AM (which is around the time I go to sleep, since I figure I don't need this to run while I'm sleeping). I've updated the main guide to include the lessons learned from this oversight, but here's how you do it:

  - Edit the crontab for the root user
    - `sudo crontab -e`

  - Add the following entries (where mmstart.sh refers to the script to start the MagicMirror software)
    - `0 7 * * * sudo pm2 start /home/pi/mmstart.sh`
    - `0 0 * * * sudo reboot`

  - This means that if you ever have problems with freezing, you can unplug the Pi (not usually recommended, but the only thing you can do if you're unable to access it) and plug it back in, and the software won't run automatically until 7 AM during the current or following day so that you can have time to troubleshoot.

{:start="3"}
3. **Update software**
  - Sometimes, software updates can fix bugs which cause things to freeze up. For the MagicMirror software and any modules you've installed, you can update them by going to the directory that you installed it in, and then using these commands:
    - `git pull`
    - `npm install`

  - Depending on the last time you performed this update, you'll also probably need to run `npm audit` and `npm audit fix`. Before you run `npm audit fix --force`, you should check to see why those updates could potentially break something.
  - You should try to do this every few months or so, and I've neglected to do it for much longer than a few months. Always check what is being changed in [the Releases section](https://github.com/MichMich/MagicMirror/releases) (usually you can just check for the "high level" stuff) to see if anything being updated may break something that you've configured specially.

{:start="4"}
4. **Make better enclosure for the hardware**
  - I noticed that the Raspberry Pi Zero was getting pretty hot, but when checking forums for optimal operating temperatures, the Pi never got to dangerously hot levels according the "experts". Nonetheless, I decided to buy a better enclosure with more airflow just to rule this out as a possible cause for issues with temperature. <insert picture of enclsoure>

  - Here's [the link to what I bought](https://www.amazon.com/gp/product/B07CTG5N3V/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1). This is especially useful if you have multiple Raspberry Pis. The fan at the top above the Raspberry Pi Zero isn't actually plugged in because you need to solder to GPIO pins in order to do that (which I'm too lazy/inept to do right now), but the ones on the levels below are plugged in. Regardless, I feel like it gets enough air just by being exposed instead of being kept inside a case.

{:start="5"}
5. **Disable HDMI**
  - I got this one from a tip from an [article describing tips to improve Raspberry Pi performance](https://peppe8o.com/4-tricks-to-improve-raspberry-pi-performance-and-power-consuption/). I don't know how much it actually impacts performance, but you may as well do it if you don't need to output anything through HDMI.
