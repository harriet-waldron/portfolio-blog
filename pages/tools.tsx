import React from 'react';
import Layout from '../components/Layout';
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
    </Layout>
  );
};

export default Tools;
