# DinoKnob
Knob/Dial Control and Power Button with mouse, wheel, touch and keyboard (← ↑ → ↓ ) support.

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/MCX-Systems/DinoKnob/graphs/commit-activity)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fmcx-systems.net%2FDinoKnob)
![GitHub last commit](https://img.shields.io/github/last-commit/MCX-Systems/DinoKnob)
![GitHub issues](https://img.shields.io/github/issues-raw/MCX-Systems/DinoKnob)
![GitHub pull requests](https://img.shields.io/github/issues-pr/MCX-Systems/DinoKnob)

![CRAN/METACRAN](https://img.shields.io/cran/l/devtools)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/MCX-Systems/DinoKnob)
![npm bundle size (version)](https://img.shields.io/bundlephobia/min/dino-knob/2.07.2021)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/MCX-Systems/DinoKnob)
![GitHub forks](https://img.shields.io/github/forks/MCX-Systems/DinoKnob?style=social)

## Example Page
Live example page: [https://mcx-systems.net/DinoKnob](https://mcx-systems.net/DinoKnob/)

## Preview Page Screenshot
![Screenshot](screenshot.jpeg)

## Supported Browser
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | 8.0+ ✔ |

Tested in latest Edge, Chrome, Firefox, Opera, Safari and Mobile Safari \

- Canvas-based, no image files required.
- Mouse, wheel, touch and keyboard controls.

## Install
You can install through [npm](https://npmjs.com) and use [browserify](https://browserify.org) to make it run on the browser.
```bash
npm install --save dino-knob
```

Or just download the minified version
[here](https://raw.githubusercontent.com/MCX-Systems/DinoKnob/master/dist/dinoKnob.min.js).

Events / Actions
----------------
- Normal left click / drag / touch changes value, releasing button commits value.
- Pulling mouse / touch outside the element before release restores back to old value.

## Functions
- 5 x Timer Output Switch - 15 seconds, 1 minute, 5 minutes, 10 minutes, 15 minutes / all preset \
- 1 x Button Output Switch ON / OFF \
- 1 x Range Knob / Can be used as Lights DIMMER - Output values from 0 - 100% and 0 to 255 PWM

Example for dinoKnob control
------------------------

```js
$(document).ready(function()
{
	$('#KnobTest1').dinoKnob({
		// Theme Light or Dark
		// set's the shadow of knob
		theme: 'light',
		// Knob main background color
		knobBgColor: null,
		// Circle range Bar style: (Hot, Cold or Mono,
		// yellow, blue, red, green) color
		barStyle: 'hot',
		/*---------------------------------------------*/
		// Show Knob Value overlay
		// on hover button #dinoKnobMenu2
		showLabel: false,
		// Step Value of the knob range when using
		// mouse wheel or keyboard control
		snap: 0,
		// Knob current value we start with 0
		// It can be set at runtime
		value: 0,
		// Knob Min Value starts with 0
		// can't be a negative number
		minValue: 0,
		// Knob Max Value
		// also maxAlarm depends on this value
		maxValue: 100,
		/*---------------------------------------------*/
		// Enable Alerts for overdrive on knob range
		showAlert: false,
		// Alarm icon
		// Value to activate alarm depends on Max value
		maxAlarm: 500,
		/*---------------------------------------------*/
		// Enable Timer Button
		showTimer: false, // default
		// Preset timer 1 to 15 seconds
		timer_1: 15, // seconds
		// Preset timer 2 to 1 minute
		timer_2: 60, // seconds
		// Preset timer 3 to 5 minutes
		timer_3: 300, // seconds
		// Preset timer 4 to 10 minutes
		timer_4: 600, // seconds
		// Preset timer 5 to 15 minutes
		timer_5: 900, // seconds
		/*---------------------------------------------*/
		// Plugin language automatic
		// detection at runtime from browser
		language: null,
		// Enable plugin debug
		debug: false,
		/*---------------------------------------------*/
		// Event on knob turn - change
		onTurn: function(dinoId, percent, degree, ratio)
		{
			console.log(dinoId + ' ==> PERCENT ==> ' + percent);
			console.log(dinoId + ' ==> DEGREE ==> ' + degree);
			console.log(dinoId + ' ==> RATIO ==> ' + ratio);

			$("#per1").val(percent);
			$("#des1").val(degree);
			$("#rat1").val(ratio);
		},
		onComplete: function(dinoId, state, timerState)
		{
			// Return Button State true or false
			console.log(dinoId + ' ==> BUTTON ==> ' + state);
			console.log(dinoId + ' ==> TIMER ==> ' + timerState);
			
			$("#sta1").val(state);
			$("#stu1").val(timerState);
		}
	});

	// Depends on maxAngle, set to max of 255 default
	$("#KnobTest1 input[type=checkbox]").prop('checked', true).trigger('change');
	$("#KnobTest1 input[type=hidden]").val(255).trigger('change');
	//$('#KnobTest1').data('plugin_dinoKnob').destroy();
});
```

You may update both the maxAngle value \
(`$("#KnobTest1 input[type=hidden]").val(255).trigger('change');`) \
and the button state value \
(`$("#KnobTest1 input[type=checkbox]").prop('checked', true).trigger('change')`) \
programmatically in your script to display new values.

Return values from example
----------

- `id`:
- `state`: 
- `percent`: 
- `degree`:
- `ratio`: 
- `timer`:

## Credits
- Based on [https://github.com/tutorialzine/KnobKnob](https://github.com/tutorialzine/KnobKnob)
- Icon Fonts created with [Fontello Icons](https://fontello.com)
