import React from 'react';
import Layout from '../components/Layout';
import Gratitude from './tools/gratitude';
import PomodoroTimer from './tools/pomodoro';

export const Tools = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: 'Tools - Pomodoro Timer',
      }}
    >
      <h1>Focus</h1>
      <PomodoroTimer />
      <h1>Gratitude</h1>
      <Gratitude />
    </Layout>
  );
};

export default Tools;
