/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { MemoryRouter } from 'react-router';
import mockFetch from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import { BackstageTheme, ApiRegistry, ApiProvider } from '@backstage/core';

import { lighthouseApiRef, LighthouseRestApi } from '../../api';
import AuditListTable from './AuditListTable';

describe('AuditListTable', () => {
  let apis: ApiRegistry;

  beforeEach(() => {
    apis = ApiRegistry.from([
      [lighthouseApiRef, new LighthouseRestApi('http://lighthouse')],
    ]);
  });

  it('should render', async () => {
    mockFetch.mockResponse(() => new Promise(() => {}));
    const rendered = render(
      <MemoryRouter>
        <ApiProvider apis={apis}>
          <ThemeProvider theme={BackstageTheme}>
            <AuditListTable />
          </ThemeProvider>
        </ApiProvider>
      </MemoryRouter>,
    );
    expect(await rendered.findByTestId('progress')).toBeInTheDocument();
  });
});
