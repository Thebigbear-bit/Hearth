import {fullDate, timeParts, type TimeFormat} from '../lib/clock';
import type {ClockConfig} from '../lib/storage';
import {colorInfo} from '../lib/clockcolor';
import {fontFamily} from '../lib/clockfont';
import type {WeatherView} from '../lib/weather';
import {WeatherGlyph} from './Glyph';

interface Props {
	now: Date;
	format: TimeFormat;
	config: ClockConfig;
	weather?: WeatherView | null;
	/** Glass theme: the clock and the weather as two frosted cards of the same size, side by side */
	cards?: boolean;
}

/** The clock: the time (with a small AM/PM beside it in 12-hour mode) and the date, and the weather when it is on.
 *  Size, thickness, colour, position and what is shown all come from the settings. */
export function Clock ({now, format, config, weather, cards}: Props) {
	const size = config.size;
	const info = colorInfo(config.color);
	const style: Record<string, string> = {top: `${config.top}%`, left: `${config.left}%`, fontFamily: fontFamily(config.font), '--clock-accent': info.accent};
	if (info.gradient) style['--clock-gradient'] = info.gradient; else style.color = info.color as string;
	if (config.opacity < 100) style.opacity = String(config.opacity / 100);
	const classes = ['clock', info.gradient && 'clock--gradient', info.dark && 'clock--dark', cards && 'clock--cards'].filter(Boolean).join(' ');

	if (cards) {
		return (
			<div class={classes} style={style}>
				<div class="clock__cards" style={{fontSize: `${Math.max(22, Math.round(size * 0.18))}px`}}>
					<div class="clock__card clock__card--time">
						<TimeAndDate now={now} format={format} config={config} />
					</div>
					{weather && (
						<div class="clock__card clock__card--weather">
							<div class="clock__card-inner">
							<div class="clock__card-head">
								<WeatherGlyph icon={weather.icon} />
								<span>{weather.city || 'Weather'}</span>
							</div>
							<div class="clock__card-body">
								<span class="clock__card-temp">{weather.temp}</span>
								<span class="clock__card-side">
									<span class="clock__card-text">{weather.text}</span>
									{weather.range && <span class="clock__card-range">{weather.range}</span>}
								</span>
							</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<div class={classes} style={style}>
			<TimeAndDate now={now} format={format} config={config} />
			{weather && (
				<div class="clock__weather" style={{fontSize: `${Math.max(24, Math.round(size * 0.17))}px`, marginTop: `${Math.round(size * 0.1)}px`}}>
					<WeatherGlyph icon={weather.icon} />
					<span>{weather.city ? weather.city + '  ·  ' : ''}{weather.main}{weather.range ? '  ·  ' + weather.range : ''}</span>
				</div>
			)}
		</div>
	);
}

function TimeAndDate ({now, format, config}: {now: Date; format: TimeFormat; config: ClockConfig}) {
	const {time, period} = timeParts(now, format);
	const size = config.size;
	return (
		<>
			<div class="clock__time" style={{fontSize: `${size}px`, fontWeight: config.weight, letterSpacing: `${(size * 0.045).toFixed(1)}px`}}>
				{time}
				{period && config.showPeriod && (
					<span class="clock__period" style={{fontSize: `${Math.round(size * 0.27)}px`, marginLeft: `${Math.round(size * 0.12)}px`}}>{period}</span>
				)}
			</div>
			{config.showDate && (
				<div class="clock__date" style={{fontSize: `${Math.max(26, Math.round(size * 0.2))}px`, marginTop: `${Math.round(size * 0.16)}px`}}>{fullDate(now)}</div>
			)}
		</>
	);
}
