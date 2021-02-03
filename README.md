# DinoKnob

Knob/Dial Control and Power Button with mouse, wheel, touch and keyboard (← ↑ → ↓ ) support.

## Example Page
Live example page: [https://mcx-systems.net/DinoKnob](https://mcx-systems.net/DinoKnob/)

## Supported Browser
DinoKnob as generated in examples/index.html \
Tested in latest Edge, Chrome, Firefox, Opera, Safari and Mobile Safari \

- Canvas-based, no image files required.
- Mouse, wheel, touch and keyboard controls.

Based on [https://github.com/tutorialzine/KnobKnob](https://github.com/tutorialzine/KnobKnob) \
Thank You ...

Example for dinoKnob control
------------------------

```script
$(document).ready(function ()
{
	$('#KnobTest1').dinoKnob({
		snap: 10,
		// Knob Display Max Value as 100%
		maxValue: 100,
		// Max ColorBar Angle
		maxAngle: 255,
		// Theme Light or Dark
		theme: 'light',
		// Circle Bar style Hot, Cold or Mono
		barStyle: 'mono',
		// Event on knob turn - change
		onTurn: function (percent, degree, ratio)
		{
			// Do what you want here. Ratio moves from 0 to 1
		    // relative to the knob rotation. 0 - off, 1 - max
			console.log(percent);
			console.log(degree);
			console.log(ratio);

			$("#per1").val(percent);
			$("#des1").val(degree);
			$("#rat1").val(ratio);
		},
		onComplete: function (state)
		{
			// Return Button State true or false
			console.log(state);
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
