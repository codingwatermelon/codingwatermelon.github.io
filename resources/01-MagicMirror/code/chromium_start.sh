#!/bin/sh
unclutter &
xset -dpms # disable DPMS (energy start) features
xset s off # disable screen saver
xset s noblank # dont blank video device
matchbox-window-manager &
chromium-browser -incognito -kiosk http://localhost:8080/
