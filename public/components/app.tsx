/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DataSourceManagementPluginSetup } from 'src/plugins/data_source_management/public';
import TopNQueries from '../pages/TopNQueries/TopNQueries';
import WorkloadManagement from '../pages/WorkloadManagement';
import { AppMountParameters, CoreStart } from '../../../../src/core/public';
import { QueryInsightsDashboardsPluginStartDependencies } from '../types';

export const QueryInsightsDashboardsApp = ({
  core,
  depsStart,
  params,
  dataSourceManagement,
}: {
  core: CoreStart;
  depsStart: QueryInsightsDashboardsPluginStartDependencies;
  params: AppMountParameters;
  dataSourceManagement?: DataSourceManagementPluginSetup;
}) => {
  const location = window.location.pathname; // Detect the URL path
  const isWLMApp = location.includes('workloadManagement'); // Check if the path includes 'workloadManagement'

  console.log("URL path:", location); // Debug log
  console.log("Is Workload Management App:", isWLMApp); // Debug log
  return (
    <Switch>
      {isWLMApp && (
        <Route path="/">
          <WorkloadManagement
            core={core}
            depsStart={depsStart}
            params={params}
            dataSourceManagement={dataSourceManagement}
          />
        </Route>
      )}

      {!isWLMApp && (
        <Route path="/">
          <TopNQueries
            core={core}
            depsStart={depsStart}
            params={params}
            dataSourceManagement={dataSourceManagement}
          />
        </Route>
      )}

    </Switch>
  );
};


