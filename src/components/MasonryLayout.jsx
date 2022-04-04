import React from 'react';
import { useRef, useEffect, Children } from 'react';
import Bricks from 'bricks.js';

export type MasonryLayoutProps = {
  children: React.ReactNode,
  sizes: {
    columns: number,
    gutter: number,
  },
};

const MasonryLayout = ({ children, sizes }: MasonryLayoutProps) => {
  const container = useRef(null);

  useEffect(() => {
    const bricks = Bricks({
      container: container.current,
      packed: 'data-packed',
      sizes: [{ ...sizes }],
      position: true,
    });

    bricks.resize(true);

    if (Children.count(children) > 0) {
      bricks.pack();
    }
  }, [children, sizes]);

  return (
    <div ref={container} data-testid="MasonryLayoutContainer">
      {children}
    </div>
  );
};

export default MasonryLayout;
