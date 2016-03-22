import test from 'tape';
import React from 'react';
import {createRenderer} from 'react-addons-test-utils';

import RequireAuthority from '../../main/webapp/util/RequireAuthority.component';

const item = <span />;

test('requireAuthority test', t => {
  const renderer = createRenderer();
  renderer.render(
    <RequireAuthority
        authorities={['TEST']}
        item={item}
    />
  );

  t.equal(renderer.getRenderOutput(), item, 'Should render item if no authoritory requirements');

  renderer.render(
    <RequireAuthority
        authorities={['TEST']}
        authority={"TEST"}
        item={item}
    />
  );

  t.equal(renderer.getRenderOutput(), item, 'Should render item if authority matches');

  renderer.render(
    <RequireAuthority
        authorities={['USER']}
        authority={"TEST"}
        item={item}
    />
  );

  t.equal(renderer.getRenderOutput(), null, 'Should not render item if authority doesn\'t match');

  renderer.render(
    <RequireAuthority
        authorities={['TEST']}
        item={item}
        oneOf={['TEST', 'USER', 'KAPPA']}
    />
  );

  t.equal(renderer.getRenderOutput(), item, 'Should render item if authority matches one or more of given authorities');

  renderer.render(
    <RequireAuthority
        authorities={['JJ']}
        item={item}
        oneOf={['TEST', 'USER', 'KAPPA']}
    />
  );

  t.equal(renderer.getRenderOutput(), null, 'Should not render item if authority doesn\'t match one or more of given authorities');

  t.end();
});

