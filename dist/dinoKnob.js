/*
 * DinoKnob
 *
 * JQuery and CSS3 based UI-Knob element implementing touch,
 * keyboard, mouse and scroll wheel support.
 *
 * Created by 2007 - 2021 MCX-Systems
 */
'use strict';

;(function(jQuery, window, document, undefined)
{
	/*
	 * Store the name of the plugin in the "pluginName" variable. This
	 * variable is used in the "Plugin" constructor below, as well as the
	 * plugin wrapper to construct the key for the "$.data" method.
	*/
	let pluginName = 'DinoKnob';

	/*
	 * The "Plugin" constructor, builds a new instance of the plugin for the
	 * DOM node(s) that the plugin is called on.
	*/

	// Create the plugin constructor
	function Plugin(element, options)
	{
		/***************************************************************************/

		jQuery.event.special.touchstart = {
			setup: function (_, ns, handle)
			{
				this.addEventListener('touchstart', handle, {passive: !ns.includes('noPreventDefault')});
			}
		};

		jQuery.event.special.touchmove = {
			setup: function (_, ns, handle)
			{
				this.addEventListener('touchmove', handle, {passive: !ns.includes('noPreventDefault')});
			}
		};

		/***************************************************************************/

		/*
		 * Provide local access to the DOM node(s) that called the plugin,
		 * as well local access to the plugin name and default options.
		*/
		this.element = element;
		/***************************************************************************/
		this._uId = this.createUniqId(8);
		this._name = pluginName;
		this._flag = false;
		this._version = 'V2.02.2021';
		this._language = this.getUserLanguage()
		/***************************************************************************/
		// DinoKnob circle Bars color set
		this._knobColorThemes = [
			[
				'rgb(38,224,0)', 'rgb(47,227,0)', 'rgb(55,231,0)', 'rgb(69,234,0)', 'rgb(81,239,0)',
				'rgb(97,248,0)', 'rgb(107,251,0)', 'rgb(119,255,2)', 'rgb(128,255,5)', 'rgb(140,255,9)',
				'rgb(147,255,11)', 'rgb(158,255,9)', 'rgb(255,255,53)', 'rgb(255,255,51)', 'rgb(255,255,51)',
				'rgb(242,255,10)', 'rgb(255,243,10)', 'rgb(255,220,9)', 'rgb(255,206,10)', 'rgb(255,195,10)',
				'rgb(255,181,9)', 'rgb(255,168,8)', 'rgb(255,153,8)', 'rgb(255,134,7)', 'rgb(255,112,5)',
				'rgb(255,95,4)', 'rgb(255,79,3)', 'rgb(248,58,0)', 'rgb(238,43,0)', 'rgb(229,32,0)'
			],
			[
				'rgb(66,159,245)', 'rgb(66,159,245)', 'rgb(88,169,243)', 'rgb(88,169,243)', 'rgb(88,169,243)',
				'rgb(107,180,248)', 'rgb(107,180,248)', 'rgb(107,183,248)', 'rgb(107,183,248)', 'rgb(107,183,248)',
				'rgb(107,187,248)', 'rgb(107,187,248)', 'rgb(134,198,248)', 'rgb(134,198,248)', 'rgb(134,198,248)',
				'rgb(158,209,248)', 'rgb(158,209,248)', 'rgb(216,248,158)', 'rgb(216,248,158)', 'rgb(216,248,158)',
				'rgb(211,250,138)', 'rgb(211,250,138)', 'rgb(202,248,117)', 'rgb(202,248,117)', 'rgb(202,248,117)',
				'rgb(192,248,90)', 'rgb(192,248,90)', 'rgb(197,251,98)', 'rgb(197,251,98)', 'rgb(197,251,98)'
			],
			[
				'rgb(255,255,204)','rgb(255,255,204)','rgb(255,255,204)','rgb(255,255,204)','rgb(255,255,204)',
				'rgb(255,255,153)','rgb(255,255,153)','rgb(255,255,153)','rgb(255,255,153)','rgb(255,255,153)',
				'rgb(255,255,102)','rgb(255,255,102)','rgb(255,255,102)','rgb(255,255,102)','rgb(255,255,102)',
				'rgb(255,255,51)','rgb(255,255,51)','rgb(255,255,51)','rgb(255,255,51)','rgb(255,255,51)',
				'rgb(255,255,0)','rgb(255,255,0)','rgb(255,255,0)','rgb(255,255,0)','rgb(255,255,0)',
				'rgb(252,244,0)','rgb(252,244,0)','rgb(252,244,0)','rgb(252,244,0)','rgb(252,244,0)'
			],
			[
				'rgb(212,249,168)','rgb(188,248,147)','rgb(159,246,126)','rgb(192,236,133)','rgb(176,233,114)',
				'rgb(158,230,96)','rgb(139,227,78)','rgb(124,244,105)','rgb(85,242,84)','rgb(118,224,61)',
				'rgb(82,240,64)','rgb(82,240,64)','rgb(82,240,64)','rgb(82,240,64)','rgb(82,240,64)',
				'rgb(112,239,61)','rgb(70,217,25)','rgb(44,214,7)','rgb(62,204,2)','rgb(78,193,0)',
				'rgb(14,196,34)','rgb(12,183,13)','rgb(25,169,10)','rgb(36,155,8)','rgb(46,141,6)',
				'rgb(10,157,28)','rgb(12,160,13)','rgb(27,134,12)','rgb(38,140,14)','rgb(38,140,14)'
			],
			[
				'rgb(255,255,252)','rgb(255,255,236)','rgb(255,255,219)','rgb(255,255,202)','rgb(255,255,185)',
				'rgb(255,255,185)','rgb(255,255,168)','rgb(255,255,152)','rgb(255,255,135)','rgb(255,255,118)',
				'rgb(255,255,101)','rgb(255,255,84)','rgb(255,255,67)','rgb(255,255,51)','rgb(255,255,34)',
				'rgb(255,255,17)','rgb(255,254,0)','rgb(255,251,0)','rgb(255,247,0)','rgb(255,243,0)',
				'rgb(255,239,0)','rgb(255,234,0)','rgb(255,228,0)','rgb(255,222,0)','rgb(255,216,0)',
				'rgb(255,209,0)','rgb(255,201,0)','rgb(255,194,0)','rgb(255,185,0)','rgb(255,177,0)'
			],
			[
				'rgb(143,199,255)','rgb(133,195,255)','rgb(124,190,255)','rgb(114,185,255)','rgb(105,181,255)',
				'rgb(95,176,255)','rgb(86,172,255)','rgb(76,167,255)','rgb(67,163,255)','rgb(58,158,255)',
				'rgb(51,153,255)','rgb(44,149,255)','rgb(38,144,255)','rgb(32,140,255)','rgb(27,136,255)',
				'rgb(21,131,253)','rgb(20,125,246)','rgb(19,119,238)','rgb(18,113,231)','rgb(17,108,223)',
				'rgb(16,102,216)','rgb(15,97,208)','rgb(14,91,200)','rgb(14,86,192)','rgb(13,81,185)',
				'rgb(12,76,177)','rgb(11,71,169)','rgb(10,66,161)','rgb(10,62,153)','rgb(9,57,146)'
			],
			[
				'rgb(255,146,143)','rgb(255,137,133)','rgb(255,130,124)','rgb(255,122,114)','rgb(255,114,105)',
				'rgb(255,107,95)','rgb(255,100,86)','rgb(255,93,76)','rgb(255,86,67)','rgb(255,79,57)',
				'rgb(255,73,48)','rgb(255,66,38)','rgb(254,60,29)','rgb(251,54,21)','rgb(248,49,15)',
				'rgb(244,43,9)','rgb(237,43,8)','rgb(230,44,8)','rgb(223,44,7)','rgb(215,44,7)',
				'rgb(208,44,6)','rgb(201,44,5)','rgb(187,44,4)','rgb(179,43,4)','rgb(172,43,4)',
				'rgb(165,42,3)','rgb(157,42,3)','rgb(150,41,2)','rgb(142,40,2)','rgb(135,39,2)'
			]
		];
		/***************************************************************************/
		jQuery(this.element).append(this.createKnobWidget());
		jQuery(this.element).find('#dinoKnobValue-' + this._uId).html("0");
		jQuery(this.element).find("#dinoKnobValueRaw-" + this._uId).val("0");
		/***************************************************************************/
		this._buttonState = false;
		this._timerState = 0;
		/***************************************************************************/
		this._powerButtonInput = jQuery(this.element).find('#dinoKnobSwitchInput-' + this._uId);
		this._knobTop = jQuery(this.element).find('#dinoKnobTop-' + this._uId);
		this._timersLi = jQuery('#dinoKnobTimers-' + this._uId);
		this._bars = jQuery(this.element).find('#dinoKnobBars-' + this._uId);
		/***************************************************************************/
		this._rad2deg = 180 / Math.PI;
		this._deg = 0;
		this._angle = 0;
		/***************************************************************************/
		this._startDeg = -1;
		this._currentDeg = 0;
		this._rotation = 0;
		this._lastDeg = 0;
		this._colorBarTheme = [];
		/***************************************************************************/
		this._defaults = jQuery.fn.dinoKnob.defaults;
		/***************************************************************************/

		/*
			The "$.extend" method merges the contents of two or more objects,
			and stores the result in the first object. The first object is
			empty so that we don't alter the default options for future
			instances of the plugin.

			More: http://api.jquery.com/jquery.extend/
		*/
		this.options = jQuery.extend({}, this._defaults, options);

		/*
			The "init" method is the starting point for all plugin logic.
			Calling the init method here in the "Plugin" constructor function
			allows us to store all methods (including the init method) in the
			plugin's prototype. Storing methods required by the plugin in its
			prototype lowers the memory footprint, as each instance of the
			plugin does not need to duplicate all of the same methods. Rather,
			each instance can inherit the methods from the constructor
			function's prototype.
		*/
		let widget = this;

		/***************************************************************************/

		if (!widget.options.language)
		{
			widget.options.language = widget._language;
		}

		if (!widget._flag)
		{
			widget.init();
			widget._flag = true;
		}

		/***************************************************************************/
	}

	// Avoid Plugin.prototype conflicts
	jQuery.extend(Plugin.prototype,
		{
			// Initialization logic
			init: function ()
			{
				let widget = this;
				/*
					Note, you can access the DOM node(s), plugin name, default
					plugin options and custom plugin options for a each instance
					of the plugin by using the variables "this.element",
					"this._name", "this._defaults" and "this.options" created in
					the "Plugin" constructor function (as shown in the buildCache
					method below).
				*/
				widget.buildCache();
				widget.bindEvents();

				if (widget.options.debug)
				{
					console.info('--------------------------------------------');
					console.info('--------------------------------------------');
					console.info(widget.capitalizeFirstLetter(widget._name) + ' ' + widget._version + ' successfully initialized and is ready.');
					console.info('Language is set to: ' + widget.options.language);
					console.info('Uniq ID generated: ' + widget._uId);
					console.info('--------------------------------------------');
					console.info('--------------------------------------------');
				}

				widget.initKnob();
			},

			/***************************************************************************/

			createKnobWidget: function ()
			{
				return '<article id="dinoKnob-' + this._uId + '" class="dinoKnob">' +

				'<div id="dinoKnobBars-' + this._uId + '" class="dinoKnobBars"></div>' +

				'<div id="dinoKnobMain-' + this._uId + '" class="dinoKnobMain">' +

				'<section id="dinoKnobTop-' + this._uId + '" class="dinoKnobTop"></section>' +

				'<section id="dinoKnobSwitch-' + this._uId + '" class="dinoKnobSwitch">' +

				'<label for="dinoKnobSwitchInput-' + this._uId + '"></label>' +

				'<input id="dinoKnobSwitchInput-' + this._uId + '" type="checkbox" />' +

				'<div id="dinoButton-' + this._uId + '" class="dinoButton">' +

				'<svg id="dinoPower-off-' + this._uId + '" class="dinoPower-off">' +

				'<use xlink:href="#dinoLine-' + this._uId + '" class="dinoLine"/>' +

				'<use xlink:href="#dinoCircle-' + this._uId + '" class="dinoCircle"/>' +

				'</svg>' +

				'<svg id="dinoPower-on-' + this._uId + '" class="dinoPower-on">' +

				'<use xlink:href="#dinoLine-' + this._uId + '" class="dinoLine"/>' +

				'<use xlink:href="#dinoCircle-' + this._uId + '" class="dinoCircle"/>' +

				'</svg>' +

				'</div>' +

				'</section>' +

				'<section id="dinoKnobValue-' + this._uId + '" class="dinoKnobValue dinoAnimated"></section>' +

				'<nav id="dinoKnobTimers-' + this._uId + '" class="dinoKnobTimers dinoAnimated">' +

				'<ul>' +

				'<li><button id="dinoTimer1-' + this._uId + '" type="button" data-timer="1"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABVCAMAAADDsmKDAAAAWlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fV5R/tqAAAAHHRSTlMA8EAwEMDQgKDgIHBgkFCwIOvA0EAQoJCAcGCvwTymDAAAA1hJREFUWMPNl9maoyAQhWVfxV5m7am8/2sOSyIiCB2mL+Zc+CVgfqmqQwWXvqhh4MVXvfyDBPIIxgJqpbMQygEJHT9ZBYpMUzjdv0hAc+tZQR6/SmAzFAyqfDwDO4GR4MoBDXwCA+o8sgGZiGn1CyCY4HTxBAt2AmO8bxgwuF/CkJjAuK/BiK/AEJBnjAC3PC2EaEixEdYI40KKOdAZE5tY9ygcwpyysUZIHzFU+euEDHCaMXTzRpqSBIUfGM0DdCjdTg9sCcP8pxblNEaQbJpHwV2quQ8sIiUF5JULo0x71gIiBWWTdKZXm8jJlFYGqROSqRgS24TVjRrwxMkUOHG04HASX8mJAomTKUHuEDSHppShB39C5uidYvQOUXApJOge84FDudwShd+jxPzwdLaKIHYcc4nCkY0cZjlNYUUKxNXRdb99dcdsuXVfI6OBAhA4RakCxUsthEOSdI0eJB+R4WUDSJyjcZwnBTBBd8ixurfb+9vPj5eY1gfIpjsdOT3NBYq9h1N2hFvS++/vAcQgygSObRj7Qakawm3Xj7AkA1GCINvZP6hKyi3rdS9Jcyl51ie+g/mVap3tWonyilJhXst7dbNHJUoP821/pooGvkqMW3qYtyIDzTakUo26mJeiYwHUBzCTFtnF/CxGo41lazG4i3n9XpYkhqVL7yV0F/O7FYCsF6O7mPfKIeicHZLBDeVilxLRy2fPkC7mT8Ow4LWdYlLLlYpiV8U6NOfomS7mV2vClY61udot5WK3olrL1Cw9zEd7hgMczk4sf2up2EzVHx4qMrz1MN8uZkQRBniJDubH1YzLRhlj3l6uZnBRm9w6Bhpj3NdgxH+FWeeOzl60tN9AY99s1QYfKj+fl1A9gSm7HZ4yTv273MbG6jTNbSaqumnaKee4yihoplasikGCl51IcGk3Xf2xj8UaHVw+sSE6hwcNBXssjZo/EE+GxS+8lo5hn+XIq8MfgSD5hH/bpTWf54jerXJ/PRlGlBLQnVakD6GsT1noBjDcXQ5lSn+5wPGlXRhkSi95SawJwhKShm/tGO3viOS0EMMhCdllKCrhIbQJh7UfwlhItQ8z/bkOwKAj5YaAMUg915TIqmoGknh5WsRs6oBgAi/Twhhb4y+DAv8FPhd9obWJKwwAAAAASUVORK5CYII=" alt="Timer-1" /></button></li>' +

				'<li><button id="dinoTimer2-' + this._uId + '" type="button" data-timer="2"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABUCAMAAADj2QolAAAAZlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fXMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fVcDRnpAAAAIHRSTlMA8BCAwKBAYNAwIOBAP1CwcJDi8dDAMMaxUBCgiHDZYLvaFgYAAAN7SURBVFjDrZfrepswDIblIz50BpK2a7t2E/d/k6vBicAxTsz2/UjLE/xG+iT5saEuqzwisr7jcFhOIqKU0n+DwlGIZehDCglRHYYIejDHMJxht340OBygCBy3JjHGD4SSLxIHggk45lw0BxLSANppZ7WNHw5AYiMjLUGBQqKMHwJgRP0fKKKd0iPPKQp5uy8hp5h2XzSq6G7oBjGIEN11KKFZHt0Mi5qXK+zaKQP2G4pGDwdkUBElzqY+NI4ee36hBPZIPq6EMcj6meIlFiF8W/oOQ7HcDJOkLf6M4RsIs+WsxBKLg6IURgxBuhHaZccZQxBW2BBdJ6ScczJSCV3aUtWMIQhmmKA8ZpIDzyCYMARBs7bDY1G9XpuJVwxB7JWhGO5KXjmOMGC9XiCapZSGFcP0ImqUbMVxKSG1YIRSc2gLZHHGmitB6I3VFOGQXJkxVKQImbHQpVfZWGiRTl7s4ZwhRsy6YQIfccaqxBCrajxN08vb5xNE6cTxds6GucCzNiSImr8iyqK39/iUgmURU2h4lSB0PCBK0ukrVrC/YMpTs0CMgyKF4hkSZme/jpIcKpTT9PZx6TfPi9s1LmNQobxE0Ovl3b540KDi7/lyjp/n10s0Q9EUCrJM+bn8iRixFLqYj4Ua5XmaCCNLOcmlde9S0n8fyQF9G4qHCiXmQ/qVrJG3oegq5XyaVnoqrLHELVCoyqRTil8BaZyxVcoSCekPgMdvrarqyZUihVyhYJIz3dZbUaFQfUjvwK/FpgmyVcpvWk5litPNNhXyUKFQPqTzMtz064zMLlPO5+lWr2DXw8T3bKEdcyroCyAtJHN1hXKaSvoEMEubEcVWKM9FystiqFyXCPYpBMkoc7eaBymnMuVEKx+gfPzYUZnSLrFqu0BT1SiZ10j/K8XSbLYob/pIGZsRedMbKnuTwsYKddDecbOuO2iMX+dAm1abdOZnj99yrRRFqygl1QhxSAlR4RlvDSV3UzQFQ73KstNL6xTQ+SAPxjTkNBTPO74tJ4tRoVD8htbjfud8IBow3OBeUSVhHoKgrnx3H+OqL1pGt4CKAsM0QFWM0bVsRsRqOemKpfYm83p/Gqq+SaxxOo+z2D3zBCbJLvNHX698xsI9aUN3z3HQOiaqg+jp/in4QyPCsCLpHu1vsctRTXMf+gLCDw4axcMo14S+gvgLfoSylfQR85kAAAAASUVORK5CYII=" alt="Timer-2" /></button></li>' +

				'<li><button id="dinoTimer3-' + this._uId + '" type="button" data-timer="3"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABUCAMAAADj2QolAAAAdVBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fXMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fV7aqUwAAAAJXRSTlMA8IBgQBAwwKDQIHDg8VCwkMDkz6DQxJAwIODJfxDZcD+wT2CXe99PeQAAA+lJREFUWMOtl2t3oyAQhgeQi5eobZpk0zZtt7vj//+JawDBcDvVs+8HI/H4wLwzjghlVYrgrE41sFuNRCQDpXJGKb4TIgjKypyyDutmL4S6AVdY71pNjWw9VDjsgLQ4hNRqO6XDJsjXjsUIVDF3R0AMgFWUUXsAGLeHRO+3SIoS7WEG/xcK+y8Uup3SIw0pA24uX44dgGj6lraMtpVo9D+bpbDXRaJlYqTbKQIJd5RlvF0Ua+4pgui17YmpqxYKIz+JR0BCI2J3Z+gflkrBY9IYjsmGKdFqSCa5JuIBQkSubLQSDH+fH7Ahm4Ame0UMrcY4CEk0xIoOS0REqlYkWmqtMR6CAYYNGIqoPoCgwTjII6VRBJPqKF9THKZfIKQXjoF5EccRzGGAS6FrYmbZCCnxU0tKWVW1dJTEc5hdip1eMWXGGoI6QlG7EmEP+RWtuyK5u8kb4bEDMLIsvEnkfFyuVrAEsHJTiN74O/pFe03TdPr9+UuXPEUjpr0lQvCgDGeItjV6s09Gr5er3gE4TKrg2QIhYQeYnF7unHbBdMmnxkDivcHkdbzclkJBlnm0bO0VKKfpdfanMdmqYoadQQIUKOf74Q8A15iogy4Xal6iHA765wLQ2MIIRS29RHmyv+/3Xn5XmIfGRlqiPDvcH5upLphV94ERipS3yWm2WNcNjZdCeJFynLxeb6lblCmAIuVDH701NFwM10FCRs5ar+PHNb6pLS0FXJadzbNDLwAqSEhtQswoWMrBnF5NtpX31gxzeszy2Z6+28kfn6C+SDkthpxcmqy/wr+PZ/ES5WgNOU9ev8yGogUtU0A1ZOUCejpMK30CrEp1GWRlrX3TKK8XM71cU2ieorP8cZoCPQEob68JrypQzjq7kay9P6T8DQzZR3m3hsSUdgPlOOUobAPlMwbsiGh6K1LWmW4LlLQvR5vpLVUX63dQdWaQ1aq5BE8Asb3A98vic3ROUH6BeLCCle01rTvUqy0XsaFLnSLKJexS0OlhiRLHdLWTb+rez4coQzRokZpab3iT3L3lJIxAlvy1rf85aFE0aktV6bUWvKY18gYNiV8/UoPzlCDb3wBDmFj3rSqKlI/1W7pP7g9GHVN5F3T2pjQk+Qhzu8cq78gWCK9dVlMxqRzFZ/uyQEgDsWgOM3k9T4fvBYI95HfNAy9QTi9Xvd0t9TWJd3UiH9HXPOwJFp9ebjBI05SXO4OPWIT4oLCrQsrT5fumWxGJJkpabDkMnL6+bnatrHPfT2VVxH33Vo/h9gqtalFmmMCd5EgrLarq1Vcs/ESVxIKUrbX9nJhRVtN2MaJmHLaqYcp/ixM59nnEPxq/CqKr8Y/CAAAAAElFTkSuQmCC" alt="Timer-3" /></button></li>' +

				'<li><button id="dinoTimer4-' + this._uId + '" type="button" data-timer="4"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABVCAMAAAAohdmAAAAAb1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMyFlvTwAAAAI3RSTlMA8ECAEMBg0KAwIJBw4FDQwfFgQBCw3qCA5LAgMI9TPMmncA7+EEwAAAO5SURBVFjDxZfZwpowEIUnewgg7tba/Z/3f8bSTAImgbL0oudCVORj5pwhICxJ8l4S/klaoZfR+xmuZ7S1EML022onpGKoeOBZRL2vEobirTdEvoeisEksQiZ3GIsKEtUo9pTisswZ2wyRaCCT3e4MR9G/aKFFeAE4YLOd0h8nFCoMLwT+TxSRUw7bKQ5VTql3zJ2hpIWXf9uyPVNXQy/sRcPfoN1OkS0e3ikVYw62iyPjI6ViOy9qjShkoDRsTT8HOVUNQ0aU/s1kJTo7rZn0RjAk2UlParQJZLZp5VXNrob2HVLPravcayZGUxMmQhiyHCMPtWIYpax2BQSRMAMEU4zUBgu1jcsghBkgKcVZnJHiGYUw1QDRh4SxyKn0gOnT0jeCxOEUOMjUgtxtaoWDrAz5NB5jqppKI4iPu4p+MJtNIrcs7uIegh5j5NAhQdCAZsFIPSIulxeQBssF3PxWG4IQxnmrjKRusnH/6NU9zldfUBu7Mj4QKfPwjQy21umuj6Dj+c025UxINcXYAGGUVUoh3XtOdE7JWwEZz2IcFJRR3RcASZ7Y6cWBIBIKSqJP/i5JFpdyLIOUFNLna8RwKGQKSEkhdT2GJrX4deO/drBIIYxsfZh5Qr6fAyxSqKk+qaKn6NcNlinRYkpUpaVQm8uUqD7wtihGUHLrKR0AL4phVMpqSvc8h1RdNnAC1lKeXX8xAGjs1WTeupWU09FvztRBmzakYB3leApp5yfnsbRlSncf3l7pOJ3MbbWC8vxB29hSuLRHWxgsUk7UTNQDQI1OhA+LlOOzGJkae72baxcoXfeRi6wYKDQts6J0S73IXr6WQobkupQUPU/5SYaspHwsaZki/hflGihp0seNlLAsZVP32AbpaOgjJY7gr22Ur7ROqeRq5PDaRjmDTO4mVbD3vtHcQzpozD8BwactkLhKyXTFrLa1dAFJJx/Ew3Lz2JSQzq+clmp7bSglHlTc1TY4cwyl2PJm7+C6MqbTazhk1Hjv/rJ2VmhUbfFfk+4m5zWQRwgE3eRTXbXKmke0QGSQ+IxFmGXI3PObbOOO8+JVCCacslSFHlP1Ft//ks43qmR2qdYYz3D9Oo2gx1RnMMunxNB9//tkOcfLnxxYApnFKPeH0+W9PL74vwsYIUsYFN79b5+fJyLcj58uyd/0Gv4mHn7FageFXGQwDX+XVBhkmipBNLdhT7UAIfeimKqF4LwRtWrHL8UiIjY/L0utruK00whGjNU6WFYgbhq2q2qsiihlBYdZ/Qb600CdlvH+jQAAAABJRU5ErkJggg==" alt="Timer-4" /></button></li>' +

				'<li><button id="dinoTimer5-' + this._uId + '" type="button" data-timer="5"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABVCAMAAAAohdmAAAAAdVBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fXMzMwY+fXMzMwY+fXMzMzMzMzMzMwY+fUY+fXMzMwY+fUY+fUY+fUY+fXMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMzSSE3KAAAAJXRSTlMAQMCA8GCg0BDQMEDgwSBwkBDvsOTgjoBQYDBvUPGwyaAg2dhMRaLC2AAABGRJREFUWMPFmNtioyAQhgXEaOIxxpybJu067/+IKzA6IrC7phf7X6Sp4secGCTR31SyQdGPlIoctNofgM4xQCuEqPPhb/ompAKo8VmWw+Y9jIR4S74l72FKDSElUL9BaUHakc6hfMOU3PGwfiO01fJSnK+mJDBERTDBpJDqYygYDqvjy2H4AAGCA1cfYmAC+z+UBMolpYU3oiuXlDxeTdkC1wkXSrpyGLTRanFg+lElThdWiumFQ5TKsNaqHjBEkRCX0TtKIGdISRNrbYYk/daA6XXx8MUH2W4X01beRLVglAtvQ40tA8MtiHGl5I+NjCBVAJMypW0AsqkQgxBwrdlWLYdROa/PriVgMAQZrliIOgdHrVxARgxBIJmbCn7FoqSJYsKICVKNLp1z+IOScVjFJsywRZT6n2TMU8lpZi4qpnQWyYauyjEQBiOkRNMUxARYxmM8azszpWwBxVMFAYNJyMOkBo1Nk3Egrd9mt2vGbTtGc9jggMEks3kiaVzeTAzSrh9UHO8WR25jbXy5SD5CyHGiGO2fLzVhSxhPpcp6gKDXDgVVXFVuRoz3NQIhytF70VgU0rEZCwVkYGNWqoZwHvv+ZFNI3XXAqPn8DacaJ2gyNfrlUlCXwWyTIdej7ejOtdNjHy6FMOhU7bZ87K9Nh2N3RHEx2I/ZMkPa01S5g8qI4sMIagOkHNEPGnoLU/ZDiHWEpWtKO6R4PrQJUvoMfcpdU8qo2Vu1QRSfT8nSmDPm55R9z4e+gh4VQ1mWJh+kBE1RRT4zpwhQPg+6LFvz1KgU431SQz4KGr7zUb4zjJr2oCKH0EMslcOU7Y4o5AxFJraSrVtUOhueHfDLaUkpPnrUAwNBdWuYx/noPWbbUIhOaiJp1S+uicmRWXieSCFPKWgmSwIhJUapt/WlH7oihQLSk7fzJcmMYVdvRgtNoYCQHiYUfJ6ikiy3w3NX17Mvzz2bIkyob71Hh6L71R8+fbcK82RuU069V9mx8N/Y45MOxatjv4Zy8Q/+JorjUT3ziFF0PcqwSsLRDWeast2HKE+khKuOdCBKqOpQ2KMKn9l9kLIbp0dxE6Sjx5IPorgpslejMOG9+kwJUh7Y7OjVGC3rnPz0Ycpd77PUeKemdVtB6dChatG9GW0k5E+QcsJNOV1s9Xy5CPaHMKVrTBxa3wbb2aaEKRc0hc0pEo3ZWfUWphTYlTae3V5aNfPpp2BTT/EJFCVbnwwLyk+YcsWEcOetzhhILzBfYcoFQwDOmx2eBiZM0QcpF0wqiMjRGUbMQ3n+EaLsd9Ohxn9iRUx0I1McSvZCiHu+pgo2P8xdj72fsr+psojpdTfw8o0n53vnoeyPzWQznL0MwoBQi2P3XFCym2Iw58QRcgpyM+Z+KjpDKZ63l84kDgi5Qw0LOannqI8M2CAkKBYDKpGldYPOxnX0V6U1TMq5EJKdhUg4Xdywf/sxiUNYefVPDAyiKwz7GqXSMojOxqvFRLuhHyso1q5+A2xtep5F32p5AAAAAElFTkSuQmCC" alt="Timer-5" /></button></li>' +

				'</ul>' +

				'</nav>' +

				'<section id="dinoKnobInfo-' + this._uId + '" class="dinoKnobInfo dinoAnimated"></section>' +

				'<input id="dinoKnobValueRaw-' + this._uId + '" type="hidden" />' +

				'<nav id="dinoKnobNavigation-' + this._uId + '" class="dinoNavWrap">' +

				'<section id="dinoKnobMenu1-' + this._uId + '" class="dinoKnobMenu knobMenu1">' +

				'<i id="dinoKnobMenuIcon1-' + this._uId + '" class="dinoKnobIcon knob-icon-stopwatch"></i>' +

				'</section>' +

				'<section id="dinoKnobMenu2-' + this._uId + '" class="dinoKnobMenu knobMenu2">' +

				'<i id="dinoKnobMenuIcon2-' + this._uId + '" class="dinoKnobIcon knob-icon-adjust"></i>' +

				'</section>' +

				'<section id="dinoKnobMenu3-' + this._uId + '" class="dinoKnobMenu knobMenu3">' +

				'<i id="dinoKnobMenuIcon3-' + this._uId + '" class="dinoKnobIcon knob-icon-alert"></i>' +

				'</section>' +

				'</nav>' +

				'</div>' +

				'<svg id="dinoPowerSwitch-' + this._uId + '" xmlns="http://www.w3.org/2000/svg" style="display: none;">' +

				'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="dinoLine-' + this._uId + '">' +

				'<line x1="75" y1="34" x2="75" y2="58"/>' +

				'</symbol>' +

				'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="dinoCircle-' + this._uId + '">' +

				'<circle cx="75" cy="80" r="35"/>' +

				'</symbol>' +

				'</svg>' +

				'<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">' +

				'<filter id="dinoBlurFilter-' + this._uId + '">' +

				'<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />' +

				'<feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -8" result="flt" />' +

				'<feBlend in2="flt" in="SourceGraphic" result="mix" />' +

				'</filter>' +

				'</svg>' +

				'</article>';
			},

			/***************************************************************************/

			initKnob: function ()
			{
				let widget = this;
				let knobBarTheme = widget.options.barStyle;

				if(knobBarTheme === "hot"){widget._colorBarTheme = widget._knobColorThemes[0];}
				else if(knobBarTheme === "cold"){widget._colorBarTheme = widget._knobColorThemes[1];}
				else if(knobBarTheme === "green"){widget._colorBarTheme = widget._knobColorThemes[3];}
				else if(knobBarTheme === "yellow"){widget._colorBarTheme = widget._knobColorThemes[4];}
				else if(knobBarTheme === "blue"){widget._colorBarTheme = widget._knobColorThemes[5];}
				else if(knobBarTheme === "red"){widget._colorBarTheme = widget._knobColorThemes[6];}
				else{widget._colorBarTheme = widget._knobColorThemes[2];}

				for(let i = 0; i < widget._colorBarTheme.length; i++)
				{
					widget._deg = i * 12;
					// Create the color bar
					jQuery('<span id="dinoKnobColorBar-' + widget._uId + '-' + i + '" class="dinoKnobColorBar">').css({
						'backgroundColor': widget._colorBarTheme[i],
						'transform': 'rotate(' + widget._deg + 'deg)',
						'top': Math.round(-Math.sin(widget._deg / widget._rad2deg) * 100 + 115),
						'left': Math.round(Math.cos((180 - widget._deg) / widget._rad2deg) * 100 + 110)
					}).appendTo(widget._bars);

					widget._bars.find('#dinoKnobColorBar-' + widget._uId + '-' + i).css({
						'box-shadow': '0 0 30px 5px'
					});
				}

				/*----------------------------------------------------------------------*/

				// Set default widget colors
				widget.$element.find('#dinoKnobMain-' + widget._uId).css({
					'background-color': widget.options.knobBgColor ? widget.options.knobBgColor : 'rgb(6, 101, 191)'
				});

				widget.$element.find('.dinoKnobMenu').css({
					'background-color': widget.options.knobBgColor ? widget.options.knobBgColor : 'rgb(6, 101, 191)'
				});

				widget.$element.find('#dinoKnobValue-' + widget._uId).css({
					'background-color': widget.options.knobBgColor ? widget.options.knobBgColor : 'rgb(6, 101, 191)'
				});

				widget.$element.find('#dinoKnobTimers-' + widget._uId).css({
					'background-color': widget.options.knobBgColor ? widget.options.knobBgColor : 'rgb(6, 101, 191)'
				});

				widget.$element.find('#dinoKnobInfo-' + widget._uId).css({
					'background-color': widget.options.knobBgColor ? widget.options.knobBgColor : 'rgba(6, 101, 191, 1)'
				});

				widget.$element.find('#dinoKnob-' + widget._uId).css({
					'filter': 'url("#dinoBlurFilter-' + widget._uId + '")'
				});

				if(!widget.options.showTimer)
				{
					jQuery(widget.element).find("#dinoKnobMenu1-" + widget._uId).addClass('disabled');
				}

				if(!widget.options.showLabel)
				{
					jQuery(widget.element).find("#dinoKnobMenu2-" + widget._uId).addClass('disabled');
				}

				if(!widget.options.showAlert)
				{
					jQuery(widget.element).find("#dinoKnobMenu3-" + widget._uId).addClass('disabled');
				}
			},

			/***************************************************************************/

			rotateKnob: function (direction)
			{
				let widget = this;
				let colorBars = widget._bars.find('.dinoKnobColorBar');
				let numBars = 0, lastNum = -widget.options.step;

				if (direction === 'up')
				{
					if (widget._angle <= widget.options.maxAngle)
					{
						widget._angle = widget._angle + (widget._angle === widget.options.maxAngle ? widget.options.minAngle : widget.options.snap);

						//--------------------------------------------------------------
						numBars = Math.round(colorBars.length * (widget._angle / 360));

						// Update the dom only when the number of active bars
						// changes, instead of on every move
						if(numBars === lastNum)
						{
							return false;
						}

						if(widget._powerButtonInput.prop('checked'))
						{
							lastNum = numBars;
							colorBars.removeClass('active').slice(0, numBars).addClass('active');
						}

						//--------------------------------------------------------------

						if (widget._angle >= widget.options.maxAngle)
						{
							widget._angle = widget.options.maxAngle;
						}

						widget._knobTop.css({
							'transform': 'rotate(' + widget._angle + 'deg)'
						});
					}
				}
				else if (direction === 'down')
				{
					if ((widget._angle) >= widget.options.minAngle)
					{
						widget._angle = widget._angle - (widget._angle === widget.options.minAngle ? widget.options.minAngle : widget.options.snap);

						//--------------------------------------------------------------
						numBars = Math.round(colorBars.length * (widget._angle / 360));

						// Update the dom only when the number of active bars
						// changes, instead of on every move
						if(numBars === lastNum)
						{
							return false;
						}

						if(widget._powerButtonInput.prop('checked'))
						{
							lastNum = numBars;
							colorBars.removeClass('active').slice(0, numBars).addClass('active');
						}

						//--------------------------------------------------------------

						if (widget._angle <= widget.options.minAngle)
						{
							widget._angle = widget.options.minAngle;
						}

						widget._knobTop.css({
							'transform': 'rotate(' + widget._angle + 'deg)'
						});
					}
				}

				let percentValue;
				if (widget.options.minValue < 0)
				{
					if (widget._angle < (widget.options.maxAngle / 2))
					{
						percentValue = (widget._angle / (widget.options.maxAngle / 2)) * Math.abs(widget.options.minValue);
						percentValue = parseInt(widget.options.minValue) + Math.abs(percentValue);
					}
					else if (widget._angle > (widget.options.maxAngle / 2))
					{
						percentValue = ((widget._angle / (widget.options.maxAngle / 2) * widget.options.maxValue) - parseInt(widget.options.maxValue));
					}
					else
					{
						percentValue = 0;
					}
				}
				else
				{
					percentValue = (widget._angle / widget.options.maxAngle) * widget.options.maxValue;
				}

				if(percentValue >= widget.options.maxValue)
				{
					percentValue = widget.options.maxValue;
					if(widget.options.showAlert)
					{
						jQuery(widget.element).find("#dinoKnobMenu3-" + widget._uId).removeClass('active').addClass('active');
					}
				}
				else if((widget._angle >= widget.options.maxAlarm) && widget.options.showAlert)
				{
					jQuery(widget.element).find("#dinoKnobMenu3-" + widget._uId).removeClass('active').addClass('active');
				}
				else
				{
					jQuery(widget.element).find("#dinoKnobMenu3-" + widget._uId).removeClass('active');
				}

				// return the value to the function turn
				if(widget.options.showLabel)
				{
					jQuery(widget.element).find("#dinoKnobValue-" + widget._uId).html(percentValue.toFixed(0));
				}
				jQuery(widget.element).find("#dinoKnobValueRaw-" + widget._uId).val(widget._angle.toFixed(0));
				widget.turnKnobUpdateCallback.call(widget, widget._uId, percentValue.toFixed(0), widget._angle, widget._angle.toFixed(0) / 360);

				if (widget.options.debug)
				{
					console.log(widget._uId + ' ==> PERCENT ==> ' + widget._angle.toFixed(0));
					console.log(widget._uId + ' ==> DEGREE ==> ' + widget._angle.toFixed(0) / 360);
					console.log(widget._uId + ' ==> RATIO ==> ' + percentValue.toFixed(0));
				}
			},

	        /***************************************************************************/

			// Remove plugin instance completely
			destroy: function ()
			{
				/*
					The destroy method unbinds all events for the specific instance
					of the plugin, then removes all plugin data that was stored in
					the plugin instance using jQuery's .removeData method.

					Since we store data for each instance of the plugin in its
					instantiating element using the $.data method (as explained
					in the plugin wrapper below), we can call methods directly on
					the instance outside of the plugin initialization, ie:
					$('selector').data('plugin_myPluginName').someOtherFunction();

					Consequently, the destroy method can be called using:
					$('selector').data('plugin_myPluginName').destroy();
				*/
				this.unbindEvents();
				this.$element.removeData();
				this.$element.remove();
				/* TODO: Implement destroy knob method */
			},

			// Cache DOM nodes for performance
			buildCache: function ()
			{
				/*
					Create variable(s) that can be accessed by other plugin
					functions. For example, "this.$element = $(this.element);"
					will cache a jQuery reference to the element that initialized
					the plugin. Cached variables can then be used in other methods.
				*/
				this.$element = jQuery(this.element);
			},

			// Bind events that trigger methods
			bindEvents: function ()
			{
				let plugin = this;

				const secondsForClicks = 1;
				const numClicksRequired = 5;
				const clickTimestamps = [numClicksRequired];

				let oldestIndex = 0;
				let nextIndex = 0;

				/*
					Bind event(s) to handlers that trigger other functions, ie:
					"plugin.$element.on('click', function() {});". Note the use of
					the cached variable we created in the buildCache method.

					All events are namespaced, ie:
					".on('click'+'.'+this._name', function() {});".
					This allows us to unbind plugin-specific events using the
					unbindEvents method below.
				*/
				plugin.$element.on('click touchstart' + '.' + plugin._name, '#dinoTimer1-' + plugin._uId + ', #dinoTimer2-' + plugin._uId + ', #dinoTimer3-' + plugin._uId + ', #dinoTimer4-' + plugin._uId + ', #dinoTimer5-' + plugin._uId,  function(e)
				{
					e.preventDefault();

					plugin._timerState = jQuery(this).data('timer');
					plugin.buttonStateCallback(plugin._uId, plugin._buttonState, plugin._timerState);

					if (plugin.options.debug)
					{
						console.log(plugin._uId + ' ==> BUTTON ==> ' + plugin._buttonState);
						console.log(plugin._uId + ' ==> TIMER ==> ' + plugin._timerState);
					}

					plugin.$element.find('#dinoKnobTimers-' + plugin._uId).css({
						'opacity': '0',
						'visibility': 'collapse'
					}).removeClass('zoomIn').addClass('zoomOut');

					let li = plugin._timersLi.find('li');
					for(let i = 0; i < li.length; i++)
					{
						plugin.rotateMenu(li[i], -360);
					}
				});

				plugin.$element.on('click touchstart' + '.' + plugin._name, '#dinoKnobMenu1-' + plugin._uId,  function(e)
				{
					e.preventDefault();

					plugin.$element.find('#dinoKnobTimers-' + plugin._uId).css({
						'opacity': '1',
						'visibility': 'visible'
					}).removeClass('zoomOut').addClass('zoomIn');

					let li = plugin._timersLi.find('li');
					let deg = 360 / li.length;

					for(let i = 0; i < li.length; i++)
					{
						let d = i * deg;
						plugin.rotateMenu(li[i], d);
					}
				});

				plugin.$element.on('mouseleave' + '.' + plugin._name, '#dinoKnobMenu2-' + plugin._uId, function (e)
				{
					e.preventDefault();

					if(plugin.options.showLabel)
					{
						plugin.$element.find('#dinoKnobValue-' + plugin._uId).css({
							'opacity': '0',
							'visibility': 'collapse'
						}).removeClass('zoomIn').addClass('zoomOut');
					}
				});

				plugin.$element.on('mouseenter' + '.' + plugin._name, '#dinoKnobMenu2-' + plugin._uId, function (e)
				{
					e.preventDefault();

					if(plugin.options.showLabel)
					{
						plugin.$element.find('#dinoKnobValue-' + plugin._uId).css({
							'opacity': '1',
							'visibility': 'visible'
						}).removeClass('zoomOut').addClass('zoomIn');
					}
				});

				plugin.$element.on('click touchstart' + '.' + plugin._name, '#dinoKnobInfo-' + plugin._uId,  function(e)
				{
					e.preventDefault();

					plugin.$element.find('#dinoKnobInfo-' + plugin._uId).css({
						'opacity': '0',
						'visibility': 'collapse'
					}).removeClass('zoomIn').addClass('zoomOut').html('');
				});

				plugin.$element.on('click touchstart' + '.' + plugin._name, '#dinoKnobMenu3-' + plugin._uId,  function(e)
				{
					e.preventDefault();

					const timeMillis = (new Date()).getTime();

					// If we have at least the min number of clicks on record
					if (nextIndex === numClicksRequired - 1 || oldestIndex > 0)
					{
						// Check that all required clicks were in required time
						let diff = timeMillis - clickTimestamps[oldestIndex];
						if (diff < secondsForClicks * 1000)
						{
							plugin.$element.find('#dinoKnobInfo-' + plugin._uId).css({
								'opacity': '1',
								'visibility': 'visible'
							}).removeClass('zoomOut').addClass('zoomIn').html(plugin.createCreatedBy());
						}

						oldestIndex++;
					}

					// If not done, record click time, and bump indices
					clickTimestamps[nextIndex] = timeMillis;
					nextIndex++;

					if (nextIndex === numClicksRequired)
					{
						nextIndex = 0;
					}

					if (oldestIndex === numClicksRequired)
					{
						oldestIndex = 0;
					}
				});

                /*------------------------------------------------------------------------------------------------*/

				plugin.$element.on('change' + '.' + plugin._name, '#dinoKnobSwitchInput-' + plugin._uId, function(e)
				{
					e.preventDefault();

					if(jQuery(plugin._powerButtonInput).is(':checked'))
					{
						plugin._buttonState = true;
						plugin.buttonStateCallback(plugin._uId, plugin._buttonState, plugin._timerState);

						if (plugin.options.debug)
						{
							console.log(plugin._uId + ' ==> BUTTON ==> ' + plugin._buttonState);
							console.log(plugin._uId + ' ==> TIMER ==> ' + plugin._timerState);
						}

						plugin._knobTop.css({
							'border': '3px solid rgba(255, 197, 0, 1)'
						});

						//--------------------------------------------------------------
						let numBars = Math.round((plugin._colorBarTheme.length * (plugin._angle / 360)));
						plugin._bars.find(".dinoKnobColorBar").removeClass('active').slice(0, numBars).addClass('active');
						//--------------------------------------------------------------

						plugin.$element.find('.dinoKnobMenu').toggleClass('blob');
						plugin.$element.find('#dinoKnobMain-' + plugin._uId).toggleClass('blob');
					}
					else
					{
						plugin._buttonState = false;
						plugin.buttonStateCallback(plugin._uId, plugin._buttonState, plugin._timerState);

						if (plugin.options.debug)
						{
							console.log(plugin._uId + ' ==> BUTTON ==> ' + plugin._buttonState);
							console.log(plugin._uId + ' ==> TIMER ==> ' + plugin._timerState);
						}

						plugin._knobTop.css({
							'border': '12px solid rgba(255, 197, 0, .5)'
						});

                        //--------------------------------------------------------------
						plugin._bars.find(".dinoKnobColorBar").removeClass('active');
						//--------------------------------------------------------------

						plugin.$element.find('.dinoKnobMenu').toggleClass('blob');
						plugin.$element.find('#dinoKnobMain-' + plugin._uId).toggleClass('blob');
					}
				});

				/*------------------------------------------------------------------------------------------------*/

				plugin.$element.on('input change' + '.' + plugin._name, '#dinoKnobValueRaw-' + plugin._uId, function(e)
				{
					e.preventDefault();

					let val = jQuery(plugin.element).find("#dinoKnobValueRaw-" + plugin._uId).val();
					let colorBars = plugin._bars.find('.dinoKnobColorBar');
					let numBars = 0, lastNum = -plugin.options.snap;

					let percentValue;
					if (plugin.options.minValue < 0)
					{
						if (val < (plugin.options.maxAngle / 2))
						{
							percentValue = (val / (plugin.options.maxAngle / 2)) * Math.abs(plugin.options.minValue);
							percentValue = parseInt(plugin.options.minValue) + Math.abs(percentValue);

						}
						else if (val > (plugin.options.maxAngle / 2))
						{
							percentValue = ((val / (plugin.options.maxAngle / 2) * plugin.options.maxValue) - parseInt(plugin.options.maxValue));

						}
						else
						{
							percentValue = 0;
						}
					}
					else
					{
						percentValue = (val / plugin.options.maxAngle) * plugin.options.maxValue;
					}

					if(percentValue >= plugin.options.maxValue)
					{
						percentValue = plugin.options.maxValue;
						if(plugin.options.showAlert)
						{
							jQuery(plugin.element).find("#dinoKnobMenu3-" + plugin._uId).removeClass('active').addClass('active');
						}
					}
					else if((val >= plugin.options.maxAlarm) && plugin.options.showAlert)
					{
						jQuery(plugin.element).find("#dinoKnobMenu3-" + plugin._uId).removeClass('active').addClass('active');
					}
					else
					{
						jQuery(plugin.element).find("#dinoKnobMenu3-" + plugin._uId).removeClass('active');
					}

					//--------------------------------------------------------------
					numBars = Math.round((colorBars.length * (val / 360)));

					// Update the dom only when the number of active bars
					// changes, instead of on every move
					if(numBars === lastNum)
					{
						return false;
					}

					if(plugin._powerButtonInput.prop('checked'))
					{
						lastNum = numBars;
						colorBars.removeClass('active').slice(0, numBars).addClass('active');
					}

					//--------------------------------------------------------------

					plugin._knobTop.css({
						'transform': 'rotate(' + val + 'deg)'
					});

					jQuery(plugin.element).find("#dinoKnobValueRaw-" + plugin._uId).val(val);
					if(plugin.options.showLabel)
					{
						jQuery(plugin.element).find("#dinoKnobValue-" + plugin._uId).html(percentValue.toFixed(0));
					}
					plugin.turnKnobUpdateCallback.call(plugin, plugin._uId, percentValue.toFixed(0), val, val / 360);

					plugin._angle = val;
					plugin._currentDeg = val;
					plugin._lastDeg = val;
					plugin._rotation = val;

					if (plugin.options.debug)
					{
						console.log(plugin._uId + ' ==> PERCENT ==> ' + plugin._angle.toFixed(0));
						console.log(plugin._uId + ' ==> DEGREE ==> ' + plugin._angle.toFixed(0 / 360));
						console.log(plugin._uId + ' ==> RATIO ==> ' + percentValue.toFixed(0));
					}
				});

				plugin.$element.on('mousewheel DOMMouseScroll MozMousePixelScroll' + '.' + plugin._name, '#dinoKnobMain-' + plugin._uId, function(e)
				{
					e.preventDefault();

					if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0)
					{
						plugin.rotateKnob('down');
					}
					else
					{
						plugin.rotateKnob('up');
					}
				});

				plugin.$element.on('mousedown touchstart' + '.' + plugin._name, function (e)
				{
					e.preventDefault();

					let a, b, deg, tmp, rad2deg = 180 / Math.PI;
					let offset = plugin.$element.offset();
					let colorBars = plugin._bars.find('.dinoKnobColorBar');
					let numBars = 0, lastNum = -plugin.options.snap;

					let center = {
						y: offset.top + plugin.$element.height() / 2,
						x: offset.left + plugin.$element.width() / 2
					};

					plugin.$element.on('mousemove.rem touchmove.rem' + '.' + plugin._name,  function (e)
					{
						e.preventDefault();

						a = center.y - e.pageY;
						b = center.x - e.pageX;
						deg = Math.atan2(a, b) * rad2deg;

						// we have to make sure that negative
						// angles are turned into positive:
						if (deg < 0)
						{
							deg = 360 + deg;
						}

						// Save the starting position of the drag
						if (plugin._startDeg === -1)
						{
							plugin._startDeg = deg;
						}

						// Calculating the current rotation
						tmp = Math.floor((deg - plugin._startDeg) + plugin._rotation);

						// Making sure the current rotation
						// stays between 0 and 359
						if (tmp < 0)
						{
							tmp = 360 + tmp;
						}
						else if (tmp > 359)
						{
							tmp = tmp % 360;
						}

						// Snapping in the off position:
						if (plugin.options.snap && tmp < plugin.options.snap)
						{
							tmp = 0;
						}

						// This would suggest we are at an end position;
						// we need to block further rotation.
						if (Math.abs(tmp - plugin._lastDeg) > 180)
						{
							return false;
						}

						plugin._angle = tmp;
						plugin._currentDeg = tmp;
						plugin._lastDeg = tmp;

						let percentValue;
						if (plugin.options.minValue < 0)
						{
							if (plugin._angle < (plugin.options.maxAngle / 2))
							{
								percentValue = (plugin._angle / (plugin.options.maxAngle / 2)) * Math.abs(plugin.options.minValue);
								percentValue = parseInt(plugin.options.minValue) + Math.abs(percentValue);
							}
							else if (plugin._angle > (plugin.options.maxAngle / 2))
							{
								percentValue = ((plugin._angle / (plugin.options.maxAngle / 2) * plugin.options.maxValue) - parseInt(plugin.options.maxValue));
							}
							else
							{
								percentValue = 0;
							}
						}
						else
						{
							percentValue = (plugin._angle / plugin.options.maxAngle) * plugin.options.maxValue;
						}

						if(percentValue > plugin.options.maxValue)
						{
							percentValue = plugin.options.maxValue;
						}

						if (plugin._angle >= plugin.options.maxAngle)
						{
							plugin._angle = plugin.options.maxAngle;
							if(plugin.options.showAlert)
							{
								jQuery(plugin.element).find("#dinoKnobMenu3-" + plugin._uId).removeClass('active').addClass('active');
							}
						}
						else if((plugin._angle >= plugin.options.maxAlarm) && plugin.options.showAlert)
						{
							jQuery(plugin.element).find("#dinoKnobMenu3-" + plugin._uId).removeClass('active').addClass('active');
						}
						else
						{
							jQuery(plugin.element).find("#dinoKnobMenu3-" + plugin._uId).removeClass('active');
						}

						if (plugin._angle <= plugin.options.maxAngle)
						{
							if(plugin._angle !== 0)
							{
								if(plugin._angle !== plugin.options.maxAngle)
								{
									plugin._angle = plugin._angle + plugin.options.snap;
								}
							}

							//--------------------------------------------------------------
							numBars = Math.round((colorBars.length * (plugin._angle / 360)));

							// Update the dom only when the number of active bars
							// changes, instead of on every move
							if(numBars === lastNum)
							{
								return false;
							}

							if(plugin._powerButtonInput.prop('checked'))
							{
								lastNum = numBars;
								colorBars.removeClass('active').slice(0, numBars).addClass('active');
							}

							//--------------------------------------------------------------
						}

						plugin._knobTop.css({
							'transform': 'rotate(' + plugin._angle + 'deg)'
						});

                        //--------------------------------------------------------------

						jQuery(plugin.element).find("#dinoKnobValueRaw-" + plugin._uId).val(plugin._angle.toFixed(0));
						if(plugin.options.showLabel)
						{
							jQuery(plugin.element).find("#dinoKnobValue-" + plugin._uId).html(percentValue.toFixed(0));
						}
						plugin.turnKnobUpdateCallback.call(plugin, plugin._uId, percentValue.toFixed(0), plugin._angle, plugin._angle.toFixed(0) / 360);

						if (plugin.options.debug)
						{
							console.log(plugin._uId + ' ==> PERCENT ==> ' + plugin._angle.toFixed(0));
							console.log(plugin._uId + ' ==> DEGREE ==> ' + plugin._angle.toFixed(0) / 360);
							console.log(plugin._uId + ' ==> RATIO ==> ' + percentValue.toFixed(0));
						}
					});
				});

				plugin.$element.on('mouseup touchend' + '.' + plugin._name,  function (e)
				{
					e.preventDefault();

					plugin.$element.off('.rem');
					// Saving the current rotation
					plugin._rotation = plugin._currentDeg;

					// Marking the starting degree as invalid
					plugin._startDeg = -1;
				});
			},

			// Unbind events that trigger methods
			unbindEvents: function ()
			{
				/*
					Unbind all events in our plugin's namespace that are attached
					to "this.$element".
				*/
				this.$element.off('.' + this._name);
			},

			/***************************************************************************/

			buttonStateCallback: function (id, state, timerState)
			{
				// Cache onComplete option
				let onComplete = this.options.onComplete;

				if (typeof onComplete === "function")
				{
					/*
						Use the "call" method so that inside of the onComplete
						callback function the "this" keyword refers to the
						specific DOM node that called the plugin.

						More: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
					*/
					onComplete.call(this.element, id, state, timerState);
				}
			},

			turnKnobUpdateCallback: function (id, percent, degree, ratio)
			{
				// Cache onTurn option
				let onTurn = this.options.onTurn;

				if (typeof onTurn === "function")
				{
					onTurn.call(this.element, id, percent, degree, ratio);
				}
			},

			/***************************************************************************/

			rotateMenu: function (li, d)
			{
				let angleStart = -360;
				jQuery({ d : angleStart }).animate({ d : d },
				{
					step: function(now)
					{
						jQuery(li).css({ transform: 'rotate(' + now + 'deg)' }).find('button').css({ transform: 'rotate(' + (-now) + 'deg)' });
					}
				});
			},

			/***************************************************************************/

			createUniqId: function (idLength)
			{
				const charsToFormId = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
				if (!idLength)
				{
					idLength = Math.floor(Math.random() * charsToFormId.length);
				}

				let uniqId = '';
				for (let i = 0; i < idLength; i++)
				{
					uniqId += charsToFormId[Math.floor(Math.random() * charsToFormId.length)];
				}

				return uniqId;
			},

			/***************************************************************************/

			// Try to find a language we should use. Look for URL parameter or system settings.
			// Restricts to supported languages ('en', 'sl' and some others).
			getUserLanguage: function ()
			{
				let lang = '';

				// 1. try to read URL parameter 'lang'
				let qs = window.location.search;
				if (qs)
				{
					if (qs.substring(0, 1) === '?')
					{
						qs = qs.substring(1);
					}

					let params = qs.split('&');
					for (let i = 0; i < params.length; i++)
					{
						let keyValue = params[i].split('=');
						if (keyValue[0] === 'lang')
						{
							lang = keyValue[1];
							break;
						}
					}
				}

				// 2. try to get browser or system language
				if (!lang)
				{
					let lan = navigator.language || navigator;
					let part = lan.split('-');
					lang = part[0];
				}

				// Use only supported languages, defaults to 'en'
				if (lang !== 'en' && lang !== 'sl')
				{
					lang = 'en';
				}

				return lang;
			},

			/***************************************************************************/

			capitalizeFirstLetter: function (string)
			{
				return string.replace(/^(.)/g, string[0].toUpperCase());
			},

			/***************************************************************************/

			deCapitalizeFirstLetter: function (string)
			{
				return string.replace(/^(.)/g, string[0].toLowerCase());
			},

			/***************************************************************************/

			createCreatedBy: function()
			{
				return '<address>' +
					'<b>' + this.capitalizeFirstLetter(this._name) + '</b>' +
					'<p>' + this._version + '</p><hr />' +
					'<span>' + atob('Q3JlYXRlZCBCeTog') + '<br /><b>' +
					           atob('PGEgaHJlZj0iaHR0cHM6Ly9tY3gtc3lzdGVtcy5uZXQiIHRhcmdldD0iYmxhbmsiPk1DWC1TeXN0ZW1zJnJlZzwvYT4=') + '</b></span>' +
					'</address>';
			}

			/***************************************************************************/
		});

	/*
		Create a lightweight plugin wrapper around the "Plugin" constructor,
		preventing against multiple instantiations.

		More: http://learn.jquery.com/plugins/basic-plugin-creation/
	*/
	jQuery.fn.dinoKnob = function (options)
	{
		this.each(function ()
		{
			if (!jQuery.data(this, 'plugin_' + pluginName))
			{
				/*
					Use "$.data" to save each instance of the plugin in case
					the user wants to modify it. Using "$.data" in this way
					ensures the data is removed when the DOM element(s) are
					removed via jQuery methods, as well as when the user leaves
					the page. It's a smart way to prevent memory leaks.

					More: http://api.jquery.com/jquery.data/
				*/
				jQuery.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});

		/*
			"return this;" returns the original jQuery object. This allows
			additional jQuery methods to be chained.
		*/
		return this;
	};

	/*
		Attach the default plugin options directly to the plugin object. This
		allows users to override default plugin options globally, instead of
		passing the same option(s) every time the plugin is initialized.

		For example, the user could set the "property" value once for all
		instances of the plugin with
		"$.fn.pluginName.defaults.property = 'myValue';". Then, every time
		plugin is initialized, "property" will be set to "myValue".

		More: http://learn.jquery.com/plugins/advanced-plugin-concepts/
	*/
	jQuery.fn.dinoKnob.defaults = {
		// Theme Light or Dark
		theme: 'light',
		// Knob main Circle background color
		knobBgColor: null,
		// Step Value of the Knob
		snap: 0,
		// Knob Value
		value: 0,
		// Knob Min Value
		minValue: 0,
		// Knob Max Value
		maxValue: 100,
		// Min ColorBar Angle
		minAngle: 0,
		// Max ColorBar Angle
		maxAngle: 255,
		// Max angle value, for alarm icon
		maxAlarm: 255,
		// Circle Bar style Hot, Cold or Mono
		barStyle: 'hot',
		// Enable Timer Button
		showTimer: false,
		// Enable Alerts
		showAlert: false,
		// Enable Labels
		showLabel: false,
		// Plugin language
		language: null,
		// Enable plugin debug
		debug: false,
		// Event on turn
		onTurn: null,
		// Event on complete
		onComplete: null,
		// Event on error
		onError: null
	};

})(jQuery, window, document);