#!/bin/bash
cd /home/pi/MagicMirror
node serveronly &
sleep 30
xinit /home/pi/chromium_start.sh
