/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiFlexGrid, EuiFlexItem, EuiHorizontalRule, EuiPanel, EuiText } from '@elastic/eui';
import {
  AVERAGE_CPU_TIME,
  AVERAGE_LATENCY,
  AVERAGE_MEMORY_USAGE,
  GROUP_BY,
  ID,
} from '../../../../common/constants';
import { calculateMetric } from '../../Utils/MetricUtils';

// Panel component for displaying query group detail values
const PanelItem = ({ label, value }: { label: string; value: string | number }) => (
  <EuiFlexItem>
    <EuiText size="xs">
      <h4>{label}</h4>
    </EuiText>
    <EuiText size="xs">{value}</EuiText>
  </EuiFlexItem>
);

export const QueryGroupAggregateSummary = ({ query }: { query: any }) => {
  if (!query) {
    return <EuiText size="s">No query data available.</EuiText>;
  }
  const { measurements, id: id, group_by: groupBy } = query;
  const queryCount =
    measurements.latency?.count || measurements.cpu?.count || measurements.memory?.count || 1;
  return (
    <EuiPanel>
      <EuiText size="xs">
        <h2>
          Aggregate summary for {queryCount} {queryCount === 1 ? 'query' : 'queries'}
        </h2>
      </EuiText>
      <EuiHorizontalRule margin="m" />
      <EuiFlexGrid columns={4}>
        <PanelItem label={ID} value={id} />
        <PanelItem
          label={AVERAGE_LATENCY}
          value={calculateMetric(
            measurements.latency?.number,
            measurements.latency?.count,
            'ms',
            1
          )}
        />
        <PanelItem
          label={AVERAGE_CPU_TIME}
          value={calculateMetric(measurements.cpu?.number, measurements.cpu?.count, 'ms', 1000000)}
        />
        <PanelItem
          label={AVERAGE_MEMORY_USAGE}
          value={calculateMetric(measurements.memory?.number, measurements.memory?.count, 'B', 1)}
        />
        <PanelItem label={GROUP_BY} value={groupBy !== undefined ? `${groupBy}` : 'N/A'} />
      </EuiFlexGrid>
    </EuiPanel>
  );
};
