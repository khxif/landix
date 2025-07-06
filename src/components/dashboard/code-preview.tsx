import React from 'react';

export function CodePreview({ code }: { code: string }) {
  return (
    <iframe
      title="Code Preview"
      srcDoc={code}
      sandbox="allow-scripts allow-same-origin"
      className="w-full h-full border rounded"
    ></iframe>
  );
}
