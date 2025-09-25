import React from 'react';

export default function AdBanner({ style }) {
  return (
    <div
      style={{
        background: '#f2f2f2',
        border: '1px dashed #ccc',
        padding: 12,
        textAlign: 'center',
        margin: '12px 0',
        ...style,
      }}
    >
      <small>Ad placeholder — replace with AdSense or other ad tag</small>
    </div>
  );
}
