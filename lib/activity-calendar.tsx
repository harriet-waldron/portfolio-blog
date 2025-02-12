/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import parseISO from 'date-fns/parseISO';
import getDay from 'date-fns/getDay';
import getYear from 'date-fns/getYear';

import {
  DEFAULT_LABELS,
  DEFAULT_WEEKDAY_LABELS,
  generateEmptyData,
  getClassName,
  getMonthLabels,
  getTheme,
  groupByWeeks,
  MIN_DISTANCE_MONTH_LABELS,
  NAMESPACE,
} from './utils';

import styles from './styles.module.css';
import tinycolor from 'tinycolor2';

function ActivityCalendar({
  blockMargin,
  blockRadius,
  blockSize,
  children,
  color,
  data,
  dateFormat,
  fontSize,
  hideColorLegend,
  hideMonthLabels,
  hideTotalCount,
  loading,
  labels: labelsProp,
  style,
  showWeekdayLabels,
  theme: themeProp,
  weekStart,
  ...otherProps
}) {
  if (loading) data = generateEmptyData();

  // if (data.length === 0) return null;

  const weeks = groupByWeeks(data, weekStart);
  const textHeight = hideMonthLabels ? 0 : fontSize + 2 * blockMargin;
  const theme = getTheme(themeProp, color);
  const labels = Object.assign({}, DEFAULT_LABELS, labelsProp);
  const totalCount = data.reduce((sum, day) => sum + day.count, 0);
  const year = getYear(parseISO(data[0].date));

  function getDimensions() {
    return {
      width: weeks.length * (blockSize + blockMargin) - blockMargin,
      height: textHeight + (blockSize + blockMargin) * 7 - blockMargin,
    };
  }

  function renderLabels() {
    const style = {
      fontSize,
    };

    if (!showWeekdayLabels && hideMonthLabels) {
      return null;
    }

    return (
      <>
        {showWeekdayLabels && (
          <g className={getClassName('legend-weekday')} style={style}>
            {weeks[1].map((day, y) => {
              if (!day || y % 2 === 0) {
                return null;
              }

              const dayIndex = getDay(parseISO(day.date));

              return (
                <text
                  x={-2 * blockMargin}
                  y={
                    textHeight +
                    (fontSize / 2 + blockMargin) +
                    (blockSize + blockMargin) * y
                  }
                  textAnchor="end"
                  key={day.date}
                >
                  {labels.weekdays
                    ? labels.weekdays[dayIndex]
                    : DEFAULT_WEEKDAY_LABELS[dayIndex]}
                </text>
              );
            })}
          </g>
        )}
        {!hideMonthLabels && (
          <g className={getClassName('legend-month')} style={style}>
            {getMonthLabels(weeks, labels.months).map(
              ({ text, x }, index, labels) => {
                // Skip the first month label if there's not enough space to the next one
                if (
                  index === 0 &&
                  labels[1] &&
                  labels[1].x - x <= MIN_DISTANCE_MONTH_LABELS
                ) {
                  return null;
                }

                return (
                  <text
                    x={(blockSize + blockMargin) * x}
                    alignmentBaseline="hanging"
                    key={x}
                  >
                    {text}
                  </text>
                );
              }
            )}
          </g>
        )}
      </>
    );
  }

  function renderBlocks() {
    return weeks
      .map((week, weekIndex) =>
        week.map((day, dayIndex) => {
          if (!day) {
            return null;
          }

          const style = loading
            ? {
                animation: `${styles.loadingAnimation} 1.5s ease-in-out infinite`,
                animationDelay: `${weekIndex * 20 + dayIndex * 20}ms`,
              }
            : undefined;

          return (
            <rect
              // {...getEventHandlers(day)}
              x={0}
              y={textHeight + (blockSize + blockMargin) * dayIndex}
              width={blockSize}
              height={blockSize}
              fill={theme[`level${day.level}`]}
              rx={blockRadius}
              ry={blockRadius}
              className={styles.block}
              data-date={day.date}
              // data-tip={children ? getTooltipMessage(day) : undefined}
              key={day.date}
              style={style}
            />
          );
        })
      )
      .map((week, x) => (
        <g key={x} transform={`translate(${(blockSize + blockMargin) * x}, 0)`}>
          {week}
        </g>
      ));
  }

  function renderFooter() {
    if (hideTotalCount && hideColorLegend) {
      return null;
    }

    return (
      <footer
        className={getClassName('footer', styles.footer)}
        style={{ marginTop: 2 * blockMargin, fontSize }}
      >
        {/* Placeholder */}
        {loading && <div>&nbsp;</div>}

        {!loading && !hideTotalCount && (
          <div className={getClassName('count')}>
            {labels.totalCount
              ? labels.totalCount
                  .replace('{{count}}', String(totalCount))
                  .replace('{{year}}', String(year))
              : `${totalCount} contributions in ${year}`}
          </div>
        )}

        {!loading && !hideColorLegend && (
          <div className={getClassName('legend-colors', styles.legendColors)}>
            <span style={{ marginRight: '0.4em' }}>
              {labels.legend.less ?? 'Less'}
            </span>
            {Array(5)
              .fill(undefined)
              .map((_, index) => (
                <svg width={blockSize} height={blockSize} key={index}>
                  <rect
                    width={blockSize}
                    height={blockSize}
                    fill={theme[`level${index}`]}
                    rx={blockRadius}
                    ry={blockRadius}
                  />
                </svg>
              ))}
            <span style={{ marginLeft: '0.4em' }}>
              {labels.legend.more ?? 'More'}
            </span>
          </div>
        )}
      </footer>
    );
  }

  const { width, height } = getDimensions();
  const additionalStyles = {
    maxWidth: width,
    // Required for correct colors in CSS loading animation
    [`--${NAMESPACE}-loading`]: theme.level0,
    [`--${NAMESPACE}-loading-active`]: tinycolor(theme.level0)
      .darken(8)
      .toString(),
  };

  return (
    <article
      className="ActivityCalendar"
      style={{ ...style, ...additionalStyles }}
      {...otherProps}
    >
      <svg
        className={getClassName('calendar', styles.calendar)}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {!loading && renderLabels()}
        {renderBlocks()}
      </svg>
      {renderFooter()}
      {children}
    </article>
  );
}

ActivityCalendar.defaultProps = {
  blockMargin: 4,
  blockSize: 12,
  color: undefined,
  fontSize: 14,
  hideColorLegend: false,
  hideMonthLabels: false,
  hideTotalCount: false,
  style: {},
  weekStart: 0,
};

export default ActivityCalendar;
