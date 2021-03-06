/*
 * DinoKnob
 * Requires: jQuery v3.0.0+
 *
 * JQuery and CSS3 based UI-Knob element implementing touch,
 * keyboard, mouse and scroll wheel support.
 *
 * Created by 2007 - 2021 MCX-Systems
 */
(function(root, factory)
{
	if (typeof window.define === 'function' && window.define.amd)
	{
		window.define(['jquery'], factory);
	}
	else if (typeof exports === 'object')
	{
		module.exports = factory(require('jquery'));
	}
	else
	{
		root.dinoKnob = factory(root.jquery);
	}
}(this,
	function()
	{
		'use strict';

		/*
			Store the name of the plugin in the "pluginName" variable. This
			variable is used in the "Plugin" constructor below, as well as the
			plugin wrapper to construct the key for the "$.data" method.
	
			More: http://api.jquery.com/jquery.data/
		*/
		const pluginName = 'dinoKnob';

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

			/*
				Provide local access to the DOM node(s) that called the plugin,
				as well local access to the plugin name and default options.
			*/
			this.element = element;
			/***************************************************************************/
			this._flag = false;
			this._name = pluginName;
			this._uId = this.createUniqId(8);
			this._language = this.getUserLanguage();
			/***************************************************************************/
			// DinoKnob circle Bars color set
			this._knobColorThemes = [
				[
					'rgb(38,224,0)', 'rgb(47,227,0)', 'rgb(55,231,0)', 'rgb(69,234,0)', 'rgb(81,239,0)',
					'rgb(97,248,0)', 'rgb(107,251,0)', 'rgb(119,255,2)', 'rgb(147,255,11)', 'rgb(158,255,9)',
					'rgb(255,255,53)', 'rgb(255,255,51)', 'rgb(255,255,51)', 'rgb(242,255,10)', 'rgb(255,243,10)',
					'rgb(255,220,9)', 'rgb(255,168,8)', 'rgb(255,153,8)', 'rgb(255,95,4)', 'rgb(255,79,3)',
					'rgb(248,58,0)', 'rgb(229,32,0)', '', '', '', '', '', '', '', ''
				],
				[
					'rgb(66,159,245)', 'rgb(66,159,245)', 'rgb(88,169,243)', 'rgb(88,169,243)', 'rgb(88,169,243)',
					'rgb(107,187,248)', 'rgb(107,187,248)', 'rgb(134,198,248)', 'rgb(134,198,248)', 'rgb(134,198,248)',
					'rgb(158,209,248)', 'rgb(158,209,248)', 'rgb(216,248,158)', 'rgb(216,248,158)', 'rgb(216,248,158)',
					'rgb(211,250,138)', 'rgb(211,250,138)', 'rgb(202,248,117)', 'rgb(202,248,117)', 'rgb(202,248,117)',
					'rgb(192,248,90)', 'rgb(192,248,90)', '', '', '', '', '', '', '', ''
				],
				[
					'rgb(255,255,204)', 'rgb(255,255,204)', 'rgb(255,255,204)', 'rgb(255,255,204)', 'rgb(255,255,204)',
					'rgb(255,255,153)', 'rgb(255,255,153)', 'rgb(255,255,153)', 'rgb(255,255,153)', 'rgb(255,255,153)',
					'rgb(255,255,102)', 'rgb(255,255,102)', 'rgb(255,255,102)', 'rgb(255,255,102)', 'rgb(255,255,51)',
					'rgb(255,255,51)', 'rgb(255,255,51)', 'rgb(252,244,0)', 'rgb(252,244,0)', 'rgb(252,244,0)',
					'rgb(252,244,0)', 'rgb(252,244,0)', '', '', '', '', '', '', '', ''
				],
				[
					'rgb(158,230,96)', 'rgb(139,227,78)', 'rgb(82,240,64)', 'rgb(82,240,64)', 'rgb(82,240,64)',
					'rgb(82,240,64)', 'rgb(82,240,64)', 'rgb(112,239,61)', 'rgb(70,217,25)', 'rgb(44,214,7)',
					'rgb(62,204,2)', 'rgb(78,193,0)', 'rgb(14,196,34)', 'rgb(12,183,13)', 'rgb(25,169,10)',
					'rgb(36,155,8)', 'rgb(46,141,6)', 'rgb(10,157,28)', 'rgb(12,160,13)', 'rgb(27,134,12)',
					'rgb(38,140,14)', 'rgb(38,140,14)', '', '', '', '', '', '', '', ''
				],
				[
					'rgb(255,255,185)', 'rgb(255,255,168)', 'rgb(255,255,152)', 'rgb(255,255,135)', 'rgb(255,255,118)',
					'rgb(255,255,101)', 'rgb(255,255,84)', 'rgb(255,255,67)', 'rgb(255,255,51)', 'rgb(255,255,34)',
					'rgb(255,255,17)', 'rgb(255,254,0)', 'rgb(255,251,0)', 'rgb(255,247,0)', 'rgb(255,243,0)',
					'rgb(255,239,0)', 'rgb(255,234,0)', 'rgb(255,228,0)', 'rgb(255,222,0)', 'rgb(255,216,0)',
					'rgb(255,209,0)', 'rgb(255,201,0)', '', '', '', '', '', '', '', ''
				],
				[
					'rgb(95,176,255)', 'rgb(86,172,255)', 'rgb(76,167,255)', 'rgb(67,163,255)', 'rgb(58,158,255)',
					'rgb(51,153,255)', 'rgb(44,149,255)', 'rgb(38,144,255)', 'rgb(32,140,255)', 'rgb(27,136,255)',
					'rgb(21,131,253)', 'rgb(20,125,246)', 'rgb(19,119,238)', 'rgb(18,113,231)', 'rgb(17,108,223)',
					'rgb(16,102,216)', 'rgb(15,97,208)', 'rgb(14,91,200)', 'rgb(14,86,192)', 'rgb(13,81,185)',
					'rgb(12,76,177)', 'rgb(11,71,169)', '', '', '', '', '', '', '', ''
				],
				[
					'rgb(255,146,143)', 'rgb(255,137,133)', 'rgb(255,130,124)', 'rgb(255,122,114)', 'rgb(255,114,105)',
					'rgb(255,107,95)', 'rgb(255,100,86)', 'rgb(255,93,76)', 'rgb(255,86,67)', 'rgb(255,79,57)',
					'rgb(255,73,48)', 'rgb(255,66,38)', 'rgb(254,60,29)', 'rgb(251,54,21)', 'rgb(248,49,15)',
					'rgb(208,44,6)', 'rgb(201,44,5)', 'rgb(187,44,4)', 'rgb(179,43,4)', 'rgb(172,43,4)',
					'rgb(172,43,4)', 'rgb(172,43,4)', '', '', '', '', '', '', '', ''
				]
			];
			/***************************************************************************/
			this._angle = 0;
			this._minAngle = 0;
			this._maxAngle = 260;
			/***************************************************************************/
			this._startDeg = 0;
			this._currentDeg = 0;
			this._lastDeg = 0;
			this._rotation = 0;
			this._colorBarTheme = [];
			/***************************************************************************/
			this._buttonState = false;
			this._doCountDown = false;
			this._timerState = false;
			this._timerTime = 0;
			this._timerCounter = 0;
			this._timerCounterLeft = 0;
			/***************************************************************************/
			this._defaults = $.fn.dinoKnob.defaults;

			/*
				The "$.extend" method merges the contents of two or more objects,
				and stores the result in the first object. The first object is
				empty so that we don't alter the default options for future
				instances of the plugin.
	
				More: http://api.jquery.com/jquery.extend/
			*/
			this.options = $.extend({}, this._defaults, options);

			/*
		     * Process and add data-attrs to options as well for ease of use. Also, if
		     * data-dinoKnob is an object then use it as extra options and if it's not
		     * then use it as a title.
		     */
			if (typeof($(this.element).data("dinoKnob")) === "object")
			{
				$.extend(this.options, $(this.element).data("dinoKnob"));
			}

			const dataKeys = Object.keys($(this.element).data());
			const dataAttrs = {};

			for (let i = 0; i < dataKeys.length; i++)
			{
				let key = dataKeys[i].replace(pluginName, '');
				if (key === "")
				{
					continue;
				}

				// Lowercase first letter
				key = key.charAt(0).toLowerCase() + key.slice(1);
				dataAttrs[key] = $(this.element).data(dataKeys[i]);

				// We cannot use extend for data_attrs because they are automatically
				// lower cased. We need to do this manually and extend this.options with
				// data_attrs
				for (let settingsKey in this.options)
				{
					if (this.options.hasOwnProperty(settingsKey))
					{
						if (settingsKey.toLowerCase() === key)
						{
							this.options[settingsKey] = dataAttrs[key];
						}
					}
				}
			}

			/*
				The "init" method is the starting point for all plugin logic.
				Calling the init method here in the "Plugin" constructor function
				allows us to store all methods (including the init method) in the
				plugin prototype. Storing methods required by the plugin in its
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
		$.extend(Plugin.prototype,
			{
				// Initialization logic
				init: function()
				{
					const widget = this;
					/*
						Create additional methods below and call them via
						"this.myFunction(arg1, arg2)", ie: "this.buildCache();".
	
						Note, you can access the DOM node(s), plugin name, default
						plugin options and custom plugin options for a each instance
						of the plugin by using the variables "this.element",
						"this._name", "this._defaults" and "this.options" created in
						the "Plugin" constructor function (as shown in the buildCache
						method below).
					*/
					this.buildCache();
					this.bindEvents();

					if (widget.options.debug)
					{
						window.console.info('--------------------------------------------');
						window.console.info('--------------------------------------------');
						window.console.info(widget.capitalizeFirstLetter(widget._name) +
							' ' +
							$.fn.dinoKnob.version +
							' successfully initialized and is ready.');
						window.console.info(`Language is set to: ${widget.options.language}`);
						window.console.info(
							`Plugin Description: ${widget.getI18n('plugin_desc', widget.options.language)}`);
						window.console.info(`Uniq ID generated: ${widget._uId}`);
						window.console.info('--------------------------------------------');
						window.console.info('--------------------------------------------');
					}

					widget.$element.append(this.createKnobWidget());

					widget.initKnob();
				},

				/***************************************************************************/

				initKnob: function()
				{
					let widget = this;
					let knobBarTheme = widget.options.barTheme;
					let rad2deg = 180 / Math.PI;
					let deg = 0;

					if (knobBarTheme === 'hot')
					{
						widget._colorBarTheme = widget._knobColorThemes[0];
					}
					else if (knobBarTheme === 'cold')
					{
						widget._colorBarTheme = widget._knobColorThemes[1];
					}
					else if (knobBarTheme === 'green')
					{
						widget._colorBarTheme = widget._knobColorThemes[3];
					}
					else if (knobBarTheme === 'yellow')
					{
						widget._colorBarTheme = widget._knobColorThemes[4];
					}
					else if (knobBarTheme === 'blue')
					{
						widget._colorBarTheme = widget._knobColorThemes[5];
					}
					else if (knobBarTheme === 'red')
					{
						widget._colorBarTheme = widget._knobColorThemes[6];
					}
					else
					{
						widget._colorBarTheme = widget._knobColorThemes[2];
					}

					for (let i = 0; i < widget._colorBarTheme.length; i++)
					{
						deg = i * 12;
						// Create the color bar
						$(`<span id="dinoKnobBarColor-${widget._uId}-${i}" class="dinoKnobBarColor">`).css({
							'backgroundColor': widget._colorBarTheme[i],
							'transform': `rotate(${deg}deg)`,
							'box-shadow': '0 6px 20px 4px rgba(0, 0, 0, 1)',
							'top': Math.round(-Math.sin(deg / rad2deg) * 100 + 115),
							'left': Math.round(Math.cos((180 - deg) / rad2deg) * 100 + 110)
						}).appendTo(widget.$element.find(`#dinoKnobBars-${widget._uId}`));
					}

					widget.$element.attr("data-knob-id", widget._uId);

					// Set default widget colors
					widget.$element.find(`#dinoKnobHolder-${widget._uId}`).css({
						'background-color': widget.options.bgColor
					});

					widget.$element.find(`#dinoKnobValue-${widget._uId}`).css({
						'background-color': widget.options.bgColor
					});

					widget.$element.find(`#dinoKnobTimers-${widget._uId}`).css({
						'background-color': widget.options.bgColor
					});

					widget.$element.find(`#dinoKnobInfo-${widget._uId}`).css({
						'background-color': widget.options.bgColor
					});

					widget.$element.find(`#dinoKnobNavigation-${widget._uId} .dinoKnobMenu i`).css({
						'color': widget.options.bgColor
					});

					/*----------------------------------------------------------------------*/

					// Set the widgets blur effect, because in firefox SVG Blur is not working
					if (window.navigator.userAgent.indexOf('Firefox') === -1)
					{
						widget.$element.find(`#dinoKnob-${widget._uId}`).css({
							'-webkit-filter': `url("#dinoBlurFilter-${widget._uId}")`,
							'filter': `url("#dinoBlurFilter-${widget._uId}")`
						});
					}
					else
					{
						widget.$element.find(`#dinoKnob-${widget._uId}`).css({
							'-webkit-filter':
								`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='dinoBlurFilter-${
									widget._uId
									}'><feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10' /><feColorMatrix in='blur' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6' result='flt' /><feBlend in2='flt' in='SourceGraphic' result='mix' /></filter></svg>#dinoBlurFilter-${
									widget._uId}")`,
							'filter':
								`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='dinoBlurFilter-${
									widget._uId
									}'><feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10' /><feColorMatrix in='blur' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6' result='flt' /><feBlend in2='flt' in='SourceGraphic' result='mix' /></filter></svg>#dinoBlurFilter-${
									widget._uId}")`
						});
					}

					// Disable function as necessary from config
					if (!widget.options.showTimer)
					{
						widget.$element.find(`#dinoKnobMenu1-${widget._uId}`).addClass('disabled');
					}

					if (!widget.options.showLabel)
					{
						widget.$element.find(`#dinoKnobMenu2-${widget._uId}`).addClass('disabled');
					}

					if (!widget.options.showAlert)
					{
						widget.$element.find(`#dinoKnobMenu3-${widget._uId}`).addClass('disabled');
					}
				},

				/***************************************************************************/

				// Create default knob widget html elements
				createKnobWidget: function()
				{
					return `<article id="dinoKnob-${this._uId}" class="dinoKnob"><section id="dinoKnobBars-${this._uId
						}" class="dinoKnobBars"></section><section id="dinoKnobTop-${this._uId
						}" class="dinoKnobTop"></section><section id="dinoKnobHolder-${this._uId
						}" class="dinoKnobHolder"><div id="dinoKnobSwitch-${
						this._uId
						}" class="dinoKnobSwitch"><label for="dinoKnobSwitchInput-"></label><input id="dinoKnobSwitchInput-${
						this._uId
						}" type="checkbox" /><div id="dinoButton-${this._uId
						}" class="dinoButton"><svg id="dinoPower-off-${this._uId
						}" class="dinoPower-off"><use xlink:href="#dinoLine-${this._uId
						}" class="dinoLine"/><use xlink:href="#dinoCircle-${this._uId
						}" class="dinoCircle"/></svg><svg id="dinoPower-on-${this._uId
						}" class="dinoPower-on"><use xlink:href="#dinoLine-${this._uId
						}" class="dinoLine"/><use xlink:href="#dinoCircle-${this._uId
						}" class="dinoCircle"/></svg></div></div><div id="dinoKnobInfo-${this._uId
						}" class="dinoKnobInfo dinoAnimated"></div><div id="dinoKnobValue-${this._uId
						}" class="dinoKnobValue dinoAnimated"></div><nav id="dinoKnobTimers-${this._uId
						}" class="dinoKnobTimers dinoAnimated"></nav></section><nav id="dinoKnobNavigation-${this._uId
						}" class="dinoNavWrap"><section id="dinoKnobMenu2-${this._uId
						}" class="dinoKnobMenu knobMenu2"><i id="dinoKnobMenuIcon2-${this._uId
						}" class="dinoKnobIcon knob-icon-adjust"></i></section><section id="dinoKnobMenu1-${this._uId
						}" class="dinoKnobMenu knobMenu1"><i id="dinoKnobMenuIcon1-${this._uId
						}" class="dinoKnobIcon knob-icon-stopwatch"></i></section><section id="dinoKnobMenu3-${this._uId
						}" class="dinoKnobMenu knobMenu3"><i id="dinoKnobMenuIcon3-${this._uId
						}" class="dinoKnobIcon knob-icon-alert"></i></section></nav><svg id="dinoPowerSwitch-${this._uId
						}" xmlns="http://www.w3.org/2000/svg" style="display: none;"><defs><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="dinoLine-${
						this._uId
						}"><line x1="75" y1="34" x2="75" y2="58"/></symbol><symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="dinoCircle-${
						this._uId}"><circle cx="75" cy="80" r="35"/></symbol></defs></svg><svg id="dinoBlurFilterSvg-${
						this._uId
						}" xmlns="http://www.w3.org/2000/svg" style="display: none;"><defs><filter id="dinoBlurFilter-${
						this._uId
						}"><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" /><feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6" result="flt" /><feBlend in2="flt" in="SourceGraphic" result="mix" /></filter></defs></svg><input id="dinoKnobAngleValue-${
						this._uId}" type="hidden" /></article>`;
				},

				/***************************************************************************/

				// Remove plugin instance completely
				destroy: function()
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
				},

				// Cache DOM nodes for performance
				buildCache: function()
				{
					/*
						Create variable(s) that can be accessed by other plugin
						functions. For example, "this.$element = $(this.element);"
						will cache a jQuery reference to the element that initialized
						the plugin. Cached variables can then be used in other methods.
					*/
					this.$element = $(this.element);
				},

				// Bind events that trigger methods
				bindEvents: function()
				{
					const plugin = this;

					const secondsForClicks = 1;
					const numClicksRequired = 5;
					const clickTimestamps = [numClicksRequired];

					let oldestIndex = 0;
					let nextIndex = 0;
					let hoverTimeout = false;

					/*
						Bind event(s) to handlers that trigger other functions, ie:
						"plugin.$element.on('click', function() {});". Note the use of
						the cached variable we created in the buildCache method.
	
						All events are namespaced, ie:
						".on('click'+'.'+this._name', function() {});".
						This allows us to unbind plugin-specific events using the
						unbindEvents method below.
					*/

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`click touchstart.${plugin._name}`,
						`#dinoCloseOverlay-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`).css({
								'opacity': '0',
								'visibility': 'collapse'
							}).removeClass('zoomIn').addClass('zoomOut');

							if (plugin.options.showLabel)
							{
								plugin.$element.find(`#dinoKnobMenu2-${plugin._uId}`).removeClass('disabled');
							}
						});

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`click touchstart.${plugin._name}`,
						`#dinoTimer-1-${plugin._uId}, #dinoTimer-2-${plugin._uId}, #dinoTimer-3-${plugin._uId
						}, #dinoTimer-4-${plugin._uId}, #dinoTimer-5-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							let countTimeout = false;
							plugin._timerState = true;
							plugin._timerCounter = 0;
							plugin._timerTime = $(this).data('timer');
							plugin._doCountDown = true;

							const timersLi = plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`);
							plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`).empty()
								.html(plugin.createTimerFace());
							plugin.buttonStateCallback(plugin._uId,
								plugin._buttonState,
								plugin._timerState,
								plugin._timerTime);

							if (plugin.options.debug)
							{
								window.console.log(plugin._uId + ' ==> BUTTON STATE ==> ' + plugin._buttonState);
								window.console.log(plugin._uId + ' ==> TIMER STATE ==> ' + plugin._timerState);
								window.console.log(plugin._uId + ' ==> TIMER SET ==> ' + plugin._timerTime);
							}

							plugin.$element.find(`#dinoKnobSwitchInput-${plugin._uId}`).prop('checked', true)
								.trigger('change');
							plugin.$element.find(`#dinoKnobMenu1-${plugin._uId}`).addClass('disabled');

							function drawCountDown()
							{
								plugin._timerCounter++;
								plugin._timerCounter %= 360;

								let r = plugin.degreesToRadians(plugin._timerCounter);
								let x = Math.sin(r) * 125;
								let y = Math.cos(r) * -125;

								let mid = (plugin._timerCounter > 180) ? 1 : 0;
								let anim = `M 0 0 v -125 A 125 125 1 ${mid} 1 ${x} ${y} z`;

								plugin.$element.find(`#dinoTimerLoader-${plugin._uId}`).attr('d', anim);
								if (plugin._doCountDown)
								{
									if (plugin._timerCounterLeft >= plugin._timerTime * 1000)
									{
										plugin._doCountDown = false;
										plugin._timerCounter = 0;
										plugin._timerCounterLeft = 0;

										plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`).css({
											'opacity': '0',
											'visibility': 'collapse'
										}).removeClass('zoomIn').addClass('zoomOut');

										let li = timersLi.find('li');
										for (let i = 0; i < li.length; i++)
										{
											plugin.rotateMenu(li[i], -360);
										}

										plugin._timerTime = 0;
										plugin._timerState = false;
										plugin.buttonStateCallback(plugin._uId,
											plugin._buttonState,
											plugin._timerState,
											plugin._timerTime);

										plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`).empty();
										plugin.$element.find(`#dinoKnobSwitchInput-${plugin._uId}`)
											.prop('checked', false).trigger('change');
										plugin.$element.find(`#dinoKnobMenu1-${plugin._uId}`).removeClass('disabled');

										if (plugin.options.showLabel)
										{
											plugin.$element.find(`#dinoKnobMenu2-${plugin._uId}`)
												.removeClass('disabled');
										}

										window.clearTimeout(countTimeout);
									}

									plugin._timerCounterLeft += Math.round((plugin._timerTime / 360) * 1000);
									let timeL = plugin._timerTime - (plugin._timerCounterLeft / 1000).toFixed(0);
									plugin.timerUpdateCallback(plugin._uId, timeL);

									if (plugin.options.debug)
									{
										window.console.log(plugin._uId + ' ==> TIME LEFT ==> ' + timeL);
									}

									countTimeout = window.setTimeout(drawCountDown, (plugin._timerTime / 360) * 1000);
								}
							}

							drawCountDown();
						});

					plugin.$element.on(`click touchstart.${plugin._name}`,
						`#dinoKnobMenu1-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`).css({
								'opacity': '1',
								'visibility': 'visible'
							}).removeClass('zoomOut').addClass('zoomIn');

							if (plugin.options.showLabel)
							{
								plugin.$element.find(`#dinoKnobMenu2-${plugin._uId}`).addClass('disabled');
							}

							const timersLi = plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`);
							plugin.$element.find(`#dinoKnobTimers-${plugin._uId}`).empty()
								.html(plugin.createTimerMenu());

							const li = timersLi.find('li');
							const deg = 360 / li.length;

							for (let i = 0; i < li.length; i++)
							{
								const d = i * deg;
								plugin.rotateMenu(li[i], d);
							}
						});

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`mouseleave.${plugin._name}`,
						`#dinoKnobMenu2-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							if (plugin.options.showLabel)
							{
								plugin.$element.find(`#dinoKnobValue-${plugin._uId}`).css({
									'opacity': '0',
									'visibility': 'collapse'
								}).removeClass('zoomIn').addClass('zoomOut');
							}

							window.clearTimeout(hoverTimeout);
						});

					plugin.$element.on(`mouseenter.${plugin._name}`,
						`#dinoKnobMenu2-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							hoverTimeout = window.setTimeout(function()
								{
									if (plugin.options.showLabel)
									{
										plugin.$element.find(`#dinoKnobValue-${plugin._uId}`).css({
											'opacity': '1',
											'visibility': 'visible'
										}).removeClass('zoomOut').addClass('zoomIn');
									}
								},
								500);
						});

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`click touchstart.${plugin._name}`,
						`#dinoKnobInfo-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							plugin.$element.find(`#dinoKnobInfo-${plugin._uId}`).css({
								'opacity': '0',
								'visibility': 'collapse'
							}).removeClass('zoomIn').addClass('zoomOut').html('');
						});

					plugin.$element.on(`click touchstart.${plugin._name}`,
						`#dinoKnobMenu3-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							const timeMillis = (new Date()).getTime();

							// If we have at least the min number of clicks on record
							if (nextIndex === numClicksRequired - 1 || oldestIndex > 0)
							{
								// Check that all required clicks were in required time
								const diff = timeMillis - clickTimestamps[oldestIndex];
								if (diff < secondsForClicks * 1000)
								{
									plugin.$element.find(`#dinoKnobInfo-${plugin._uId}`).css({
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
					/*  Manipulating Events  (mouse, keyboard, touch)                                                 */
					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`mouseleave.${plugin._name}`,
						function(e)
						{
							e.preventDefault();

							plugin.$element.blur();
						});

					plugin.$element.on(`mouseenter.${plugin._name}`,
						function(e)
						{
							e.preventDefault();

							plugin.$element.focus();
						});

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`mousedown touchstart.${plugin._name}`,
						function()
						{
							let a, b, deg, tmp;
							const offset = plugin.$element.offset();
							const bars = plugin.$element.find(`#dinoKnobBars-${plugin._uId}`);
							let numBars = 0;
							let lastNum = -plugin.options.snap;

							const center = {
								y: offset.top + plugin.$element.height() / 2,
								x: offset.left + plugin.$element.width() / 2
							};

							plugin.$element.on(`mousemove.rem touchmove.rem.${plugin._name}`,
								function(e)
								{
									e.preventDefault();

									if (e.targetTouches && e.targetTouches[0])
									{
										a = center.y - e.originalEvent.touches[0].pageY;
										b = center.x - e.originalEvent.touches[0].pageX;
									}
									else
									{
										a = center.y - e.pageY;
										b = center.x - e.pageX;
									}

									deg = plugin.radiansToDegrees(Math.atan2(a, b));

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
									else if (tmp > plugin._maxAngle)
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

									if (plugin._angle > plugin._maxAngle)
									{
										plugin._angle = plugin._maxAngle;
									}

									let inputValue = (plugin._angle / plugin._maxAngle) * plugin.options.maxValue;
									if (inputValue > plugin.options.maxValue)
									{
										inputValue = plugin.options.maxValue;
									}

									if (((inputValue >= plugin.options.maxAlarm) || (inputValue >= plugin.options.maxValue)) && plugin.options.showAlert)
									{
										plugin.$element.find(`#dinoKnobMenu3-${plugin._uId}`).removeClass('active')
											.addClass('active');
									}
									else
									{
										plugin.$element.find(`#dinoKnobMenu3-${plugin._uId}`).removeClass('active');
									}

									if (plugin._angle < plugin._maxAngle)
									{
										if (plugin._angle !== plugin._minAngle)
										{
											if (plugin._angle !== plugin._maxAngle)
											{
												plugin._angle = plugin._angle + plugin.options.snap;
											}
										}

										/*--------------------------------------------------------------*/
										numBars = Math.round((plugin._colorBarTheme.length * (plugin._angle / 360)));

										// Update the dom only when the number of active bars
										// changes, instead of on every move
										if (numBars === lastNum)
										{
											return false;
										}

										if (plugin.$element.find(`#dinoKnobSwitchInput-${plugin._uId}`).prop('checked'))
										{
											lastNum = numBars;
											bars.find('.dinoKnobBarColor').removeClass('active').slice(0, numBars)
												.addClass('active');
										}
										/*--------------------------------------------------------------*/
									}

									plugin.$element.find(`#dinoKnobTop-${plugin._uId}`).css({
										'transform': `rotate(${plugin._angle}deg)`
									}).focus();

									/*--------------------------------------------------------------*/

									plugin.$element.find(`#dinoKnobAngleValue-${plugin._uId}`)
										.val(plugin._angle.toFixed(0));
									if (plugin.options.showLabel)
									{
										plugin.$element.find(`#dinoKnobValue-${plugin._uId}`)
											.html(inputValue.toFixed(0));
									}

									let r = (plugin._angle / plugin._maxAngle);
									plugin.turnKnobCallback.call(plugin,
										plugin._uId,
										inputValue.toFixed(0),
										(r * 100).toFixed(0),
										plugin._angle.toFixed(0),
										r.toFixed(2));

									if (plugin.options.debug)
									{
										window.console.log(plugin._uId + ' ==> VALUE ==> ' + inputValue.toFixed(0));
										window.console.log(plugin._uId + ' ==> PERCENT ==> ' + (r * 100).toFixed(0));
										window.console.log(plugin._uId + ' ==> ANGLE ==> ' + plugin._angle.toFixed(0));
										window.console.log(plugin._uId + ' ==> RATIO ==> ' + r.toFixed(2));
									}

									return true;
								});

							plugin.$element.on(`mouseup touchend touchcancel.${plugin._name}`,
								function()
								{
									plugin.$element.off('.rem');
									// Saving the current rotation
									plugin._rotation = plugin._currentDeg;

									// Marking the starting degree as invalid
									plugin._startDeg = 0;
								});
						});

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`keydown keypress.${plugin._name}`,
						function(e)
						{
							e.preventDefault();

							const keycode = (e.keyCode ? e.keyCode : e.which);
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

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`mousewheel DOMMouseScroll.${plugin._name}`,
						`#dinoKnobHolder-${plugin._uId}`,
						function(e)
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

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`input change.${plugin._name}`,
						`#dinoKnobAngleValue-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							let val = plugin.$element.find(`#dinoKnobAngleValue-${plugin._uId}`).val();
							let bars = plugin.$element.find(`#dinoKnobBars-${plugin._uId}`);
							let numBars;
							let inputValue = (val / plugin._maxAngle) * plugin.options.maxValue;

							if (inputValue > plugin.options.maxValue)
							{
								inputValue = plugin.options.maxValue;
							}

							if (((inputValue >= plugin.options.maxAlarm) || (inputValue >= plugin.options.maxValue)) && plugin.options.showAlert)
							{
								plugin.$element.find(`#dinoKnobMenu3-${plugin._uId}`).removeClass('active').addClass('active');
							}
							else
							{
								plugin.$element.find(`#dinoKnobMenu3-${plugin._uId}`).removeClass('active');
							}

							/*--------------------------------------------------------------*/
							numBars = Math.round((plugin._colorBarTheme.length * (val / 360)));

							if (plugin.$element.find(`#dinoKnobSwitchInput-${plugin._uId}`).prop('checked'))
							{
								bars.find('.dinoKnobBarColor').removeClass('active').slice(0, numBars)
									.addClass('active');
							}
							/*--------------------------------------------------------------*/

							plugin.$element.find(`#dinoKnobTop-${plugin._uId}`).css({
								'transform': `rotate(${val}deg)`
							});

							plugin.$element.find(`#dinoKnobAngleValue-${plugin._uId}`).val(val);

							if (plugin.options.showLabel)
							{
								plugin.$element.find(`#dinoKnobValue-${plugin._uId}`).html(inputValue.toFixed(0));
							}

							let r = val / plugin._maxAngle;
							plugin.turnKnobCallback.call(plugin,
								plugin._uId,
								inputValue.toFixed(0),
								(r * 100).toFixed(0),
								val,
								r.toFixed(2));

							plugin._angle = val;
							plugin._currentDeg = val;
							plugin._lastDeg = val;
							plugin._rotation = val;

							if (plugin.options.debug)
							{
								window.console.log(plugin._uId + ' ==> VALUE ==> ' + inputValue.toFixed(0));
								window.console.log(plugin._uId + ' ==> PERCENT ==> ' + (r * 100).toFixed(0));
								window.console.log(plugin._uId + ' ==> ANGLE ==> ' + val);
								window.console.log(plugin._uId + ' ==> RATIO ==> ' + r.toFixed(2));
							}

							return false;
						});

					/*------------------------------------------------------------------------------------------------*/

					plugin.$element.on(`change.${plugin._name}`,
						`#dinoKnobSwitchInput-${plugin._uId}`,
						function(e)
						{
							e.preventDefault();

							const bars = plugin.$element.find(`#dinoKnobBars-${plugin._uId}`);
							if (plugin.$element.find(`#dinoKnobSwitchInput-${plugin._uId}`).prop('checked'))
							{
								plugin._buttonState = true;
								plugin.buttonStateCallback(plugin._uId,
									plugin._buttonState,
									plugin._timerState,
									plugin._timerTime);

								if (plugin.options.debug)
								{
									window.console.log(plugin._uId + ' ==> BUTTON STATE ==> ' + plugin._buttonState);
									window.console.log(plugin._uId + ' ==> TIMER STATE ==> ' + plugin._timerState);
									window.console.log(plugin._uId + ' ==> TIMER SET ==> ' + plugin._timerTime);
								}

								plugin.$element.find(`#dinoKnobTop-${plugin._uId}`).css({
									'border': '4px solid rgba(255, 197, 0, 1)'
								});

								/*--------------------------------------------------------------*/
								const numBars = Math.round((plugin._colorBarTheme.length * (plugin._angle / 360)));
								bars.find('.dinoKnobBarColor').removeClass('active').slice(0, numBars)
									.addClass('active');
								/*--------------------------------------------------------------*/

								plugin.$element.find(`#dinoKnobHolder-${plugin._uId}`).toggleClass('blob');
							}
							else
							{
								plugin._buttonState = false;
								plugin.buttonStateCallback(plugin._uId,
									plugin._buttonState,
									plugin._timerState,
									plugin._timerTime);

								if (plugin.options.debug)
								{
									window.console.log(plugin._uId + ' ==> BUTTON STATE ==> ' + plugin._buttonState);
									window.console.log(plugin._uId + ' ==> TIMER STATE ==> ' + plugin._timerState);
									window.console.log(plugin._uId + ' ==> TIMER SET ==> ' + plugin._timerTime);
								}

								plugin.$element.find(`#dinoKnobTop-${plugin._uId}`).css({
									'border': '14px solid rgba(255, 197, 0, .6)'
								});

								/*--------------------------------------------------------------*/
								bars.find('.dinoKnobBarColor').removeClass('active');
								/*--------------------------------------------------------------*/

								plugin.$element.find(`#dinoKnobHolder-${plugin._uId}`).toggleClass('blob');
							}

							if (plugin._buttonState && plugin.options.showTimer)
							{
								plugin.$element.find(`#dinoKnobMenu1-${plugin._uId}`).addClass('disabled');
							}
							else if (!plugin._buttonState && plugin.options.showTimer)
							{
								plugin.$element.find(`#dinoKnobMenu1-${plugin._uId}`).removeClass('disabled');
							}
						});

					/*------------------------------------------------------------------------------------------------*/
				},

				// Unbind events that trigger methods
				unbindEvents: function()
				{
					/*
						Unbind all events in our plugin namespace that are attached
						to "this.$element".
					*/
					this.$element.off(`.${this._name}`);
				},

				/*
					"someOtherFunction" is an example of a custom method in your
					plugin. Each method should perform a specific task. For example,
					the buildCache method exists only to create variables for other
					methods to access. The bindEvents method exists only to bind events
					to event handlers that trigger other methods. Creating custom
					plugin methods this way is less confusing (separation of concerns)
					and makes your code easier to test.
				*/

				/***************************************************************************/

				rotateKnob: function(direction)
				{
					let widget = this;
					let bars = widget.$element.find(`#dinoKnobBars-${widget._uId}`);
					let numBars = 0;

					if (direction === 'up')
					{
						if (widget._angle <= widget._maxAngle)
						{
							widget._angle =
								widget._angle +
								(widget._angle === widget._maxAngle ? widget._minAngle : widget.options.snap);

							/*--------------------------------------------------------------*/
							numBars = Math.round(widget._colorBarTheme.length * (widget._angle / 360));

							if (widget.$element.find(`#dinoKnobSwitchInput-${widget._uId}`).prop('checked'))
							{
								bars.find('.dinoKnobBarColor').removeClass('active').slice(0, numBars)
									.addClass('active');
							}
							/*--------------------------------------------------------------*/

							if (widget._angle >= widget._maxAngle)
							{
								widget._angle = widget._maxAngle;
							}

							widget.$element.find(`#dinoKnobTop-${widget._uId}`).css({
								'transform': `rotate(${widget._angle}deg)`
							});
						}
					}
					else if (direction === 'down')
					{
						if ((widget._angle) >= widget._minAngle)
						{
							widget._angle =
								widget._angle -
								(widget._angle === widget._minAngle ? widget._minAngle : widget.options.snap);

							/*--------------------------------------------------------------*/
							numBars = Math.round(widget._colorBarTheme.length * (widget._angle / 360));

							if (widget.$element.find(`#dinoKnobSwitchInput-${widget._uId}`).prop('checked'))
							{
								bars.find('.dinoKnobBarColor').removeClass('active').slice(0, numBars)
									.addClass('active');
							}
							/*--------------------------------------------------------------*/

							if (widget._angle <= widget._minAngle)
							{
								widget._angle = widget._minAngle;
							}

							widget.$element.find(`#dinoKnobTop-${widget._uId}`).css({
								'transform': `rotate(${widget._angle}deg)`
							});
						}
					}

					let inputValue = (widget._angle / widget._maxAngle) * widget.options.maxValue;
					if (inputValue >= widget.options.maxValue)
					{
						inputValue = widget.options.maxValue;
					}

					if ((inputValue >= widget.options.maxAlarm) && widget.options.showAlert)
					{
						widget.$element.find(`#dinoKnobMenu3-${widget._uId}`).removeClass('active').addClass('active');
					}
					else if ((inputValue >= widget.options.maxValue) && widget.options.showAlert)
					{
						widget.$element.find(`#dinoKnobMenu3-${widget._uId}`).removeClass('active').addClass('active');
					}
					else
					{
						widget.$element.find(`#dinoKnobMenu3-${widget._uId}`).removeClass('active');
					}

					// return the value to the function turn
					if (widget.options.showLabel)
					{
						widget.$element.find(`#dinoKnobValue-${widget._uId}`).html(inputValue.toFixed(0));
					}

					let r = widget._angle / widget._maxAngle;
					widget.$element.find(`#dinoKnobAngleValue-${widget._uId}`).val(widget._angle.toFixed(0));
					widget.turnKnobCallback.call(widget,
						widget._uId,
						inputValue.toFixed(0),
						(r * 100).toFixed(0),
						widget._angle.toFixed(0),
						r.toFixed(2));

					if (widget.options.debug)
					{
						window.console.log(widget._uId + ' ==> VALUE ==> ' + inputValue.toFixed(0));
						window.console.log(widget._uId + ' ==> PERCENT ==> ' + (r * 100).toFixed(0));
						window.console.log(widget._uId + ' ==> ANGLE ==> ' + widget._angle.toFixed(0));
						window.console.log(widget._uId + ' ==> RATIO ==> ' + r.toFixed(2));
					}

					return false;
				},

				/***************************************************************************/

				createTimerFace: function()
				{
					return `<article class="dinoTimer"><svg class="dinoTimerRotate" viewbox="0 0 250 250"><defs><linearGradient spreadMethod="pad" id="gradientTimer-${
						this._uId
						}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:rgba(163, 143, 5, 0.50);stop-opacity:0.78;" /><stop offset="48%" style="stop-color:rgba(87, 81, 47, 0.70);stop-opacity:0.89;" /><stop offset="100%" style="stop-color:rgb(136, 113, 0);stop-opacity:1;" /></linearGradient></defs><path id="dinoTimerLoader-${
						this._uId}" transform="translate(125, 125)" class="dinoTimerLoader" fill="url(#gradientTimer-${
						this._uId
						})" /></svg><section class="dinoTimerDots"><span class="dinoTimerTime deg0"></span><span class="dinoTimerTime deg45"></span><span class="dinoTimerTime deg90"></span><span class="dinoTimerTime deg135"></span></section></article>`;
				},

				/***************************************************************************/

				createTimerMenu: function()
				{
					let i;
					let temp;
					temp = `<ul id="dinoTimerMenu-${this._uId}">`;

					if (this.options.theme === 'dark')
					{
						for (i = 1; i <= 5; i++)
						{
							temp += `<li><button id="dinoTimer-${i}-${this._uId}" type="button" data-timer="${
								this.options.timerArray[(i - 1)]}"><img class="dinoKnobTimerImage" src="${this.getImage(
									(i - 1))
								}" alt="Timer-${i}" /><div class="dinoKnobTooltip">${this.options.timerArray[(i - 1)]
								} sec</div></button></li>`;
						}
					}
					else
					{
						for (i = 6; i <= 10; i++)
						{
							temp += `<li><button id="dinoTimer-${i - 5}-${this._uId}" type="button" data-timer="${
								this.options.timerArray[(i - 6)]}"><img class="dinoKnobTimerImage" src="${this.getImage(
									(i - 1))
								}" alt="Timer-${i - 5}" /><div class="dinoKnobTooltip">${this.options.timerArray[(i - 6)
								]} sec</div></button></li>`;
						}
					}

					temp += `</ul><div class="menuCloseHandle"><a id="dinoCloseOverlay-${this._uId
						}" href="#" class="dinoClose"><span class="left"></span><span class="right"></span></a></div>`;

					return temp;
				},

				/***************************************************************************/

				createCreatedBy: function()
				{
					return `<address><b>${this.capitalizeFirstLetter(this._name)}</b><br /><span><b>${
						$.fn.dinoKnob.version}</b></span><hr /><span>${window.atob('Q3JlYXRlZCBCeTog')}<br /><b>${
						window.atob(
							'PGEgaHJlZj0iaHR0cHM6Ly9tY3gtc3lzdGVtcy5uZXQiIHRhcmdldD0iYmxhbmsiPk1DWC1TeXN0ZW1zJnJlZzwvYT4=')
						}</b></span></address>`;
				},

				/***************************************************************************/

				buttonStateCallback: function(id, state, timerState, timerTime)
				{
					// Cache onStatus option
					const onStatus = this.options.onStatus;

					if (typeof onStatus === 'function')
					{
						onStatus.call(this.element, id, state, timerState, timerTime);
					}
				},

				turnKnobCallback: function(id, value, percent, degree, ratio)
				{
					// Cache onTurn option
					const onTurn = this.options.onTurn;

					if (typeof onTurn === 'function')
					{
						onTurn.call(this.element, id, value, percent, degree, ratio);
					}
				},

				timerUpdateCallback: function(id, timeLeft)
				{
					// Cache onTimer option
					const onTimer = this.options.onTimer;

					if (typeof onTimer === 'function')
					{
						onTimer.call(this.element, id, timeLeft);
					}
				},

				errorUpdateCallback: function(id, error)
				{
					// Cache onError option
					const onError = this.options.onError;

					if (typeof onError === 'function')
					{
						onError.call(this.element, id, error);
					}
				},

				/***************************************************************************/

				rotateMenu: function(li, d)
				{
					const angleStart = -360;
					$({ d: angleStart }).animate({ d: d },
						{
							step: function(now)
							{
								$(li).css({ transform: `rotate(${now}deg)` }).find('button')
									.css({ transform: `rotate(${-now}deg)` });
							}
						});
				},

				/***************************************************************************/

				createUniqId: function(idLength)
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
				getUserLanguage: function()
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

						const params = qs.split('&');
						for (let i = 0; i < params.length; i++)
						{
							const keyValue = params[i].split('=');
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
						const lan = window.navigator.language || window.navigator;
						const part = lan.split('-');
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

				randomNumberFromRange: function(min, max)
				{
					return Math.floor(Math.random() * (max - min + 1) + min);
				},

				/***************************************************************************/

				isBlank: function(str)
				{
					return (!str || /^\s*$/.test(str));
				},

				/***************************************************************************/

				capitalizeFirstLetter: function(string)
				{
					return string.replace(/^(.)/g, string[0].toUpperCase());
				},

				/***************************************************************************/

				deCapitalizeFirstLetter: function(string)
				{
					return string.replace(/^(.)/g, string[0].toLowerCase());
				},

				/***************************************************************************/

				degreesToRadians: function(degrees)
				{
					return degrees * Math.PI / 180;
				},

				radiansToDegrees: function(radians)
				{
					return radians * 180 / Math.PI;
				},

				/***************************************************************************/

				/*
				 * Internationalization of some texts used by the dinoKnob.
				 * @return String the localized text item or the id if there's no translation found
				 * @param key
				 * @param lang
				 */
				getI18n: function(key, lang)
				{
					const i18N = {
						en: {
							plugin_title: 'DinoKnob',
							plugin_desc:
								'Knob/Dial Control and Power Button with mouse, wheel, touch and keyboard (← ↑ → ↓ ) support.'
						},
						sl: {
							plugin_title: 'DinoKnob',
							plugin_desc:
								'Gumb za upravljanje / izbiranje in gumb za vklop z podporo miške, kolesa, dotika in tipkovnice (← ↑ → ↓).'
						},
						de: {
							plugin_title: 'DinoKnob',
							plugin_desc:
								'Knopf- / Wähl- und Ein- / Ausschalter mit Unterstützung für Maus, Rad, Touch und Tastatur (← ↑ → ↓).'
						}
					};

					if (typeof i18N[lang] !== 'undefined' && typeof i18N[lang][key] !== 'undefined')
					{
						return i18N[lang][key];
					}

					return key;
				},

				/***************************************************************************/

				/* 
				*  Array for Knob Images base64 encoded strings
				*  usage in html elements (img src="")
				*  First 5 in array theme dark,
				*  second 5 in array theme light
				*/
				getImage: function(key = 0)
				{
					const dinoKnobImages = [
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABVCAMAAADDsmKDAAAAV1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fVIJUOhAAAAG3RSTlMA8EAwEMDQgKDgIHBgkFCwIOvA0KVAEJCAcGAfAF7kAAADVUlEQVRYw82X2ZarIBBFZR7FnqfK/3/nZUhEBDGh++GeB1cCZktVHSo49UUNAy8+6+kXEsgjGAuomY5CKAckdPxkFSgyTOF0/SIBja1nBrn9KoGNUDCo8vEM7ABGgisHNPABDKj9yAJkIKbZL4BggtPFEyzYAYzxvmHA4HoJQ2IA4/4GI/4CQ0DuMQLc9LAQoiHFRlgjjAsp5kBHTGxi3aNwCHPIxhohvcVQ5a8DMsBpxtDFG2lIEhS+YTQP0FPpdnpgSRjmP7UouzGCZNM8Cq5SzX1gESkpII9cGGXasxYQKSiLpCO92kROprQySJ2QTMWQ2CKsbtSAJ06mwI6jBYed+Ex2FEicTAlym6A5NKUM3fgTMkevFKNXiIJDIUHXmDccyuWSKPwaJeabp7NZBLHtmEsUjmzkMMtpCitSIK6Ozuvts9tmy83rGhkNFIDAKUoVKF5qIhySpGv0IHmLDE8LQOJsjeM8KYAJukK21b1cXl8+f55iWm8gm+50ZPc0Fyj2Gk7ZES5Jr98fAcQgygSObRj7RqkawmXVW1iSgShBkO3sH1Ql5ZL1vJakuZQ86xPfwXylWme7VqK8olSY5/Je3exRidLDvK/PVNHAR4lxUw/zUmSg2YZUqlEX81R0LID6AGbSIruYz2I02li2FoO7mOePsiQxLF16L6G7mO9WALJejO5iXiuHoH12SAY3lItdSkQv7z1Dupi3hmHBa9nFpKYjFcWuirVpztEzXcxXa8KVjrW52i3lYreimsvUTD3MT3uGA2zOTix/a6nYTNUfHioyvPQw71NboggDvEQHk4vdyjG5E/PydDSDi9qk1jGgGuP+BiP+K8w8dnT2oqX9BlT6ZokbfEDh+byE6gFM2e3wkHHq3+U2dq5O01xGoqqbph1yjquMgkZqxaoYJHjZgQSXdtPVH/u5WKODy3s3RP/woKFi96VR8wfiwbD4gdfSMexejjw6/BEIkg/4t11acz9H9G6V6+vJaUQpAd1pRfoQyvqUiS4Ap7vLoUzpLxc4PrQLg0zpJS+JNUFYQtLpWztG6zsi2S3EcEhCdjoVlXATWoTD2g9hLKRah5m+rwMw6Ci9+P4SpB5rSmRWNQNJPD0sYha1QTCBp2FhjK3xl5MC/wOxI3nU8RC8DQAAAABJRU5ErkJggg==',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABUCAMAAADj2QolAAAAYFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fXMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMwY+fUiSYD7AAAAHnRSTlMA8BCAwKBAYNAwIOBAP1CwcJDjMPHAsWtREKCI0MsmOwGYAAADUElEQVRYw62X63KcMAyFfb+mBjaXJk2rff+3bLG9KwNegmjOj51hFn9IR5LHZvvyOgIAH6xgpxUUACilIgBPZyGeQ0w1JAB9GiLxwZ3DCA62fXQwMrokTEuTOBf0UDaL5IlgEkxrLrgTCRnGTDDBGz//BMYUEBl1CUiQCtT8IxmbwHwDRdIpA4g1RYOg+5LWFEf3xYCe3U12lKNMs7sBFCMrQsiwWXm5BkunjDAsKAYiOyEHuqF4DubUOEYYxI2S+JF8Qg/jgA+ZEhV0IWJZegupW24OVcp3P+PEAsJ9PytZYgmsKw1OtBA7Mbr8lDEI4aC3XlmpVM7JKS1Nb0vVGYMQWGGSjrCSGsUKAhWDEHCtHRG6GkxrJtwxCPF3hubwUOrOCYhhPpoCMbymNDYMN8hZk+INJ9SEdMFInRfaAinOeHcnSLOwGiMcqysZg0WaIRnLbH2VT50WsepmjxA8Z2PbhkligozVlSGbajxdr69vn09l16mc6G1+LySxakOE6PwXUore3uenGiyfMZ2G1xWCxwOkVF1+zhUcbpj+1BSIC2xNQf2Z4xkrhvUkSx0F61BQbx+3fouiu10DjsGWgmk9394dugcNLH6Hgnp5vkUz9k3BIPsUxMhS6G4+nn1BQYzq5aRK6+5SUL8/qgNmG0pkRynXX9UatQ3FHKdcnzprfOESKJcav2aoKWMplOu/Ycj7YVPVmF0hUS7VGbv0VtIo13cm7sXGCfIESi3TPN18UaHIiJSXMtz4dZ7NJlKuz8y3wyTQlkMUrFJdiOYaMuWTMVfaDCmeTHkthqq2RIxOKd3qDlIufcoFVx6gfPx4oD6FLtm0XcKpIkqta2T+l+JxNgnaNP1MmYiAbdM7LDtJaWGFPmnvtFhnTxoT2xxw06LJrPzMR5JApWhchSlpIiQAJoSF54IYysZNSQoGe5V3Ti+G2v0gO8cxR8hp7J53Ii0nD7PStviU1hPxwflAEjDCwaOiKsQcgoDp/3cQE3Zf9BxvATtKHOoA7WKc2ctmAtgtJ16xdGB93e9P465vCvY4NkIW/8o8CVXKrvwx9yuf8+wrGYd3z2k0Zk7UJDng/VOKQyPCYUcqHO1v+ZCjSXOfhg4ijoERJdKkWsKwg/gLmdqpum7j6DwAAAAASUVORK5CYII=',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABUCAMAAADj2QolAAAAY1BMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMxydGtGAAAAH3RSTlMA8IBgQBAwwKDQIHDgULCQoN+QMCD2ENF/P8CwcE9g/WKfWAAAA3ZJREFUWMO9l9ly4yAQRZsdSUhynIwz2Ub9/185MqsFKDFKKvfBVZji0BsNgs/FNcFVRvdwWL1CJBOlakVpcRAiCSoOVsxg1x+F0DgQGrtD1nTIbocapwOQAaecytspBrNA8APGSNQl94BDDIBxyqj/AZjbXaLXJYqiQv+zgn+Ewn6EQtspI9KcMmFz+Qo0ALIfBzowOnDZ23+apXG0RWLlfKTtFIlEREoYt4tiJxJFEmvbEZ8MDxRG7vFHQkUzonEUg8hqKdgmjeFcw3CFXlM1yR2RGwiRe2VjVWGkdWnApt0E9LszchosJkJIpSFyOgWPiNKDrLTUzmISBDMMmzAX0WMGQYeJkC2l1wSrMlTcUiJmDBAyysjAfZHIkSxiQChp7Cwj3kNK0taKUsb5QGdFEod5U/z2mmk3thC0Hsoulgjb5FcOcUaJuCgFImEnYCQY3ldyPodZDsGBm2hKObr4zsnopGVZnt/eH23JU3RiNrZESpGV4QqxYS1u9sXp4fxkXwARUyt4FiAk7wBL1OnKGQLGVE+Ng5RvgyXp+XwJhYJs52j52qtTgl9rfHqXLV4y/A4KSi1b/QMQFlN00DDRia8py3m1xhdGLhrpJSXX32svvyrPQ196WlKSUz5TJtvV9oEZ6pRSa4ht3dDSFCLupjxcakt0VgAlpQwNzY0R1km4n/Ln4alcNCRT6pRSJwCdJaSzLjZRlieXbZ1i64ZtlL9+8+0JGhspDz6+Mt3Hq0QjZXl0D4oBrFwBddBKeQe4KVU/aKac3PbqlkKbKa8AOoXXucebKYsP769S/uxShh+xhbXY8otxAVuCzZRnn+nvVd1bVnV+0H4CyG0v0Na99tMoN6FgNrytncGXi/xWlzrnXQqMHTZ2zLT58e795qtlzC61ronyCILkHigb3wbKKbvV0iEwDbfaBXpSXj/Kgu+mfABMlcRyDLkvVb2Lxur7YA7vkVK1oPSkeoRFeGOVqkBEF7Na80l/TTkHCOmhFN3DbLPzESA4wv6reRKfvZpPT/a5mwWlTDcauUt5fVmHIwlG1yUcBmmdcroyxIwFpO4UGp5TXs8fF9uKSLFRNcSewyDq5eXibWWm+H6qi5P43cu37o4avTr5OcM5HqVmyq2o7m6+YuEecYWfSKdaa+ckRoP6wZSIjgloVc90+hYnah73Ef8BT2TmJiE5NSIAAAAASUVORK5CYII=',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABVCAMAAAAohdmAAAAAZlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fUY+fUY+fXMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMxBrxzjAAAAIHRSTlMA8ECAEMBg0KAwIJBw4FA/YRCw0KDegLAg8sEwj1Pk0RQRQncAAAObSURBVFjDxZjndqMwEIXVK+ASO3GcLcz7v+RiFbAkWFnsnpP7AxMwn2bujIRiVBMjkxj6JwkOTlLsZ5iJ0VtKqZw+9U6IxsBJ4CkAsS8SDPQpNwCyh8KhSywCzHYYCzy9YIHuCcVkNce4GcJA5pdUuzME6HQQVNBwQGiArp0yPUc5cAgHB/4uCs0pQzvFAM8pdkffSV9p6uROe7yn6+zjAx5yQXSg2imsh+GZojE2qF0EMFkoGu+c1AKAskDp8Cv5DGwtGgzYU6YTsTpQNqxc9YYGCqhVTyyoBLKZNHfSm6uheobYrXWVOG2UUVqPiRAMOMewwXIMUVwJU0AAAiZCIMUwIaFQ35kMEjARklKMgg1xklAiRs8QMSSMKkeLGYOQFWcPic1JYZa01LvbWQ6zFAv16RxGautD8xBXbh39wCrrRKJwvEUcBBxGsjlDDwGJBA5GigVxONzC2Ww5RS4BENJBAsY4qyTz2WTtPk56uxxPLqA+ZiVdQRjLiy9ZsNWmt8ag+/HJNm5kqGqKUQGCh+zOOOs6caJznJ0LyDKKNGiD4jL7msbznqj1xcFDGCooid6nKypYXMrgAKlQxo9TxKxMUhkgVcr4NmF8pxbf7txlgyqUiGGu4javkMtnQBVKTAohXeQU/TqjKiVaHCrK01CSNOuUcSp4XwRD08rVKb8RIkUw2IXSQPk8hqqarOEoaqCMV7dKAnSZt6aJMh59Bn2aEEdtlI98cOJCa6SMJ/+cSPpWVyllSmFqL7Zg1Eq5IMQXJ8IfzZQ3hCxMejZXNVNGZ8VCcd3STrl5e8m/UQ4lRfwvylhTnUK/i3IKlLTS90ZKWJayrrs0EHzXqYUyt+CxjfLDr1M8mY0E3dooR8SSt4kO9l4bzR3SRsNuB4TeWyBxlWLpiqnbUjogFgZPFjs1VampQiKfOb2P7dYQSnyoeKs1OHMPoajyZW/Q6cUyfd7mRxYt7+6vV3sF2XJXFvYj3YsNfAkFAbO6q9MvWXOJFtAMEvdYHlOHbO3fWB9vHKuzEMkwZCkNDqMni69/qc5PF8n2Ui0gjnD6sQaI21Qj011ziYnv/cNqOPfDow44gWxiuHlw3vJcLl8P+xRESA0D1Ln/8+PXpydc7++H5N90i/4mEr6FrSlvmsjAovaDCYcg2ekE0Z3nO7oC8e5FYW4pJaSjlvfLRVpnxORLFb9b1Dn9OgKnjHpeCheIs0Dt0p3iEcUVJWhTfwDRlyhFV2umZgAAAABJRU5ErkJggg==',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABVCAMAAAAohdmAAAAAZlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwY+fXMzMzMzMzMzMzMzMwY+fXMzMwY+fUY+fUY+fXMzMwY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fUY+fXMzMxYy/yPAAAAIHRSTlMAQMCA8GCg0BAwQOAgcJAQsMHvgFDgMGDQjk9vsB+g7V6o09gAAAPySURBVFjDxZhpc9sgEIYFCKxbciy58dns//+TBbF4LY44uNPp+0GZUVYPe3G5eKWOaRV/pUq0sGr6C9BcAkxCiKHVf6s3IT3AgN+yFnbvYSSUNcWm3sN0CHFSMLxBmUBuM91C94YrbRDh8EZqe/9V2WZTFOisCCaYFNI8dMNwyM4vB/0AAYIDNw+hmcD+D0VB51MmeCO70qe0ZTalBr4WXBitncNgKrLFga2fGnF6kSm2Thyi9OaZr0FjiCKh7Ip3pKBlSKmUNzfjknFvwK51JUAbg9S1N2wfLdQEVq2ILqjlxsH0EsS4kXq1kCGkT2AqZlQnILseMQiB0Ju6nzg4tXyYQ0/AYgii32wQQwuBJulBHIYgoJ5dhbhK0dFAJWHEA9K7kOYWvpFyZj17YIpKdeX6T1enjtPIXPTMaBZqR2+lS4TFCCnRNQOxCZaly+ewrUwnJ0DxykDAYhRFqAZYsZVyhjR/x6YZ3bZdojtMB2Ax6mmcQtqQdw8GqfnS2p/OG46sy9X5zis+Qihwolh93G9mwIkwkU6Vg4Zg1AEFtT+a2jhM9BiBEBPoeT/6FNRpdI0CMrExG/U6naevr0NAQS1HjTHjxRec3g0wfhrrm0ch/dJu2wqFEdUunOOy2l5DCmEwqCGgcFxfxwVtG6KEGFyPmV+hNdLKhIP6JEoMI2gZILWIvpLpJU350CleMyxDVyZd4mfTMUZBRzGmNnSlK8aPTW8QJRaT8p2ZsT6HrektTdFt2dl6kBS64psSJdAB27Sj3sd8H3zTJqRQ1mwEPQWEES6+6YKURGbKTbEHQ6li5oc05YqJoL61zFPUb6SEGgu56V+cE58R03ua0tgqCYR0mKWo7TFJObjhrZh17Bi13ScpV5sK/lyiLmV9TlH2W4qwqb7EjX+f0xThphJRDl95+sAv/wXlVwYBIxqeImKU3QxRdr1K5+mOFL/rskRdh8I1ap9HadzwKG6TdMosEc1GKlKXmZgrLnZ0NEbPlhzK2e6ztPC6ReuSAVkwoN5bvZneSLIqxEGr8rZ6njMJltHmYQo32IzM/EJX2DNFojPNz7t/xu0ncEYmeyZc1Cv8womKXXY/bOAjFoRHT3U7PI+9TooEo9qn4G0AMa8gNeAm4msGh7l+n5PmcamJ3lgR830Pf94QEt6vqYPtD3PHU8qRi2mLko67icM33pzPS4xxGh8+wxxlEAaEmRzN3Y/lYhjMu3Gkg4LW2pwPe3Rpf7/c1kqiAYaTkgDHeUzW2/ExaZEBO4QkxUpAKdlt/kF346F4qWqAh1ouhGSzEIrTyx0rfqKaQ1pt/yMGJjEUpj1HleRAortxvpiYdvRjBeU61B/r+FFSKwMZ+gAAAABJRU5ErkJggg==',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABVCAMAAADDsmKDAAAAV1BMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgozMzPnBgrI9N4kAAAAG3RSTlMA8EAwEMDQgKDgIHBgkFCwIOvA0KVAEJCAcGAfAF7kAAADVUlEQVRYw82X2ZarIBBFZR7FnqfK/3/nZUhEBDGh++GeB1cCZktVHSo49UUNAy8+6+kXEsgjGAuomY5CKAckdPxkFSgyTOF0/SIBja1nBrn9KoGNUDCo8vEM7ABGgisHNPABDKj9yAJkIKbZL4BggtPFEyzYAYzxvmHA4HoJQ2IA4/4GI/4CQ0DuMQLc9LAQoiHFRlgjjAsp5kBHTGxi3aNwCHPIxhohvcVQ5a8DMsBpxtDFG2lIEhS+YTQP0FPpdnpgSRjmP7UouzGCZNM8Cq5SzX1gESkpII9cGGXasxYQKSiLpCO92kROprQySJ2QTMWQ2CKsbtSAJ06mwI6jBYed+Ex2FEicTAlym6A5NKUM3fgTMkevFKNXiIJDIUHXmDccyuWSKPwaJeabp7NZBLHtmEsUjmzkMMtpCitSIK6Ozuvts9tmy83rGhkNFIDAKUoVKF5qIhySpGv0IHmLDE8LQOJsjeM8KYAJukK21b1cXl8+f55iWm8gm+50ZPc0Fyj2Gk7ZES5Jr98fAcQgygSObRj7RqkawmXVW1iSgShBkO3sH1Ql5ZL1vJakuZQ86xPfwXylWme7VqK8olSY5/Je3exRidLDvK/PVNHAR4lxUw/zUmSg2YZUqlEX81R0LID6AGbSIruYz2I02li2FoO7mOePsiQxLF16L6G7mO9WALJejO5iXiuHoH12SAY3lItdSkQv7z1Dupi3hmHBa9nFpKYjFcWuirVpztEzXcxXa8KVjrW52i3lYreimsvUTD3MT3uGA2zOTix/a6nYTNUfHioyvPQw71NboggDvEQHk4vdyjG5E/PydDSDi9qk1jGgGuP+BiP+K8w8dnT2oqX9BlT6ZokbfEDh+byE6gFM2e3wkHHq3+U2dq5O01xGoqqbph1yjquMgkZqxaoYJHjZgQSXdtPVH/u5WKODy3s3RP/woKFi96VR8wfiwbD4gdfSMexejjw6/BEIkg/4t11acz9H9G6V6+vJaUQpAd1pRfoQyvqUiS4Ap7vLoUzpLxc4PrQLg0zpJS+JNUFYQtLpWztG6zsi2S3EcEhCdjoVlXATWoTD2g9hLKRah5m+rwMw6Ci9+P4SpB5rSmRWNQNJPD0sYha1QTCBp2FhjK3xl5MC/wOxI3nU8RC8DQAAAABJRU5ErkJggg==',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABVCAMAAADDsmKDAAAAYFBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPnBgrnBgozMzMzMzMzMzMzMzPnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgozMzPnBgqkI3TMAAAAHnRSTlMA8BCAQMCgYNAwIOBAP1CwcJDz4jCxwGtQEKCI59BwBMjjAAADYUlEQVRYw6WX6XacMAyFvcjGS2ogk6RJ02re/y07HpsRi2Gwc39wDgf8IV1JYNixrPaIyPtOsHY5hYhKKX8jhWaK5ehDDgpRt1MknZhGjuDYzU8NDi0YiePSKM5FQzCbVbIlnIDjGoymJSdgDBw4CzYeHGMKayF5DUqUClU8SMbGSP45RjZgehRrjEbR4E1YY0yDN4A6Why6QQ4yRIsdKlYvj+5Ouymt19g1YAbsFxhAz1pkUBMmDiq0zabHXkyYwE+l5Eocg7zHKK+wSBGrDugwFKvOMUvZ4nOMWFK4LScmUzSOFaXRiAWlG1m97Jg4ROGot351Uql7WkZpCaW3rE4couCKE7THldQgVhScOERBM7fEY1E9zK1A4hDFPiCa467UA+SIw5j1kCjAc1bDDGJ6GTUqPgO5nJNOHKl1ii5RkjvWPBASFn5TjEN2JnIWpYqUCGZdvpePhVbp1GSREBwxchaNE8SId7DOEDm7+HK9frx/v7AoyCBv7wlxF8S6IYmi79cIk/T+Gc9yuDxySq2vM4U2D4TJuvyOdewnzs4AJYpxrIihiIbM2XuJRynBDjCX6/vX1HhelN/hSBOxxRDpbbq3L376U62OMK/p+DbFMxSMoTgPo8kcmepdTsmyJxjiqGJaKjXxIYb07yubAIVgPDuLuf7J9qhCMHAec30prbGJXIG5MAabBhkJfIwh3ebC402CkXxypgZzye50K4NlHeb6yQTVnKbJnsVQseKs82WdPDvCvG4xr3nU6fH0lSpjynpjdjFYgqw5haFaTQvJYajGfDNmcrsRxlZjPpKpalEoto953cGktjVnMX/LmAutPIP5+rWjIqZFct5/gUasUmpTKfgxxtKkVmjb/hEz1gFK7W+o/FUKSzd0o8fjcl3XaI5fZEGvsTrB2tMeb3K1GE2rZlnpSorDm8ymAbioDGbrqKwKh5qWl3Y3UDsIKEs7NlOR1lDeD/m6tCxGhUIT1PSg8HubB1nBEQZ3S6uIc4qCsHPxJMcd32g5/TEcKHCkYTrgGDhKaEQ8Lir9k+ndMZ3+t4Zj8xQegTqPd/GnBkrMUt3KI3j8JRrLngoMTjLjABBzhSB7jpOkODcuHA+kHDspIXdBGliNQl9g+MGxWokwqjmiJ0Y9CwBkAHhWmv//uKnCi1IA/gAAAABJRU5ErkJggg==',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABWCAMAAABFJhAtAAAAbFBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPnBgozMzPnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgozMzOC99F6AAAAInRSTlMA8ECAYBAwwKDQIHDgULD8kPeh4ZIwIBCBP/HSwbBwT2Dq+NxQWQAAA6lJREFUWMOtl9l22yAQhtlBqxXbtZulSat5/3csHoOIAElGzn9hH8TRx2wMiGyqZkySJ8UMBavW1E9Aag1Ae861ZZndJikKmhGUaKGqd1P4NJAGqn32VCC+Dw30eygN9DGW7cC0EAWD7TFHgUnBe3wSNkGMC+5+CBl2eMVv72gOGtyPJf8MRvwMhu/AdMBjTA/lhSyhtemqu4Y3gjdM1fikXAY6LBbU3U2+A6OAyoDx43JxqGTAKIrW7XKrZR4j6EMuqdzDAaAFK/wTuTxEqRMw5DhMg1OfzXVF1ZxC1VL5oBJI+h6ORL+YhnpxRvUNcgKFZnok4713imrTqEyXrTzHUyDiiB5iUdNFFPAcT5ljakMhq5bLOcZzOk+hnZogsCw6gZSYODWRWmFtWJjzktOwuOZcMNbwQdMAEs4Yt74RZrIOH904qppKRczSrJppRsvwUohFAPdEUG97nUn94GcZ8S4gxXNUdw/yEOwOGsfx/c/nL6x+DncJDDBVSsYFaSkY2+TYH+86nS94PQicXOkLT6FxQxgnHW+gxnPa/AZCSubmMAa9n68YXeQs7TNXhCuYl/FkY1Tfc8ZShl9DZ2bGuf7aSCMnbap+ppLbmPFs7XH1kYh7/jZm/H1r8Dd1SWUFbzcx6Bfmq42XxbYwkDwmlY0z1g/PGEPlw5jTNfuKiQohxaTh4Yk5Eh0lq5iXGebfJfNSg8asYg7fMIeD3RfWhTgrFbq5jhkjXe5JN1GAwzjFZKPjVo92U1eIObkgh22OzUoWYbB2GFg1xAkrqSKlmE9CZjUbRnlhslMd7+vrGYavYA5jTh+Y8hBjdJGtYg45kovxo5gXV3tPY/Ky1V+COSxiRAnmLQHscmrcxISEN8WYd5fwJ8vvT1x+OFrDHBY2A511BoMulm9NNY+GwBiXNwosG1XStlK3zknbIi2OC5uoW72wpad54nHTRG61ikkDLGnig8YgF2CO8XEX9kO7iEncerOHL82cShrRD1vzRUifSy8DXwOpsmdUl788DP6+kioXmJrm97P017BUGYqsQm5zbplVDEb57Cm0zn93I2fDmrcvpESVl16ve7mCOR0veC1ebXQap1u1iPl4tcOOwvpWlhpQPI853iBygJSS9wtaFmM+zl9XbE00WSkfZwcS4dnr69VZK9rwvbUuRqfPZTb3uDPgVKkNSHAepQfOUNxU4EU5eUhMw4oMFl05qBwSVDdtyqiEJMWqhQkf8VQPnST7xW7azMx/+Pj5QPlQ7X8AAAAASUVORK5CYII=',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABVCAMAAAAohdmAAAAAY1BMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPnBgrnBgrnBgozMzPnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgozMzPUKq/gAAAAH3RSTlMA8ECAEMBg0KAwIJBw4FA/YBCw4M+ggLAgwDHxj1NwoR9aFwAAA5RJREFUWMPFmOmWoyAQhYsdQc3enfQs1vs/5RgWDWCakJlz5v7IovGj6lYBGqiI01kc/kpSoJOS7zPMzBgsY0zN792bkI6goIGnEeV7kRBkD7kh0ncoAvvEIiT8DWNRQCKL7J1QTFZzQpohHBVk0u3O0Hv8VDLJwgvAiH07Zb6OCRQYXhz4f1FYThnbKQZFTrFv9J3ylWZO7uNA3uk6C7PwLhdEj7qdwgccHykdIQbaRZHQldKRNye1RGQ8UHrySj4j34qGIPGU+YPcHCgbVm16wwIF9aYnFnUCeZq0cOqerob6EWKfravU6UkZlfWYCCFIcgwfrSAYJbQ0BQQxYCIEUwyXCgsNvckgARMhKcVofCJBU0rELBA5Jowqp5MLRoKVRw+JzclwkbKMOvVW4CLNQ316h1Gd9aF5iCt3F/0gOutEqkk8RR0EHUbxJUMPQQWSBCPlitjtruC1WM7AJYBSOUjAGGeV4j6brN2nWefL/uACGmJWyhWE87z4igdbbXpqCrrtH2wTRoWqphgdIGSEVNOi08yJzgl+LCDrKMpAQVl1/prH857o7cXBQzgUlEQf8xEdLC5lSIBUKNPnIWIoFFIBUqVM5xnjO7X4de8OG6hQIoa7itu8Qi6fESqUmBRAV+QU/TpClRItDhUVaShJmnXKNBd8KIJhaeXqlB8AtAiGuFAaKNM+VNVkDceghXICkDirz7w1TZRp7zMY0oQEtFE+88GpC62RMh38dTLp265KKVMKU3u1hUAr5QIgVifCl2bKGcDirEdzdTNlclasFNct7ZSrt5f+HWVXUuS/okw11Snsf1EOgZJW+tZICctS1nWXBoLvOr1Slhb83Ub56dcpkcxGCtc2yh54spt0wd5To7ljbLTVXgXw0QKJqxRPV8yuLaUd8DB4FA3LzaWpQjKfOYOP7doQSryo2NUanLmFUHS52Rs4vFimH9flklXr3v31Yq+EVtX5s2bYTfavQC6hIGg27+q6l6y5RAtYBon3WB5Thzy7f+NDPLGvzkJQYchSHTpMN1t8+qY6v1wkz5dqiXGEw88tQLxNNQqT+pSYuO/vNsO57e51IDlkGyPMnXPOc7l83e3TGCE1DDLn/q/PGNHp9rFLHtMtfCcafkWsgUImMoiE78UFBqm+SxD9cTnTVSDevSgiLGOU9syKYT3I6oyYfKnif4s6Z9hGkJnRolGTAnGU0K6u1yKihGYUnusPXakf2OpPMvcAAAAASUVORK5CYII=',
						'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABVCAMAAADDsmKDAAAAaVBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzPnBgozMzMzMzMzMzMzMzPnBgozMzPnBgrnBgrnBgozMzPnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgrnBgozMzN6hcicAAAAIXRSTlMAQMCA8GCg0BAwQOAgcJAQsPDB4VD7gGAw0I9wT7CgIMwkrBCSAAAEB0lEQVRYw8WY6daaMBCGySoYNgWtVT+tc/8XWUIGRrJ8FHt6+v7Qc3B4MktmIGZrKtmg7O+UCwOj2r8h9XIACCFqM3znn1IqgBpvZgZ2H3IUyILC0x9yypFC0lB/gmlBLdNtoPzEGRMEWX+S38q/JM12jIYhM4IJpoSyHyzLOGxPMofhAwQIDtx+iAEK7H9hNJQ+poVPUqx8jJHbMQXwse7CSo0NAW22XRzYeK8VpwtbxcYmIkzlYJtVDxzCKJBl9pE0GIaYXGOjrkjF/QE3/SSAiVGKwl+4iparBScjojNWLl1MzyTGrfTqZENKleDkzKpIUHbVyCEKhP4UVcthkuF1H/oCyCHKcGnBqA0EapVHmTlEAf3uLcQlRUkryTeOmCnVFFVv4BvpyaxiM8c+OUo5/jpVq+S0NhcVs+qF3tFVNeXCcYRS6N1IcVlWckpqvaxPqVpA8dxSwHH0W5S6hhGc68mSurnZ7xusvpDoEBtCcBz9vlKmXNi7GULavwYdr/cFSBVydN9vV4UUCp4wTofH067YEie2ZVU9UDDyAIM6XmyFJk78JQMpNtj7sfExqGtjU+k4qYe2VTXk9Pp6nQMMqrsMHLtgYgBV0xLNT2v+9DCkH4Pj1p9oaoopoks3Gn+FGOJgXHWI4Thzmw6N94QJOTijWdj0g2RuI0L9JEyMI9xQ8GQQ/kW2tzTmMOR5h6kMnGmHSr/bNjEMuophmYgzZdacFnuEMLGwdOBOj1V6IAb1TGFOr19NVmJRSBqd8ayPhAl0xv1aEiXHrJ99230ac2hcDBVheoyy8207xCSyI5c1ry0mj9mf05gvzAVhuKNeo64jJlSTqeVOxv74GbF9vGFOXuJcrcQ8QjFV0TUvhAkDXvQnc75dosZHxJxiyeG4c6hQZWrVe8qbo4cRLuG3qPGpu6Uw7k7jYc6vbTrgnf8G8yNhfkoHVb8HxTDFqVVXUhwUfJsehFnffqT09kPh0DpuSAw1Q7VoTYOtuUqiQvmtKVyOLyuIoBfa5aBg6Fz32qB7lktvGOMYu22gdBhT5Y90ljWHTXXiMCj33wP4ln7oGpeKNvLs3ZCdH+gMCx++PDJ3043Q41MpdEcl90446XO8YxbVXJa4ldd0warw+JvfDl/Z1hOjwKoIMHhymDmHbykFWIksVA8T5+vbLjjs5zNQ/NyNnO93888nUhLncpc19wff5Zpy5WZ3h6TX4tRrOp64710Mcm1mr6GPQ4gDwjbK/uGHc7MQ5h9P0nGBcUb387FzNfv1uD3HeqJBMiKaYAiKvckjBHZISYtJQGlVLn6gI3WdrSuvYZbhQijWC6E5Xdyx7I9UcEjLVBv+ydQpiMo2KVccSHSk/kBMtDv6pwMTHtdvQZlaZfhShAIAAAAASUVORK5CYII='
					];

					return dinoKnobImages[key];
				}

				/***************************************************************************/
			});

		/*
			Create a lightweight plugin wrapper around the "Plugin" constructor,
			preventing against multiple instantiations.
	
			More: http://learn.jquery.com/plugins/basic-plugin-creation/
		*/
		$.fn.dinoKnob = function(options)
		{
			this.each(function()
			{
				if (!$.data(this, `plugin_${pluginName}`))
				{
					/*
						Use "$.data" to save each instance of the plugin in case
						the user wants to modify it. Using "$.data" in this way
						ensures the data is removed when the DOM element(s) are
						removed via jQuery methods, as well as when the userleaves
						the page. It's a smart way to prevent memory leaks.
	
						More: http://api.jquery.com/jquery.data/
					*/
					$.data(this, `plugin_${pluginName}`, new Plugin(this, options));
				}
			});

			/*
				"return this;" returns the original jQuery object. This allows
				additional jQuery methods to be chained.
			*/
			return this;
		};

		/* Return current version */
		$.fn.dinoKnob.version = 'v3.31.2021';

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
		$.fn.dinoKnob.defaults = {
			// Theme Light or Dark
			// set's the shadow of knob
			theme: 'light',
			// Circle range Bar style:
			// (Hot, Cold or Mono, yellow, blue, red, green)
			barTheme: 'hot',
			// Knob main background color
			bgColor: 'rgb(6, 101, 191)',
			/*---------------------------------------------*/
			// Show Knob Value overlay
			// on hover button #dinoKnobMenu2
			showLabel: false,
			// Step Value of the knob range when using
			// mouse wheel or keyboard control
			snap: 5,
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
			// Menu timer values as fallows
			timerArray: [
				// Preset timer 1 to 15 seconds
				15, // seconds
				// Preset timer 2 to 1 minute
				60, // seconds
				// Preset timer 3 to 5 minutes
				300, // seconds
				// Preset timer 4 to 10 minutes
				600, // seconds
				// Preset timer 5 to 15 minutes
				900 // seconds
			],
			/*---------------------------------------------*/
			// Enable plugin debug
			debug: false,
			// Plugin language automatic
			// detection at runtime from browser
			language: null,
			/*---------------------------------------------*/
			// Event on turn knob
			onTurn: null,
			// Event on timer and button click
			onStatus: null,
			// Event on timer left time
			onTimer: null,
			// Event on plugin error's
			onError: null
		};
	}));