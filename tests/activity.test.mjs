import test from 'node:test';
import assert from 'node:assert/strict';
import { activity, generateActivity, calendarLayout, buildingForDay } from '../src/activityData.js';

test('one building per active day distinguishes exclusive and combined activity', () => {
  assert.equal(buildingForDay({github: 0, leetcode: 0}), null);
  assert.equal(buildingForDay({github: 5, leetcode: 0}).source, 'github');
  assert.equal(buildingForDay({github: 0, leetcode: 3}).source, 'leetcode');
  const day = {github: 5, leetcode: 3};
  assert.equal(buildingForDay(day).source, 'both');
  assert.equal(buildingForDay(day).count, 8);
  assert.equal(buildingForDay(day, 'github').count, 5);
  assert.equal(buildingForDay(day, 'github').source, 'github');
  assert.equal(buildingForDay(day, 'leetcode').count, 3);
  assert.equal(buildingForDay(day, 'leetcode').source, 'leetcode');
  assert.equal(buildingForDay({github: 0, leetcode: 3}, 'github'), null);
  assert.ok(buildingForDay({github: 10, leetcode: 4}).height > buildingForDay(day).height);
  assert.equal(activity.map(day => buildingForDay(day)).filter(Boolean).length,
    activity.filter(day => day.github + day.leetcode > 0).length);
});

test('All includes either platform while Both includes only shared active dates', () => {
  const days = [
    { github: 0, leetcode: 0 },
    { github: 5, leetcode: 0 },
    { github: 0, leetcode: 3 },
    { github: 5, leetcode: 3 },
  ];
  assert.deepEqual(days.map(day => buildingForDay(day, 'all')?.source ?? null),
    [null, 'github', 'leetcode', 'both']);
  assert.deepEqual(days.map(day => buildingForDay(day, 'both')?.source ?? null),
    [null, null, null, 'both']);
  assert.deepEqual(buildingForDay(days[3], 'both'), buildingForDay(days[3], 'all'));

  for (const range of [91, 365]) {
    const rows = activity.slice(-range);
    const both = rows.filter(day => buildingForDay(day, 'both'));
    assert.deepEqual(both, rows.filter(day => day.github > 0 && day.leetcode > 0));
    assert.ok(both.length > 0 && both.length < rows.filter(day => buildingForDay(day, 'all')).length);
    for (const day of both) {
      assert.deepEqual(buildingForDay(day, 'both'), buildingForDay(day));
      assert.equal(buildingForDay(day, 'github').count, day.github);
      assert.equal(buildingForDay(day, 'leetcode').count, day.leetcode);
    }
  }
});

test('sample calendar has 365 unique consecutive UTC dates', () => {
  assert.equal(activity.length, 365);
  assert.equal(new Set(activity.map(d => d.date)).size, 365);
  assert.equal(activity.at(-1).date, '2026-11-01');
  activity.slice(1).forEach((d, i) => assert.equal(Date.parse(d.date) - Date.parse(activity[i].date), 86400000));
});
test('daily counts are reproducible and use independent nonnegative integer series', () => {
  assert.deepEqual(generateActivity(27), activity);
  assert.notDeepEqual(generateActivity(28), activity);
  assert.ok(activity.some(d => d.github > 0 && d.leetcode === 0));
  assert.ok(activity.some(d => d.leetcode > 0 && d.github === 0));
  for (const d of activity) for (const key of ['github', 'leetcode']) assert.ok(Number.isInteger(d[key]) && d[key] >= 0);
});

test('calendar columns preserve weekdays, partial weeks and month boundaries', () => {
  for (const range of [91, 365]) {
    const rows = activity.slice(-range);
    const layout = calendarLayout(rows);
    const positions = new Set();
    for (const cell of layout.cells) {
      assert.equal(cell.row, new Date(cell.date).getUTCDay());
      assert.ok(cell.column >= 0 && cell.column < layout.columns);
      positions.add(`${cell.column}:${cell.row}`);
    }
    assert.equal(positions.size, range);
    for (const month of layout.months) {
      assert.equal(month.column, layout.cells.find(d => d.date === month.key).column);
      assert.ok(month.key === rows[0].date || month.key.endsWith('-01'));
    }
  }
  const short = calendarLayout(activity.slice(-91));
  assert.equal(short.cells[0].row, 1); // Monday; leave Sunday's cell empty.
  assert.equal(short.columns, 14);
  const year = calendarLayout(activity);
  assert.equal(year.columns, 53);
  assert.equal(year.months.length, 13); // November appears at both ends of the year.
});
