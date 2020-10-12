#! /usr/bin/python

# Imports
import RPi.GPIO as GPIO
import time
import requests
import os
import subprocess
import signal

p = subprocess.Popen(['sh', '/home/pi/Desktop/chromium_start.sh'], preexec_fn=os.setsid)

# Set the GPIO naming convention
GPIO.setmode(GPIO.BCM)

# Turn off GPIO warnings
GPIO.setwarnings(False)

# Set a variable to hold the GPIO Pin identity
pinpir = 17

# Set GPIO pin as input
GPIO.setup(pinpir, GPIO.IN)

# Variables to hold the current and last states
currentstate = 0
previousstate = 0

try:
	print("Waiting for PIR to settle ...")

	# Loop until PIR output is 0
	while GPIO.input(pinpir) == 1:

		currentstate = 0

	print("    Ready")

	# Loop until users quits with CTRL-C
	while True:

		list = []

		# Get current time
		t = time.localtime()
		current_time = time.strftime("%M", t)

		# Only detect motion if detected 2 times in 2 sec (decreases sensitivity)
		for i in range(2):

			# Read PIR state
			currentstate = GPIO.input(pinpir)

			list.append(currentstate)

			time.sleep(0.25)


		# If the PIR is triggered
		if list.count(0) == 0:

			print("Motion detected!")

			# Your IFTTT URL with event name, key and json parameters (values)
			os.system('xscreensaver-command -deactivate')

			# Record new previous state
			#previousstate = 1

			#Wait 60 seconds before looping again
			print("Waiting 60 seconds")
			time.sleep(60)
			os.system('xscreensaver-command -activate')

		# Reload browser every hour
		if current_time == "00":

			print("Restarting browser")
			os.killpg(os.getpgid(p.pid), signal.SIGTERM)

			p = subprocess.Popen(['sh', '/home/pi/Desktop/chromium_start.sh'], preexec_fn=os.setsid)

		# Wait for 1 second
		time.sleep(1)

except KeyboardInterrupt:
	print("    Quit")

	# Reset GPIO settings
	GPIO.cleanup()
