/*
 * DinoKnob
 *
 * JQuery and CSS3 based UI-Knob element implementing touch,
 * keyboard, mouse and scroll wheel support.
 *
 * Created by 2007 - 2021 MCX-Systems
 */
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

		jQuery.event.special.mousewheel = {
			setup: function( _, ns, handle )
			{
				if ( ns.includes("noPreventDefault") )
				{
					this.addEventListener("mousewheel", handle, { passive: false });
				}
				else
				{
					this.addEventListener("mousewheel", handle, { passive: true });
				}
			}
		};

		jQuery.event.special.touchstart = {
			setup: function( _, ns, handle )
			{
				if ( ns.includes("noPreventDefault") )
				{
					this.addEventListener("touchstart", handle, { passive: false });
				}
				else
				{
					this.addEventListener("touchstart", handle, { passive: true });
				}
			}
		};

		jQuery.event.special.touchmove = {
			setup: function( _, ns, handle )
			{
				if ( ns.includes("noPreventDefault") )
				{
					this.addEventListener("touchmove", handle, { passive: false });
				}
				else
				{
					this.addEventListener("touchmove", handle, { passive: true });
				}
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
		this._version = 'V2.03.2021';
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
		/* Create and append the knob widget */
		jQuery(this.element).append(this.createKnobWidget());
		jQuery(this.element).find('#dinoKnobValue-' + this._uId).html("0");
		jQuery(this.element).find("#dinoKnobValueRaw-" + this._uId).val("0");
		/***************************************************************************/
		this._buttonState = false;
		this._doCountDown = true;
		this._timerState = 0;
		this._timerCounter = 0;
		this._timerCounterLeft = 0;
		/***************************************************************************/
		this._powerButtonInput = jQuery(this.element).find('#dinoKnobSwitchInput-' + this._uId);
		this._knobTop = jQuery(this.element).find('#dinoKnobTop-' + this._uId);
		this._timersLi = jQuery(this.element).find('#dinoKnobTimers-' + this._uId);
		this._bars = jQuery(this.element).find('#dinoKnobBars-' + this._uId);
		/***************************************************************************/
		this._rad2deg = 180 / Math.PI;
		this._deg = 0;
		this._angle = 0;
		/***************************************************************************/
		this._startDeg = 0;
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
				return '<article id="dinoKnob-' + this._uId + '" class="dinoKnob" tabindex="0">' +

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

				'<nav id="dinoKnobTimers-' + this._uId + '" class="dinoKnobTimers dinoAnimated"></nav>' +

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

				'<defs>' +

				'<filter id="dinoBlurFilter-' + this._uId + '">' +

				'<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />' +

				'<feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -8" result="flt" />' +

				'<feBlend in2="flt" in="SourceGraphic" result="mix" />' +

				'</filter>' +

				'</defs>' +

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

				if(navigator.userAgent.indexOf("Firefox") === -1)
				{
					widget.$element.find('#dinoKnob-' + widget._uId).css({
						'filter': 'url("#dinoBlurFilter-' + widget._uId + '")'
					});
				}
				else
				{
					widget.$element.find('#dinoKnob-' + widget._uId).css({
						'filter': 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'dinoBlurFilter-'+widget._uId+'\'><feGaussianBlur in=\'SourceGraphic\' result=\'blur\' stdDeviation=\'10\' /><feColorMatrix in=\'blur\' values=\'1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -8\' result=\'flt\' /><feBlend in2=\'flt\' in=\'SourceGraphic\' result=\'mix\' /></filter></svg>#dinoBlurFilter-'+widget._uId+'")'
					});
				}

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
				let numBars = 0;
				let lastNum = -widget.options.step;

				if (direction === 'up')
				{
					if (widget._angle <= widget.options.maxAngle)
					{
						widget._angle = widget._angle + (widget._angle === widget.options.maxAngle ? widget.options.minAngle : widget.options.snap);

						/*--------------------------------------------------------------*/
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
						/*--------------------------------------------------------------*/

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

						/*--------------------------------------------------------------*/
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
						/*--------------------------------------------------------------*/

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

				return false;
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

					plugin._doCountDown = true;
					plugin._timerCounter = 0;
					plugin._timerState = jQuery(this).data('timer');
					plugin.$element.find('#dinoKnobTimers-' + plugin._uId).empty().html(plugin.createTimerFace());
					plugin.buttonStateCallback(plugin._uId, plugin._buttonState, plugin._timerState);

					if (plugin.options.debug)
					{
						console.log(plugin._uId + ' ==> BUTTON ==> ' + plugin._buttonState);
						console.log(plugin._uId + ' ==> TIMER ==> ' + plugin._timerState);
					}

					function drawCountDown()
					{
						plugin._timerCounter++;
						plugin._timerCounter %= 360;

						let r = (plugin._timerCounter * Math.PI / 180);
						let x = Math.sin(r) * 125;
						let y = Math.cos(r) * -125;

						let mid = (plugin._timerCounter > 180) ? 1 : 0;
						let anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

						jQuery(plugin.element).find('#dinoTimerLoader-' + plugin._uId).attr( "d", anim );
						if(plugin._doCountDown)
						{
							if(plugin._timerCounterLeft >= plugin._timerState * 1000)
							{
								plugin._doCountDown = false;
								plugin._timerCounter = 0;
								plugin._timerCounterLeft = 0;

								plugin.$element.find('#dinoKnobTimers-' + plugin._uId).css({
									'opacity': '0',
									'visibility': 'collapse'
								}).removeClass('zoomIn').addClass('zoomOut');

								let li = plugin._timersLi.find('li');
								for(let i = 0; i < li.length; i++)
								{
									this.rotateMenu(li[i], -360);
								}

								plugin.buttonStateCallback(plugin._uId, plugin._buttonState, 0);
								plugin.$element.find('#dinoKnobTimers-' + plugin._uId).empty();
							}

							plugin._timerCounterLeft += Math.round((plugin._timerState / 360) * 1000);
							setTimeout(drawCountDown, (plugin._timerState / 360) * 1000);
						}
					}

					drawCountDown();
				});

				plugin.$element.on('click touchstart' + '.' + plugin._name, '#dinoKnobMenu1-' + plugin._uId,  function(e)
				{
					e.preventDefault();

					plugin.$element.find('#dinoKnobTimers-' + plugin._uId).css({
						'opacity': '1',
						'visibility': 'visible'
					}).removeClass('zoomOut').addClass('zoomIn');
					plugin.$element.find('#dinoKnobTimers-' + plugin._uId).empty().html(plugin.createTimerIcons());

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

						/*--------------------------------------------------------------*/
						let numBars = Math.round((plugin._colorBarTheme.length * (plugin._angle / 360)));
						plugin._bars.find(".dinoKnobColorBar").removeClass('active').slice(0, numBars).addClass('active');
						/*--------------------------------------------------------------*/

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

						/*--------------------------------------------------------------*/
						plugin._bars.find(".dinoKnobColorBar").removeClass('active');
						/*--------------------------------------------------------------*/

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
					let numBars, lastNum = -plugin.options.snap;

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

					/*--------------------------------------------------------------*/
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
					/*--------------------------------------------------------------*/

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

					return false;
				});

				/*------------------------------------------------------------------------------------------------*/
				/*  Manipulating Events  (mouse, keyboard, touch)                                                 */
				/*------------------------------------------------------------------------------------------------*/

				plugin.$element.on('mouseleave' + '.' + plugin._name, '#dinoKnob-' + plugin._uId, function (e)
				{
					e.preventDefault();

					plugin.$element.find('#dinoKnob-' + plugin._uId).blur();
				});

				plugin.$element.on('mouseenter' + '.' + plugin._name, '#dinoKnob-' + plugin._uId, function (e)
				{
					e.preventDefault();

					plugin.$element.find('#dinoKnob-' + plugin._uId).focus();
				});

				plugin.$element.on('keydown keypress' + '.' + plugin._name, function (e)
				{
					e.preventDefault();

					let keycode = (e.keyCode ? e.keyCode : e.which);
					switch (keycode)
					{
						case 40:
							plugin.rotateKnob('down');
							break;
						case 38:
							plugin.rotateKnob('up');
							break;
						case 37:
							plugin.rotateKnob('down');
							break;
						case 39:
							plugin.rotateKnob('up');
							break;
						case 98:
							plugin.rotateKnob('down');
							break;
						case 104:
							plugin.rotateKnob('up');
							break;
						case 100:
							plugin.rotateKnob('down');
							break;
						case 102:
							plugin.rotateKnob('up');
							break;
						default:
							break;
					}
				});

                /*--------------------------------------------------------------*/

				plugin.$element.on('mousewheel DOMMouseScroll MozMousePixelScroll' + '.' + plugin._name, '#dinoKnobMain-' + plugin._uId, function(e)
				{
					if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0)
					{
						plugin.rotateKnob('down');
					}
					else
					{
						plugin.rotateKnob('up');
					}
				});

				/*------------------------------------------------------------------------------------------------*/

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

							/*--------------------------------------------------------------*/
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
							/*--------------------------------------------------------------*/
						}

						plugin._knobTop.css({
							'transform': 'rotate(' + plugin._angle + 'deg)'
						});

						/*--------------------------------------------------------------*/

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

						return false;
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

			createTimerIcons: function()
			{
				return '<ul>' +
					'<li><button id="dinoTimer1-' + this._uId + '" type="button" data-timer="15"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABVCAMAAADDsmKDAAAAV1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fVIJUOhAAAAG3RSTlMA8EAwEMDQgKDgIHBgkFCwIOvA0KVAEJCAcGAfAF7kAAADVUlEQVRYw82X2ZarIBBFZR7FnqfK/3/nZUhEBDGh++GeB1cCZktVHSo49UUNAy8+6+kXEsgjGAuomY5CKAckdPxkFSgyTOF0/SIBja1nBrn9KoGNUDCo8vEM7ABGgisHNPABDKj9yAJkIKbZL4BggtPFEyzYAYzxvmHA4HoJQ2IA4/4GI/4CQ0DuMQLc9LAQoiHFRlgjjAsp5kBHTGxi3aNwCHPIxhohvcVQ5a8DMsBpxtDFG2lIEhS+YTQP0FPpdnpgSRjmP7UouzGCZNM8Cq5SzX1gESkpII9cGGXasxYQKSiLpCO92kROprQySJ2QTMWQ2CKsbtSAJ06mwI6jBYed+Ex2FEicTAlym6A5NKUM3fgTMkevFKNXiIJDIUHXmDccyuWSKPwaJeabp7NZBLHtmEsUjmzkMMtpCitSIK6Ozuvts9tmy83rGhkNFIDAKUoVKF5qIhySpGv0IHmLDE8LQOJsjeM8KYAJukK21b1cXl8+f55iWm8gm+50ZPc0Fyj2Gk7ZES5Jr98fAcQgygSObRj7RqkawmXVW1iSgShBkO3sH1Ql5ZL1vJakuZQ86xPfwXylWme7VqK8olSY5/Je3exRidLDvK/PVNHAR4lxUw/zUmSg2YZUqlEX81R0LID6AGbSIruYz2I02li2FoO7mOePsiQxLF16L6G7mO9WALJejO5iXiuHoH12SAY3lItdSkQv7z1Dupi3hmHBa9nFpKYjFcWuirVpztEzXcxXa8KVjrW52i3lYreimsvUTD3MT3uGA2zOTix/a6nYTNUfHioyvPQw71NboggDvEQHk4vdyjG5E/PydDSDi9qk1jGgGuP+BiP+K8w8dnT2oqX9BlT6ZokbfEDh+byE6gFM2e3wkHHq3+U2dq5O01xGoqqbph1yjquMgkZqxaoYJHjZgQSXdtPVH/u5WKODy3s3RP/woKFi96VR8wfiwbD4gdfSMexejjw6/BEIkg/4t11acz9H9G6V6+vJaUQpAd1pRfoQyvqUiS4Ap7vLoUzpLxc4PrQLg0zpJS+JNUFYQtLpWztG6zsi2S3EcEhCdjoVlXATWoTD2g9hLKRah5m+rwMw6Ci9+P4SpB5rSmRWNQNJPD0sYha1QTCBp2FhjK3xl5MC/wOxI3nU8RC8DQAAAABJRU5ErkJggg==" alt="Timer-1" /></button></li>' +
					'<li><button id="dinoTimer2-' + this._uId + '" type="button" data-timer="60"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABUCAMAAADj2QolAAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fXMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fUiSYD7AAAAHnRSTlMA8BCAwKBAYNAwIOBAP1CwcJDjMPHAsWtREKCI0MsmOwGYAAADUElEQVRYw62X63KcMAyFfb+mBjaXJk2rff+3bLG9KwNegmjOj51hFn9IR5LHZvvyOgIAH6xgpxUUACilIgBPZyGeQ0w1JAB9GiLxwZ3DCA62fXQwMrokTEuTOBf0UDaL5IlgEkxrLrgTCRnGTDDBGz//BMYUEBl1CUiQCtT8IxmbwHwDRdIpA4g1RYOg+5LWFEf3xYCe3U12lKNMs7sBFCMrQsiwWXm5BkunjDAsKAYiOyEHuqF4DubUOEYYxI2S+JF8Qg/jgA+ZEhV0IWJZegupW24OVcp3P+PEAsJ9PytZYgmsKw1OtBA7Mbr8lDEI4aC3XlmpVM7JKS1Nb0vVGYMQWGGSjrCSGsUKAhWDEHCtHRG6GkxrJtwxCPF3hubwUOrOCYhhPpoCMbymNDYMN8hZk+INJ9SEdMFInRfaAinOeHcnSLOwGiMcqysZg0WaIRnLbH2VT50WsepmjxA8Z2PbhkligozVlSGbajxdr69vn09l16mc6G1+LySxakOE6PwXUore3uenGiyfMZ2G1xWCxwOkVF1+zhUcbpj+1BSIC2xNQf2Z4xkrhvUkSx0F61BQbx+3fouiu10DjsGWgmk9394dugcNLH6Hgnp5vkUz9k3BIPsUxMhS6G4+nn1BQYzq5aRK6+5SUL8/qgNmG0pkRynXX9UatQ3FHKdcnzprfOESKJcav2aoKWMplOu/Ycj7YVPVmF0hUS7VGbv0VtIo13cm7sXGCfIESi3TPN18UaHIiJSXMtz4dZ7NJlKuz8y3wyTQlkMUrFJdiOYaMuWTMVfaDCmeTHkthqq2RIxOKd3qDlIufcoFVx6gfPx4oD6FLtm0XcKpIkqta2T+l+JxNgnaNP1MmYiAbdM7LDtJaWGFPmnvtFhnTxoT2xxw06LJrPzMR5JApWhchSlpIiQAJoSF54IYysZNSQoGe5V3Ti+G2v0gO8cxR8hp7J53Ii0nD7PStviU1hPxwflAEjDCwaOiKsQcgoDp/3cQE3Zf9BxvATtKHOoA7WKc2ctmAtgtJ16xdGB93e9P465vCvY4NkIW/8o8CVXKrvwx9yuf8+wrGYd3z2k0Zk7UJDng/VOKQyPCYUcqHO1v+ZCjSXOfhg4ijoERJdKkWsKwg/gLmdqpum7j6DwAAAAASUVORK5CYII=" alt="Timer-2" /></button></li>' +
					'<li><button id="dinoTimer3-' + this._uId + '" type="button" data-timer="300"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABUCAMAAADj2QolAAAAY1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMxydGtGAAAAH3RSTlMA8IBgQBAwwKDQIHDgULCQoN+QMCD2ENF/P8CwcE9g/WKfWAAAA3ZJREFUWMO9l9ly4yAQRZsdSUhynIwz2Ub9/185MqsFKDFKKvfBVZji0BsNgs/FNcFVRvdwWL1CJBOlakVpcRAiCSoOVsxg1x+F0DgQGrtD1nTIbocapwOQAaecytspBrNA8APGSNQl94BDDIBxyqj/AZjbXaLXJYqiQv+zgn+Ewn6EQtspI9KcMmFz+Qo0ALIfBzowOnDZ23+apXG0RWLlfKTtFIlEREoYt4tiJxJFEmvbEZ8MDxRG7vFHQkUzonEUg8hqKdgmjeFcw3CFXlM1yR2RGwiRe2VjVWGkdWnApt0E9LszchosJkJIpSFyOgWPiNKDrLTUzmISBDMMmzAX0WMGQYeJkC2l1wSrMlTcUiJmDBAyysjAfZHIkSxiQChp7Cwj3kNK0taKUsb5QGdFEod5U/z2mmk3thC0Hsoulgjb5FcOcUaJuCgFImEnYCQY3ldyPodZDsGBm2hKObr4zsnopGVZnt/eH23JU3RiNrZESpGV4QqxYS1u9sXp4fxkXwARUyt4FiAk7wBL1OnKGQLGVE+Ng5RvgyXp+XwJhYJs52j52qtTgl9rfHqXLV4y/A4KSi1b/QMQFlN00DDRia8py3m1xhdGLhrpJSXX32svvyrPQ196WlKSUz5TJtvV9oEZ6pRSa4ht3dDSFCLupjxcakt0VgAlpQwNzY0R1km4n/Ln4alcNCRT6pRSJwCdJaSzLjZRlieXbZ1i64ZtlL9+8+0JGhspDz6+Mt3Hq0QjZXl0D4oBrFwBddBKeQe4KVU/aKac3PbqlkKbKa8AOoXXucebKYsP769S/uxShh+xhbXY8otxAVuCzZRnn+nvVd1bVnV+0H4CyG0v0Na99tMoN6FgNrytncGXi/xWlzrnXQqMHTZ2zLT58e795qtlzC61ronyCILkHigb3wbKKbvV0iEwDbfaBXpSXj/Kgu+mfABMlcRyDLkvVb2Lxur7YA7vkVK1oPSkeoRFeGOVqkBEF7Na80l/TTkHCOmhFN3DbLPzESA4wv6reRKfvZpPT/a5mwWlTDcauUt5fVmHIwlG1yUcBmmdcroyxIwFpO4UGp5TXs8fF9uKSLFRNcSewyDq5eXibWWm+H6qi5P43cu37o4avTr5OcM5HqVmyq2o7m6+YuEecYWfSKdaa+ckRoP6wZSIjgloVc90+hYnah73Ef8BT2TmJiE5NSIAAAAASUVORK5CYII=" alt="Timer-3" /></button></li>' +
					'<li><button id="dinoTimer4-' + this._uId + '" type="button" data-timer="600"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABVCAMAAAAohdmAAAAAZlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fXMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMxBrxzjAAAAIHRSTlMA8ECAEMBg0KAwIJBw4FA/YRCw0KDegLAg8sEwj1Pk0RQRQncAAAObSURBVFjDxZjndqMwEIXVK+ASO3GcLcz7v+RiFbAkWFnsnpP7AxMwn2bujIRiVBMjkxj6JwkOTlLsZ5iJ0VtKqZw+9U6IxsBJ4CkAsS8SDPQpNwCyh8KhSywCzHYYCzy9YIHuCcVkNce4GcJA5pdUuzME6HQQVNBwQGiArp0yPUc5cAgHB/4uCs0pQzvFAM8pdkffSV9p6uROe7yn6+zjAx5yQXSg2imsh+GZojE2qF0EMFkoGu+c1AKAskDp8Cv5DGwtGgzYU6YTsTpQNqxc9YYGCqhVTyyoBLKZNHfSm6uheobYrXWVOG2UUVqPiRAMOMewwXIMUVwJU0AAAiZCIMUwIaFQ35kMEjARklKMgg1xklAiRs8QMSSMKkeLGYOQFWcPic1JYZa01LvbWQ6zFAv16RxGautD8xBXbh39wCrrRKJwvEUcBBxGsjlDDwGJBA5GigVxONzC2Ww5RS4BENJBAsY4qyTz2WTtPk56uxxPLqA+ZiVdQRjLiy9ZsNWmt8ag+/HJNm5kqGqKUQGCh+zOOOs6caJznJ0LyDKKNGiD4jL7msbznqj1xcFDGCooid6nKypYXMrgAKlQxo9TxKxMUhkgVcr4NmF8pxbf7txlgyqUiGGu4javkMtnQBVKTAohXeQU/TqjKiVaHCrK01CSNOuUcSp4XwRD08rVKb8RIkUw2IXSQPk8hqqarOEoaqCMV7dKAnSZt6aJMh59Bn2aEEdtlI98cOJCa6SMJ/+cSPpWVyllSmFqL7Zg1Eq5IMQXJ8IfzZQ3hCxMejZXNVNGZ8VCcd3STrl5e8m/UQ4lRfwvylhTnUK/i3IKlLTS90ZKWJayrrs0EHzXqYUyt+CxjfLDr1M8mY0E3dooR8SSt4kO9l4bzR3SRsNuB4TeWyBxlWLpiqnbUjogFgZPFjs1VampQiKfOb2P7dYQSnyoeKs1OHMPoajyZW/Q6cUyfd7mRxYt7+6vV3sF2XJXFvYj3YsNfAkFAbO6q9MvWXOJFtAMEvdYHlOHbO3fWB9vHKuzEMkwZCkNDqMni69/qc5PF8n2Ui0gjnD6sQaI21Qj011ziYnv/cNqOPfDow44gWxiuHlw3vJcLl8P+xRESA0D1Ln/8+PXpydc7++H5N90i/4mEr6FrSlvmsjAovaDCYcg2ekE0Z3nO7oC8e5FYW4pJaSjlvfLRVpnxORLFb9b1Dn9OgKnjHpeCheIs0Dt0p3iEcUVJWhTfwDRlyhFV2umZgAAAABJRU5ErkJggg==" alt="Timer-4" /></button></li>' +
					'<li><button id="dinoTimer5-' + this._uId + '" type="button" data-timer="900"><img class="dinoKnobTimerImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABVCAMAAAAohdmAAAAAZlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fXMzMzMzMzMzMzMzMwY+fXMzMwY+fUY+fUY+fXMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMxYy/yPAAAAIHRSTlMAQMCA8GCg0BAwQOAgcJAQsMHvgFDgMGDQjk9vsB+g7V6o09gAAAPySURBVFjDxZhpc9sgEIYFCKxbciy58dns//+TBbF4LY44uNPp+0GZUVYPe3G5eKWOaRV/pUq0sGr6C9BcAkxCiKHVf6s3IT3AgN+yFnbvYSSUNcWm3sN0CHFSMLxBmUBuM91C94YrbRDh8EZqe/9V2WZTFOisCCaYFNI8dMNwyM4vB/0AAYIDNw+hmcD+D0VB51MmeCO70qe0ZTalBr4WXBitncNgKrLFga2fGnF6kSm2Thyi9OaZr0FjiCKh7Ip3pKBlSKmUNzfjknFvwK51JUAbg9S1N2wfLdQEVq2ILqjlxsH0EsS4kXq1kCGkT2AqZlQnILseMQiB0Ju6nzg4tXyYQ0/AYgii32wQQwuBJulBHIYgoJ5dhbhK0dFAJWHEA9K7kOYWvpFyZj17YIpKdeX6T1enjtPIXPTMaBZqR2+lS4TFCCnRNQOxCZaly+ewrUwnJ0DxykDAYhRFqAZYsZVyhjR/x6YZ3bZdojtMB2Ax6mmcQtqQdw8GqfnS2p/OG46sy9X5zis+Qihwolh93G9mwIkwkU6Vg4Zg1AEFtT+a2jhM9BiBEBPoeT/6FNRpdI0CMrExG/U6naevr0NAQS1HjTHjxRec3g0wfhrrm0ch/dJu2wqFEdUunOOy2l5DCmEwqCGgcFxfxwVtG6KEGFyPmV+hNdLKhIP6JEoMI2gZILWIvpLpJU350CleMyxDVyZd4mfTMUZBRzGmNnSlK8aPTW8QJRaT8p2ZsT6HrektTdFt2dl6kBS64psSJdAB27Sj3sd8H3zTJqRQ1mwEPQWEES6+6YKURGbKTbEHQ6li5oc05YqJoL61zFPUb6SEGgu56V+cE58R03ua0tgqCYR0mKWo7TFJObjhrZh17Bi13ScpV5sK/lyiLmV9TlH2W4qwqb7EjX+f0xThphJRDl95+sAv/wXlVwYBIxqeImKU3QxRdr1K5+mOFL/rskRdh8I1ap9HadzwKG6TdMosEc1GKlKXmZgrLnZ0NEbPlhzK2e6ztPC6ReuSAVkwoN5bvZneSLIqxEGr8rZ6njMJltHmYQo32IzM/EJX2DNFojPNz7t/xu0ncEYmeyZc1Cv8womKXXY/bOAjFoRHT3U7PI+9TooEo9qn4G0AMa8gNeAm4msGh7l+n5PmcamJ3lgR830Pf94QEt6vqYPtD3PHU8qRi2mLko67icM33pzPS4xxGh8+wxxlEAaEmRzN3Y/lYhjMu3Gkg4LW2pwPe3Rpf7/c1kqiAYaTkgDHeUzW2/ExaZEBO4QkxUpAKdlt/kF346F4qWqAh1ouhGSzEIrTyx0rfqKaQ1pt/yMGJjEUpj1HleRAortxvpiYdvRjBeU61B/r+FFSKwMZ+gAAAABJRU5ErkJggg==" alt="Timer-5" /></button></li>' +
					'</ul>';
			},

			createTimerFace: function()
			{
				return '<section class="dinoTimer">' +
					'<svg class="dinoTimerRotate" viewbox="0 0 250 250">' +
					'<defs>' +
					'<linearGradient spreadMethod="pad" id="gradientTimer-' + this._uId + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
					'<stop offset="0%" style="stop-color:rgb(255, 255, 0); stop-opacity: 1;" />' +
					'<stop offset="50" style="stop-color:rgba(48, 48, 48, 0.5); stop-opacity: 0.5;" />' +
					'<stop offset="100%" style="stop-color:rgb(0, 0, 0); stop-opacity: 1;" />' +
					'</linearGradient>' +
					'</defs>' +
					'<path id="dinoTimerLoader-' + this._uId + '" transform="translate(125, 125)" class="dinoTimerLoader" fill="url(#gradientTimer-' + this._uId + ')" />' +
					'</svg>' +
					'<div class="dinoTimerDots">' +
					'<span class="dinoTimerTime deg0"></span>' +
					'<span class="dinoTimerTime deg45"></span>' +
					'<span class="dinoTimerTime deg90"></span>' +
					'<span class="dinoTimerTime deg135"></span>' +
					'</div>' +
					'</section>';
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