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
		Store the name of the plugin in the "pluginName" variable. This
		variable is used in the "Plugin" constructor below, as well as the
		plugin wrapper to construct the key for the "$.data" method.
	*/
	let pluginName = 'dinoKnob';

	/*
		The "Plugin" constructor, builds a new instance of the plugin for the
		DOM node(s) that the plugin is called on. For example,
		"$('h1').pluginName();" creates a new instance of pluginName for
		all h1's.
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
			Provide local access to the DOM node(s) that called the plugin,
			as well local access to the plugin name and default options.
		*/
		this.element = element;
		/***************************************************************************/
		this._uId = this.createUniqId(8);
		this._name = pluginName;
		this._flag = false;
		this._version = 'V1.02.2021';
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
		];
		/***************************************************************************/
		jQuery(this.element).append(this.createKnobWidget());
		jQuery(this.element).find('#dinoKnobValue-' + this._uId).html("0");
		jQuery(this.element).find("#setDinoKnobValue-" + this._uId).val("0");
		/***************************************************************************/
		this._powerButton = jQuery(this.element).find('#dinoKnobSwitch-' + this._uId);
		this._knobTop = jQuery(this.element).find('#dinoKnobTop-' + this._uId);
		this._startDeg = -1;
		this._currentDeg = 0;
		this._rotation = 0;
		this._lastDeg = 0;
		/***************************************************************************/
		this._rad2deg = 180 / Math.PI;
		this._deg = 0;
		this._angle = 0;
		this._bars = jQuery(this.element).find('.knobBars');
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

			initKnob: function ()
			{
				let widget = this;

				jQuery(window).bind('resize', function ()
				{

				});

				let colorBarTheme = [];
				let knobBarTheme = widget.options.barStyle;
				if(knobBarTheme === "hot"){colorBarTheme = widget._knobColorThemes[0];}
				else if(knobBarTheme === "cold"){colorBarTheme = widget._knobColorThemes[1];}
				else if(knobBarTheme === "mono"){colorBarTheme = widget._knobColorThemes[2];}

				for(let i = 0; i < colorBarTheme.length; i++)
				{
					widget._deg = i * 12;
					// Create the color bars
					jQuery('<section id="dinoColorBar-' + this._uId + '-'+i+'" class="knobColorBar">').css({
						'backgroundColor': colorBarTheme[i],
						'-moz-transform': 'rotate(' + widget._deg + 'deg)',
						'-webkit-transform': 'rotate(' + widget._deg + 'deg)',
						'-o-transform': 'rotate(' + widget._deg + 'deg)',
						'-ms-transform': 'rotate(' + widget._deg + 'deg)',
						'transform': 'rotate(' + widget._deg + 'deg)',
						'top': Math.round(-Math.sin(widget._deg / widget._rad2deg) * 100 + 115),
						'left': Math.round(Math.cos((180 - widget._deg) / widget._rad2deg) * 100 + 110)
					}).appendTo(widget._bars);
				}

				let knobTheme = widget.options.theme;
				if(knobTheme === "light")
				{
					widget._bars.find('.knobColorBar').css({
						'-moz-box-shadow': '0 0 30px 6px rgba(252, 252, 0, 0.6)',
						'-o-box-shadow': '0 0 30px 6px rgba(252, 252, 0, 0.6)',
						'-webkit-box-shadow': '0 0 30px 6px rgba(252, 252, 0, 0.6)',
						'box-shadow': '0 0 30px 6px rgba(252, 252, 0, 0.6)'
					});

					widget.$element.find('#dinoKnob-' + widget._uId).css({
						'background-color': 'rgba(6, 101, 191, 1)'
					});
				}
				else if(knobTheme === "dark")
				{
					widget._bars.find('.knobColorBar').css({
						'-moz-box-shadow': '0 0 30px 6px rgba(0, 0, 0, 0.6)',
						'-o-box-shadow': '0 0 30px 6px rgba(0, 0, 0, 0.6)',
						'-webkit-box-shadow': '0 0 30px 6px rgba(0, 0, 0, 0.6)',
						'box-shadow': '0 0 30px 6px rgba(0, 0, 0, 0.6)'
					});

					widget.$element.find('#dinoKnob-' + widget._uId).css({
						'background-color': 'rgba(54, 54, 57, 1)'
					});
				}
			},

			/***************************************************************************/

			createKnobWidget: function ()
			{
				return '<main id="dinoKnobBars-' + this._uId + '" class="knobBars" role="main">' +

					'<article id="dinoKnob-' + this._uId + '" class="knob">' +

					'<section id="dinoKnobTop-' + this._uId + '" class="knobTop"></section>' +

					'<section class="dinoKnobSwitch">' +

						'<label for="dinoKnobSwitch-' + this._uId + '"></label>' +

						'<input id="dinoKnobSwitch-' + this._uId + '" name="dinoKnobSwitch-' + this._uId + '" type="checkbox" />' +

						'<div class="dinoButton">' +

							'<svg class="dinoPower-off">' +

								'<use xlink:href="#dinoLine-' + this._uId + '" class="line"/>' +

								'<use xlink:href="#dinoCircle-' + this._uId + '" class="circle"/>' +

							'</svg>' +

							'<svg class="dinoPower-on">' +

								'<use xlink:href="#dinoLine-' + this._uId + '" class="line"/>' +

								'<use xlink:href="#dinoCircle-' + this._uId + '" class="circle"/>' +

							'</svg>' +

						'</div>' +

					'</section>' +


				    '<section id="dinoKnobValue-' + this._uId + '" class="knobValue"></section>' +

					'<label for="setDinoKnobValue-' + this._uId + '"></label>' +

					'<input id="setDinoKnobValue-' + this._uId + '" name="setDinoKnobValue-' + this._uId + '" type="hidden" />' +

					'</article>' +

					'<svg id="dinoPowerSwitch-' + this._uId + '" xmlns="http://www.w3.org/2000/svg" style="display: none;">' +

					'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="dinoLine-' + this._uId + '">' +

					'<line x1="75" y1="34" x2="75" y2="58"/>' +

					'</symbol>' +

					'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="dinoCircle-' + this._uId + '">' +

					'<circle cx="75" cy="80" r="35"/>' +

					'</symbol>' +

					'</svg>' +

					'</main>';
			},

			/***************************************************************************/

			powerButtonClick: function ()
			{
				if(jQuery(this._powerButton).is(':checked'))
				{
					this.buttonStateCallback(true);
				}
				else
				{
					this.buttonStateCallback(false);
				}
			},

			/***************************************************************************/

			rotateKnob: function (direction)
			{
				let widget = this;
				let colorBars = widget._bars.find('.knobColorBar');
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

						lastNum = numBars;
						colorBars.removeClass('active').slice(0, numBars).addClass('active');
						//--------------------------------------------------------------

						if (widget._angle >= widget.options.maxAngle)
						{
							widget._angle = widget.options.maxAngle;
						}

						widget._knobTop.css({
							'-moz-transform': 'rotate(' + widget._angle + 'deg)',
							'-webkit-transform': 'rotate(' + widget._angle + 'deg)',
							'-o-transform': 'rotate(' + widget._angle + 'deg)',
							'-ms-transform': 'rotate(' + widget._angle + 'deg)',
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

						lastNum = numBars;
						colorBars.removeClass('active').slice(0, numBars).addClass('active');
						//--------------------------------------------------------------

						if (widget._angle <= widget.options.minAngle)
						{
							widget._angle = widget.options.minAngle;
						}

						widget._knobTop.css({
							'-moz-transform': 'rotate(' + widget._angle + 'deg)',
							'-webkit-transform': 'rotate(' + widget._angle + 'deg)',
							'-o-transform': 'rotate(' + widget._angle + 'deg)',
							'-ms-transform': 'rotate(' + widget._angle + 'deg)',
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

				if(percentValue > widget.options.maxValue)
				{
					percentValue = widget.options.maxValue;
				}

				// return the value to the function turn
				jQuery(widget.element).find("#setDinoKnobValue-" + widget._uId).val(widget._angle.toFixed(0));
				jQuery(widget.element).find(".knobValue").html(percentValue.toFixed(0));
				widget.turnKnobUpdateCallback.call(widget, percentValue.toFixed(0), widget._angle, widget._angle.toFixed(0) / 360);

				if (widget.options.debug)
				{
					console.info(widget._angle.toFixed(0));
					console.info(widget._angle.toFixed(0) / 360);
					console.info(percentValue.toFixed(0));
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

				/*
					Bind event(s) to handlers that trigger other functions, ie:
					"plugin.$element.on('click', function() {});". Note the use of
					the cached variable we created in the buildCache method.

					All events are namespaced, ie:
					".on('click'+'.'+this._name', function() {});".
					This allows us to unbind plugin-specific events using the
					unbindEvents method below.
				*/
				plugin.$element.on('change' + '.' + plugin._name, '#dinoKnobSwitch-' + plugin._uId, function(e)
				{
					e.preventDefault();

					if(jQuery(plugin._powerButton).is(':checked'))
					{
						plugin._knobTop.css({
							'border': '3px solid rgba(255, 197, 0, 1)'
						});

						plugin.$element.find("#dinoKnobValue-" + plugin._uId).css({
							'color': 'rgba(255, 197, 0, 1)'
						});

						plugin._bars.find(".knobColorBar").css({
							'display': 'block'
						});
					}
					else
					{
						plugin._knobTop.css({
							'border': '12px solid rgba(255, 197, 0, .3)'
						});

						plugin.$element.find("#dinoKnobValue-" + plugin._uId).css({
							'color': 'rgba(255, 197, 0, .3)'
						});

						plugin._bars.find(".knobColorBar").css({
							'display': 'none'
						});
					}

					plugin.powerButtonClick.call(plugin);
				});

				plugin.$element.on('input change' + '.' + plugin._name, '#setDinoKnobValue-' + plugin._uId, function(e)
				{
					e.preventDefault();

					let val = jQuery(plugin.element).find("#setDinoKnobValue-" + plugin._uId).val();
					let colorBars = plugin._bars.find('.knobColorBar');
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

					if(percentValue > plugin.options.maxValue)
					{
						percentValue = plugin.options.maxValue;
					}

					//--------------------------------------------------------------
					numBars = Math.round((colorBars.length * (val / 360)));

					// Update the dom only when the number of active bars
					// changes, instead of on every move
					if(numBars === lastNum)
					{
						return false;
					}

					lastNum = numBars;
					colorBars.removeClass('active').slice(0, numBars).addClass('active');

					//--------------------------------------------------------------

					plugin._knobTop.css({
						'-moz-transform': 'rotate(' + val + 'deg)',
						'-webkit-transform': 'rotate(' + val + 'deg)',
						'-o-transform': 'rotate(' + val + 'deg)',
						'-ms-transform': 'rotate(' + val + 'deg)',
						'transform': 'rotate(' + val + 'deg)'
					});

					jQuery(plugin.element).find("#setDinoKnobValue-" + plugin._uId).val(val);
					jQuery(plugin.element).find(".knobValue").html(percentValue.toFixed(0));
					plugin.turnKnobUpdateCallback.call(plugin, percentValue.toFixed(0), val, val / 360);

					plugin._angle = val;
					plugin._currentDeg = val;
					plugin._lastDeg = val;
					plugin._rotation = val;

					if (plugin.options.debug)
					{
						console.info(plugin._angle.toFixed(0));
						console.info((plugin._angle.toFixed(0) / 360));
						console.info(percentValue.toFixed(0));
					}
				});

				plugin.$element.on('mousewheel DOMMouseScroll MozMousePixelScroll' + '.' + plugin._name, '#dinoKnob-' + plugin._uId, function(e)
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
					let colorBars = plugin._bars.find('.knobColorBar');
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

							lastNum = numBars;
							colorBars.removeClass('active').slice(0, numBars).addClass('active');

							//--------------------------------------------------------------
						}

						plugin._knobTop.css({
							'-moz-transform': 'rotate(' + plugin._angle + 'deg)',
							'-webkit-transform': 'rotate(' + plugin._angle + 'deg)',
							'-o-transform': 'rotate(' + plugin._angle + 'deg)',
							'-ms-transform': 'rotate(' + plugin._angle + 'deg)',
							'transform': 'rotate(' + plugin._angle + 'deg)'
						});

                        //--------------------------------------------------------------

						jQuery(plugin.element).find("#setDinoKnobValue-" + plugin._uId).val(plugin._angle.toFixed(0));
						jQuery(plugin.element).find(".knobValue").html(percentValue.toFixed(0));
						plugin.turnKnobUpdateCallback.call(plugin, percentValue.toFixed(0), plugin._angle, plugin._angle.toFixed(0) / 360);

						if (plugin.options.debug)
						{
							console.info(plugin._angle.toFixed(0));
							console.info((plugin._angle.toFixed(0) / 360));
							console.info(percentValue.toFixed(0));
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

			buttonStateCallback: function (state)
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
					onComplete.call(this.element, state);
				}
			},

			turnKnobUpdateCallback: function (percent, degree, ratio)
			{
				// Cache onTurn option
				let onTurn = this.options.onTurn;

				if (typeof onTurn === "function")
				{
					onTurn.call(this.element, percent, degree, ratio);
				}
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
		maxAngle: 360,
		// Plugin theme Light or Dark
		theme: 'light',
		// Circle Bar style Hot, Cold or Mono
		barStyle: 'hot',
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