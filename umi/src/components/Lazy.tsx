import React, { Suspense } from 'react';

function withCache(Component) {
  const CachedComponent = React.memo(Component);

  const LazyComponent = React.lazy(() => Promise.resolve({ default: CachedComponent }));

  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default withCache;