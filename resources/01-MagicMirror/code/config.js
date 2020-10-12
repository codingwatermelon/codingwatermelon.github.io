/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "192.168.90.224", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out or empty, is "localhost"
	port: 8080,
	//ipWhitelist: [],
	ipWhitelist: ["192.168.90.84", "192.168.90.165", "192.168.90.224", "127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	timeFormat: 24,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "clock",
			position: "top_left"

		},
		{
			module: 'MMM-SmartWebDisplay',
			position: 'bottom_right',
			config: {
				logDEbug: false,
				//height: "275px",
				//width: "375px",
				height: "750px",
				width: "1000px",
				updateInterval: 0,
				NextURLInterval: 0,
				displayLastUpdate: false,
				url: ["http://192.168.90.218:8081"],
				shutoffDelay: 10000

			}
		},
		{
			module: 'MMM-MicrosoftToDo',
			position: 'top_left',
			header: 'Task List',
			config: {
				oauth2ClientSecret: 's-TMpw]1kSy]wqbj?bNl3FAXl4F7kUn4',
				oauth2RefreshToken: 'MCbgOdyL72L4xujlq*Nirq8rFQBLlZVUctzSVRY2Jw8RTftu2a6RJ0DzvSGK51rgQxLrMTkPSRAR!9vNOCjnRp1pzH9D4A1QvWoH0JkY5*QoGKPk5DmhCU*fwChDAo44dI!l6JP2qISOsA7mpui0Bm7IN!qilWz7gd3MVKguJkBAgwglihk*Ji0pTRyctYm!mmkMqO0bAb5w*TG!Lai!v*GXBNeb8qpZ5*gLK23MYltDGfHMYSTTemJwdqFlcyCSXp1XNwSEJHCgysqNhis9o9gmz!606wlsPqprPGlDV!37Q!gY3GDHhw5CM!zl*vwMTzU1ubO7eUGEz*VBFoOA5*Ee5W2C5pjAYtw3O6x0LbM1*lIemiThpbg9GHvRPgxguLWwFeay448jZV7**SGrj0YYFW*Va0T9JyltHSCq2jHRU',
				oauth2ClientId: 'b7809014-0e97-45e5-934d-12e005989dbc',
				listId: 'AQMkADAwATMwMAItZDE3NC04ZGIwLTAwAi0wMAoALgAAA5xW9ScynKZAl6KRnYxA_zEBAEJgWa_uuMhKtmNJGgQJ-1MABCQXtAEAAAA=',
				showCheckbox: true,
				hideIfEmpty: false,
				maxWidth: 450,
				itemLimit: 200,
				orderBy: 'subject'
			}
		},
		{
			module: "MMM-AVStock",
			position: "top_left",
			config: {
				apiKey: "3QOJHNU3PXFCBMAA",
				symbols: ["TSLA", "DIS", "AAPL", "VTI", "SPY"]
			}

		},
		{
			module: 'MMM-BackgroundSlideshow',
			position: 'fullscreen_below',
			config: {
				imagePaths: ['modules/MMM-BackgroundSlideshow/testImages/'],
				transitionImages: true,
				randomizeImageOrder: true,
				slideshowSpeed: 300000,
				gradient: [ "rgba(0, 0, 0, 0.75) 80%", "rgba(0, 0, 0, 0) 20%" ],
				gradientDirection: ['both']
				//validImageFileExtensions: 'jpg,jpeg,JPEG,png',
				//showProgressBar: true
			}
		},
		{
			module: 'on-this-day',
			position: 'bottom_bar',
			config: {
			    updateInterval: 600000,
			    interests: ['history']
			}
		},
		{
			module: "alert",
		},
		//{
		//	module: "updatenotification",
		//	position: "top_bar"
		//},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"					
					},
				],
				maximumEntries: "3"
			}
		},
		{
			module: "calendar",
			header: "Daily Events",
			position: "top_left",
			config: {
				calendars: [
					{
						url: 'https://calendar.google.com/calendar/ical/jtorres7797%40gmail.com/private-68abb9e022613183a319fb380769dc2e/basic.ics'
					}
				],
				maximumEntries: "7"
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Honolulu",
				locationID: "5856195", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "2d05b29c0378fc224425cd288f11994f",
				showFeelsLike: false
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Honolulu",
				locationID: "5856195", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "2d05b29c0378fc224425cd288f11994f"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
