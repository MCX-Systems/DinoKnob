# DinoKnob
Knob/Dial Control and Power Button with mouse, wheel, touch and keyboard (← ↑ → ↓ ) support.

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
[here](https://raw.githubusercontent.com/MCX-Systems/DinoKnob/master/build/dist/dinoKnob.min.js).

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
		theme: 'dark',
		// Step Value of the Knob
		snap: 5,
		// Knob Display Max Value as 100%
		maxValue: 100,
		// Max angle value, for alarm icon
		maxAlarm: 200,
		// Circle Bar style Hot, Cold or Mono, yellow, blue, red, green
		barStyle: 'blue',
		// Enable Timer Button
		showTimer: true,
		// Enable Alerts Button
		showAlert: true,
		// Enable Labels Button
		showLabel: true,
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

Properties
----------

- `snap`: 
- `minValue`: 
- `maxValue`: 
- `maxAngle`: 
- `theme`: 
- `barStyle`: 
- `onComplete`: 
- `onTurn`: 

Return values from example
----------

- `state`: 
- `percent`: 
- `degree`:
- `ratio`: 

## Credits
- Based on [https://github.com/tutorialzine/KnobKnob](https://github.com/tutorialzine/KnobKnob)
- Icon Fonts created with [Fontello Icons](https://fontello.com)